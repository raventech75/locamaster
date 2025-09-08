import Link from "next/link";

export default function AppNav({ session }:{ session: any }){
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <Link href="/(app)/dashboard" className="font-semibold">LOCAMASTER • Dashboard</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/(app)/gallery">Galeries</Link>
          <Link href="/(app)/dashboard">Planning</Link>
          {session?.user ? <a href="/api/auth/signout" className="underline">Se déconnecter</a> : <Link href="/(marketing)">Se connecter</Link>}
        </nav>
      </div>
    </header>
  );
}
