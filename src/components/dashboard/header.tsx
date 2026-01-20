import { User } from "next-auth"
import { Button } from "@/components/ui/button"

export default function Header({ user }: { user: User | undefined }) {
    return (
        <header className="h-16 border-b bg-background/50 backdrop-blur flex items-center justify-between px-6">
            <h1 className="font-semibold text-lg">Overview</h1>
            <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground hidden md:block">
                    {user?.name || user?.email}
                </div>
                <form action={async () => {
                    'use server'
                    const { signOut } = await import('@/auth')
                    await signOut()
                }}>
                    <Button variant="outline" size="sm">Log out</Button>
                </form>
            </div>
        </header>
    )
}
