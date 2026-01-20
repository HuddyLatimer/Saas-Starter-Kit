import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Check, Shield, Zap, LayoutTemplate } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">Nexora</span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
          <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
          <Link href="#" className="hover:text-primary transition-colors">About</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">Log in</Button>
          </Link>
          <Link href="/register">
            <Button size="sm">Get Started</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="py-24 px-6 text-center max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 relative">

          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">
            v1.0 is now live
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight pb-2">
            Launch your <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-500 to-indigo-600">next big idea.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The opinionated Next.js starter kit for serious founders. Authentication, payments, multi-tenancy, and more out of the box.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-lg shadow-lg hover:shadow-primary/25 transition-all">
                Start Building <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg bg-background/50 backdrop-blur-sm hover:bg-background/80">
                View Demo
              </Button>
            </Link>
          </div>

          {/* Dashboard Image */}
          <div className="mt-16 relative w-full rounded-xl border bg-muted/40 backdrop-blur-sm overflow-hidden shadow-2xl flex items-center justify-center group ring-1 ring-white/20">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 -z-10"></div>
            <Image
              src="/dash.png"
              alt="Nexora Dashboard"
              width={1200}
              height={675}
              className="w-full h-auto rounded-lg shadow-2xl"
              priority
            />
          </div>
        </section>

        {/* Features */}
        <section id="features" className="py-24 px-6 relative">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {[
              { title: "Authentication", icon: Shield, desc: "Secure user management with NextAuth v5. Supports email, Google, and Git providers." },
              { title: "Multi-Tenancy", icon: Zap, desc: "Built-in organization support. Users can create, invite, and manage teams effortlessly." },
              { title: "Billing Ready", icon: Check, desc: "Subscription implementation plan ready for Stripe integration using webhooks." }
            ].map((f, i) => (
              <Card key={i} className="bg-background/60 backdrop-blur-md border-primary/10 shadow-lg hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <CardTitle>{f.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-6 max-w-5xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Simple Pricing</h2>
            <p className="text-muted-foreground">Start for free, scale when you need to.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto text-left">
            <Card className="relative overflow-hidden hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <div className="text-3xl font-bold mt-2">$0<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><Check className="w-4 h-4 text-primary mr-2" /> 1 Organization</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-primary mr-2" /> 5 Members</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-primary mr-2" /> Basic Analytics</li>
                </ul>
                <div className="pt-4">
                  <Button className="w-full" variant="outline">Get Started</Button>
                </div>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden border-primary/50 shadow-lg shadow-primary/10">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-bl-lg font-medium">Popular</div>
              <CardHeader>
                <CardTitle>Pro</CardTitle>
                <div className="text-3xl font-bold mt-2">$29<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center"><Check className="w-4 h-4 text-primary mr-2" /> Unlimited Organizations</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-primary mr-2" /> Unlimited Members</li>
                  <li className="flex items-center"><Check className="w-4 h-4 text-primary mr-2" /> Advanced Features</li>
                </ul>
                <div className="pt-4">
                  <Button className="w-full">Upgrade to Pro</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 border-t text-center text-sm text-muted-foreground bg-slate-50 dark:bg-slate-950/50">
        <p>© 2026 Nexora. All rights reserved.</p>
      </footer>
    </div>
  )
}
