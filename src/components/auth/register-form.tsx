'use client'

import { useActionState } from 'react'
import { registerAction } from '@/actions/auth-actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function RegisterForm() {
    const [state, dispatch, isPending] = useActionState(registerAction, null)
    const router = useRouter()

    useEffect(() => {
        if (state?.success) {
            router.push('/login?registered=true')
        }
    }, [state, router])

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your email below to create your account.
                </CardDescription>
            </CardHeader>
            <form action={dispatch}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    {state?.error && (
                        <div className="text-sm text-destructive">{state.error}</div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={isPending}>
                        {isPending ? "Creating account..." : "Create account"}
                    </Button>
                </CardFooter>
            </form>
            <div className="text-center text-sm p-4 pt-0">
                Already have an account? <Link href="/login" className="underline">Sign in</Link>
            </div>
        </Card>
    )
}
