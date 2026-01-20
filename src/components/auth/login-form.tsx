'use client'

import { useActionState } from 'react'
import { loginAction } from '@/actions/auth-actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'

export function LoginForm() {
    const [errorMessage, dispatch, isPending] = useActionState(loginAction, undefined)

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                    Enter your email below to login to your account.
                </CardDescription>
            </CardHeader>
            <form action={dispatch}>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                    {errorMessage && (
                        <div className="text-sm text-destructive">{errorMessage}</div>
                    )}
                </CardContent>
                <CardFooter>
                    <Button className="w-full" disabled={isPending}>
                        {isPending ? "Signing in..." : "Sign in"}
                    </Button>
                </CardFooter>
            </form>
            <div className="text-center text-sm p-4 pt-0">
                Don&apos;t have an account? <Link href="/register" className="underline">Sign up</Link>
            </div>
        </Card>
    )
}
