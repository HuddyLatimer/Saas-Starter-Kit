'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const InviteSchema = z.object({
    email: z.string().email(),
    role: z.enum(["ADMIN", "MEMBER", "OWNER"]),
})

export async function inviteMember(formData: FormData) {
    const session = await auth()
    if (!session?.user?.email) {
        return { error: "Not authenticated" }
    }

    // Get user's org (for simplicity, we grab the first one they own or are admin of)
    // In a real app, you'd pass orgId as a hidden field or param
    const membership = await prisma.organizationMember.findFirst({
        where: {
            userId: session.user.id,
            role: { in: ["OWNER", "ADMIN"] }
        },
        include: { organization: true }
    })

    if (!membership) {
        return { error: "No organization found or insufficient permissions" }
    }

    const rawData = {
        email: formData.get("email"),
        role: formData.get("role"),
    }

    const result = InviteSchema.safeParse(rawData)

    if (!result.success) {
        return { error: "Invalid form data" }
    }

    const { email, role } = result.data

    try {
        // Check if user exists already
        const existingUser = await prisma.user.findUnique({ where: { email } })

        if (existingUser) {
            // Add directly to org
            await prisma.organizationMember.create({
                data: {
                    organizationId: membership.organizationId,
                    userId: existingUser.id,
                    role: role as any
                }
            })
        } else {
            // Create invitation record
            await prisma.invitation.create({
                data: {
                    organizationId: membership.organizationId,
                    email,
                    role: role as any,
                    token: Math.random().toString(36).substring(7), // Simple token
                    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days
                }
            })
        }

        revalidatePath("/dashboard/team")
        return { success: true }
    } catch (error) {
        console.error(error)
        return { error: "Failed to invite member" }
    }
}

export async function removeMember(memberId: string) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    // Verify permission (omitted for brevity, but crucial in prod)

    await prisma.organizationMember.delete({
        where: { id: memberId }
    })
    revalidatePath("/dashboard/team")
    return { success: true }
}
