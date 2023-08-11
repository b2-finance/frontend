export interface ProfilePageProps {
  params: { [key: string]: string };
}

export default function ProfilePage({ params }: ProfilePageProps) {
  return <h1>Profile for userId={params.userId}</h1>;
}
