import Link from "next/link";

export default function MarketingNav(){
  return (
    <header className="container mx-auto px-4 md:px-8 py-5 flex items-center justify-between">
      <Link href="/(marketing)" className="font-bold tracking-wide">LOCAMASTER</Link>
      <nav className="flex gap-6 text-sm">
        <Link href="/(marketing)/services">Services</Link>
        <Link href="/(marketing)/portfolio">Portfolio</Link>
        <Link href="/(marketing)/commissions">Commissions</Link>
        <Link href="/(marketing)/about">À propos</Link>
        <Link href="/(marketing)/contact">Contact</Link>
        <Link href="/(app)/dashboard" className="px-3 py-1.5 rounded-lg bg-white text-black">Espace établissement</Link>
      </nav>
    </header>
  );
}
