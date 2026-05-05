import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const Fleet = lazy(() => import('./pages/Fleet'))
const MotorcycleDetail = lazy(() => import('./pages/MotorcycleDetail'))
const Offers = lazy(() => import('./pages/Offers'))
const About = lazy(() => import('./pages/About'))
const PageNotFound = lazy(() => import('./lib/PageNotFound'))

function RouteLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  )
}

export default function App() {
  return (
    <>
      <Router>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/motorcycle/:motorcycleId" element={<MotorcycleDetail />} />
              <Route path="/offers" element={<Offers />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
      <Toaster />
    </>
  )
}