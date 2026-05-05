import { SectionHeader } from '@/components/SectionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function Rider() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeader
        eyebrow="Rider zone"
        title="Protected content"
        description="This route is wrapped with ProtectedRoute — guests see UserNotRegisteredError instead."
      />
      <Card className="mt-10">
        <CardHeader>
          <CardTitle>Upcoming pickups</CardTitle>
        </CardHeader>
        <CardContent className="text-zinc-400">
          <p>Connect your booking entity here to list real reservations.</p>
        </CardContent>
      </Card>
    </div>
  )
}
