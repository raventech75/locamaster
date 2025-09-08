import "@/app/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full bg-[#0b0b0b]">
      <body className="min-h-screen h-full bg-[#0b0b0b] text-white antialiased">
        {/* Fond global discret animé */}
        <div className="site-bg site-bg-breath" aria-hidden="true" />

        {/* Contenu */}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}