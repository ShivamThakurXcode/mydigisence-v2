export default async function PublicProfilePage({ params }: { params: { username: string } }) {
  const awaitedParams = await params
  return <div>{awaitedParams.username}</div>
}
