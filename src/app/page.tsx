import { ArrowRight, Store } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-5 py-6 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-lg bg-[#DC143C] text-sm font-black text-white">
              eX
            </div>
            <div>
              <p className="text-sm font-semibold">eXobe Assessment</p>
              <p className="text-xs text-muted-foreground">
                Marketplace build foundation
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Store />
            Vendor view
          </Button>
        </header>

        <div className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl space-y-6">
            <p className="text-sm font-bold uppercase text-[#DC143C]">
              South Africa today. Africa tomorrow.
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              A mobile-first marketplace for authentic African trade.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              The first commit sets up the app foundation we will build on:
              Next.js, TypeScript, Tailwind CSS, shadcn/ui, and linting.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="bg-[#DC143C] hover:bg-[#b91032]">
                Start building
                <ArrowRight />
              </Button>
              <Button variant="secondary" size="lg">
                Review stack
              </Button>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border bg-card p-4 shadow-sm">
            {[
              ["Frontend", "Next.js App Router, React, TypeScript"],
              ["Styling", "Tailwind CSS with shadcn/ui components"],
              ["Quality", "ESLint wired through the package script"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-lg border bg-background p-4"
              >
                <p className="text-xs font-bold uppercase text-muted-foreground">
                  {label}
                </p>
                <p className="mt-2 font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="border-t py-4 text-sm text-muted-foreground">
          Built for the Phase 2 technical assessment.
        </footer>
      </section>
    </main>
  )
}
