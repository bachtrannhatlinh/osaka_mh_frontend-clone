interface PublicRouteProps {
  layout: React.ElementType
  children: React.ReactNode
}

function PublicRoute({ layout: Layout, children }: PublicRouteProps) {
  return <Layout>{children}</Layout>
}

export default PublicRoute
