import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { inviteMember, removeMember } from "@/actions/team-actions"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export default async function TeamPage() {
    const session = await auth()
    if (!session?.user?.id) return null

    // Fetch current user's organization
    // Assuming single org context for now
    const membership = await prisma.organizationMember.findFirst({
        where: { userId: session.user.id },
        include: { organization: true }
    })

    if (!membership) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold">No Organization Found</h2>
                <p className="text-muted-foreground">You need to create or join an organization first.</p>
            </div>
        )
    }

    const members = await prisma.organizationMember.findMany({
        where: { organizationId: membership.organizationId },
        include: { user: true }
    })

    const invitations = await prisma.invitation.findMany({
        where: { organizationId: membership.organizationId }
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Team Members</h2>
                <div className="text-sm text-muted-foreground">
                    Organization: <span className="font-semibold text-foreground">{membership.organization.name}</span>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Invite New Member</CardTitle>
                    <CardDescription>Invite a new member to {membership.organization.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form action={inviteMember} className="flex gap-4 items-end">
                        <div className="grid gap-2 flex-1">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" name="email" placeholder="colleague@example.com" type="email" required />
                        </div>
                        <div className="grid gap-2 w-[180px]">
                            <Label htmlFor="role">Role</Label>
                            <select name="role" id="role" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50">
                                <option value="MEMBER">Member</option>
                                <option value="ADMIN">Admin</option>
                            </select>
                        </div>
                        <Button type="submit">Send Invite</Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Members ({members.length})</CardTitle>
                    <CardDescription>Manage your team members and their roles.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {members.map((member) => (
                            <div key={member.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center space-x-4">
                                    <Avatar>
                                        <AvatarFallback>{member.user.name?.charAt(0) || member.user.email?.charAt(0) || "?"}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-sm font-medium leading-none">{member.user.name || "Unknown Name"}</p>
                                        <p className="text-sm text-muted-foreground">{member.user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
                                        {member.role}
                                    </span>
                                    {/* Server Action for Remove */}
                                    <form action={async () => {
                                        'use server'
                                        await removeMember(member.id)
                                    }}>
                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90">Remove</Button>
                                    </form>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {invitations.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Pending Invitations ({invitations.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {invitations.map((invite) => (
                                <div key={invite.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center space-x-4">
                                        <div>
                                            <p className="text-sm font-medium leading-none">{invite.email}</p>
                                            <p className="text-xs text-muted-foreground">Expires: {invite.expires.toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-xs text-muted-foreground border px-2 py-1 rounded">Pending {invite.role}</span>
                                        <Button variant="ghost" size="sm" disabled>Revoke</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
