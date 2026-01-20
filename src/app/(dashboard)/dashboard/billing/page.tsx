import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "lucide-react" // Import Badge icon if available, or just use div with styles
import { Check, CreditCard, AlertTriangle } from "lucide-react"
import { upgradeSubscription, cancelSubscription } from "@/actions/billing-actions"

export default async function BillingPage() {
    const session = await auth()
    if (!session?.user?.id) return null

    const membership = await prisma.organizationMember.findFirst({
        where: { userId: session.user.id },
        include: { organization: true }
    })

    if (!membership) return <div>No Organization Found</div>

    const isPro = membership.organization.plan === "pro"

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Billing & Plans</h2>
                    <p className="text-muted-foreground">Manage your subscription and billing details.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Current Plan Card */}
                <Card className={isPro ? "border-primary/50 bg-primary/5" : ""}>
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            <span>Current Plan</span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${isPro ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
                                {isPro ? "Pro" : "Free"}
                            </span>
                        </CardTitle>
                        <CardDescription>
                            You are currently on the {isPro ? "Pro" : "Free"} plan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="text-3xl font-bold">
                            {isPro ? "$29" : "$0"}
                            <span className="text-sm font-normal text-muted-foreground">/month</span>
                        </div>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center"><Check className="w-4 h-4 text-primary mr-2" /> {isPro ? "Unlimited" : "1"} Organization</li>
                            <li className="flex items-center"><Check className="w-4 h-4 text-primary mr-2" /> {isPro ? "Unlimited" : "5"} Members per Team</li>
                            <li className="flex items-center"><Check className="w-4 h-4 text-primary mr-2" /> {isPro ? "Advanced" : "Basic"} Analytics</li>
                        </ul>
                    </CardContent>
                    <CardFooter>
                        {!isPro ? (
                            <form action={upgradeSubscription} className="w-full">
                                <Button className="w-full">Upgrade to Pro</Button>
                            </form>
                        ) : (
                            <form action={cancelSubscription} className="w-full">
                                <Button variant="outline" className="w-full text-destructive hover:text-destructive">Cancel Subscription</Button>
                            </form>
                        )}
                    </CardFooter>
                </Card>

                {/* Payment Method Card (Mock) */}
                <Card>
                    <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>Manage your payment methods.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between border rounded-lg p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-6 bg-slate-200 rounded relative overflow-hidden">
                                    {/* Visual mock of a card */}
                                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-400"></div>
                                </div>
                                <div>
                                    <div className="font-medium">Visa ending in 4242</div>
                                    <div className="text-xs text-muted-foreground">Expires 12/28</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">Edit</Button>
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" className="w-full">
                                <CreditCard className="w-4 h-4 mr-2" /> Add Payment Method
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Billing History */}
            <Card>
                <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { date: "Oct 22, 2025", amount: "$29.00", status: "Paid", invoice: "INV-001" },
                            { date: "Sep 22, 2025", amount: "$29.00", status: "Paid", invoice: "INV-002" },
                            { date: "Aug 22, 2025", amount: "$29.00", status: "Paid", invoice: "INV-003" },
                        ].map((invoice, i) => (
                            <div key={i} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                                <div>
                                    <div className="font-medium">{invoice.amount}</div>
                                    <div className="text-sm text-muted-foreground">{invoice.date}</div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-xs bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full font-medium">
                                        {invoice.status}
                                    </span>
                                    <Button variant="ghost" size="sm" className="text-muted-foreground">Download</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
