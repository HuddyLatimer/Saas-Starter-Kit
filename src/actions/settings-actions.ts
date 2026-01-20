'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import bcrypt from "bcryptjs"

const ProfileSchema = z.object({
    name: z.string().min(2),
})

export async function updateProfile(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) return { error: "Unauthorized" }

    const result = ProfileSchema.safeParse({ name: formData.get("name") })
    if (!result.success) return { error: "Invalid name" }

    await prisma.user.update({
        where: { id: session.user.id },
        data: { name: result.data.name }
    })

    revalidatePath("/dashboard/settings")
    return { success: true }
}
