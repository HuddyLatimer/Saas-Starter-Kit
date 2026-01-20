'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function upgradeSubscription() {
    const session = await auth()
    if (!session?.user?.id) {
        redirect('/login')
    }

    const membership = await prisma.organizationMember.findFirst({
        where: { userId: session.user.id, role: { in: ["OWNER", "ADMIN"] } },
        include: { organization: true }
    })

    if (!membership) {
        redirect('/dashboard')
    }

    // Mock Stripe checkout session creation
    // In a real app, you would redirect to Stripe here

    await prisma.organization.update({
        where: { id: membership.organizationId },
        data: { plan: "pro" }
    })

    revalidatePath("/dashboard/billing")
}

export async function cancelSubscription() {
    // Mock cancellation
    const session = await auth()
    if (!session?.user?.id) {
        redirect('/login')
    }

    const membership = await prisma.organizationMember.findFirst({
        where: { userId: session.user.id, role: { in: ["OWNER", "ADMIN"] } },
        include: { organization: true }
    })

    if (!membership) {
        redirect('/dashboard')
    }

    await prisma.organization.update({
        where: { id: membership.organizationId },
        data: { plan: "free" }
    })

    revalidatePath("/dashboard/billing")
}
