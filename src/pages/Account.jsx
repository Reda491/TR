import { useState } from 'react'
import { useAuth } from '@/lib/AuthContext'
import { SectionHeader } from '@/components/SectionHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function Account() {
  const { user, login, logout } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  /** @param {import('react').FormEvent} e */
  function onSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    login({ email: email.trim(), name: name.trim() || undefined })
  }

  if (user) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Account"
          title={`Welcome back, ${user.name}`}
          description="This is a demo session stored in localStorage — replace with real auth (Base44, Supabase, etc.)."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Signed in as {user.email}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button type="button" variant="secondary" onClick={logout}>
                Log out
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Next steps</CardTitle>
              <CardDescription>
                Visit the protected rider area to see the gate component in
                action.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-zinc-400">
              <p>
                Use the <span className="font-mono text-zinc-200">Rider</span> link
                in the navigation bar to open the protected area.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Sign in"
        title="Demo rider login"
        description="No password in this template — just capture an email to unlock protected pages and personalize the navbar."
      />
      <Card className="mx-auto mt-12 max-w-lg">
        <CardHeader>
          <CardTitle>Create a session</CardTitle>
          <CardDescription>
            We only store a minimal profile in your browser for prototyping.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Display name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Jamie"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                placeholder="you@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
