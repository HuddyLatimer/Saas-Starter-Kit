import Link from "next/link"
import { LayoutDashboard, Settings, Users, CreditCard, Zap } from "lucide-react"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export default function Sidebar() {
    return (
        <div className="flex flex-col h-full">
            <div className="h-16 flex items-center px-6 border-b">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Zap className="w-5 h-5 text-primary" />
                    <span>Nexora</span>
                </Link>
            </div>
            <div className="flex-1 py-4 flex flex-col gap-1 px-3">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors text-muted-foreground hover:text-foreground">
                        <item.icon className="w-4 h-4" />
                        {item.name}
                    </Link>
                ))}
            </div>
            <div className="p-4 border-t">
                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <h3 className="font-semibold text-sm mb-1 text-primary">Pro Plan</h3>
                    <p className="text-xs text-muted-foreground mb-3">You are on the Pro plan.</p>
                </div>
            </div>
        </div>
    )
}
