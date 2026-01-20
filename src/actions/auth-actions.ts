'use server'

import { signIn } from '@/auth'
import { prisma } from '@/lib/prisma'
import { AuthError } from 'next-auth'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().min(2),
})

export async function registerAction(prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData)
    const parsed = RegisterSchema.safeParse(data)

    if (!parsed.success) {
        return { error: "Invalid fields" }
    }

    const { email, password, name } = parsed.data

    try {
        const existing = await prisma.user.findUnique({ where: { email } })
        if (existing) return { error: "User already exists" }

        const hashedPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: { email, password: hashedPassword, name }
        })

        return { success: true }
    } catch (err) {
        return { error: "Failed to create user" }
    }
}

export async function loginAction(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirectTo: '/dashboard'
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}
