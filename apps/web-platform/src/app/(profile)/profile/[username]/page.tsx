export default function UserProfilePage({ params }: { params: { username: string } }) {
  return <div>{params.username}</div>;
}
