'use server'

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const ProfileSchema = z.object({
    name: z.string().min(2),
})

export async function updateProfile(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) {
        redirect('/login')
    }

    const result = ProfileSchema.safeParse({ name: formData.get("name") })
    if (!result.success) {
        revalidatePath("/dashboard/settings")
        return
    }

    await prisma.user.update({
        where: { id: session.user.id },
        data: { name: result.data.name }
    })

    revalidatePath("/dashboard/settings")
}
