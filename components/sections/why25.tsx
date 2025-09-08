import Image from "next/image";

export default function Why25({
  imgSrc = "/why25.jpg",
  imgAlt = "Photo éducative LOCAMASTER",
}: { imgSrc?: string; imgAlt?: string }) {
  return (
    <section className="rounded-3xl overflow-hidden border shadow-xl
                        bg-gradient-to-br from-[#0b1220] via-[#141018] to-[#0b0b0b]">
      <div className="p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
        {/* Texte (centré sur mobile) */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4
                         bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
            Pourquoi 25% change tout
          </h2>
          <p className="text-white/85 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            Financez vos projets pédagogiques avec un partenaire artistique et transparent.
            Fini les photos carte d’identité&nbsp;: place aux portraits dignes d’un studio événementiel.
          </p>
        </div>

        {/* Illustration (cadre premium) */}
        <div className="relative">
          <div className="rounded-[28px] p-[2px] bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500">
            <div className="rounded-[26px] overflow-hidden bg-black">
              <div className="relative aspect-[4/3]">
                <Image
                  src={imgSrc}
                  alt={imgAlt}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          {/* Légère ombre sous le cadre */}
          <div className="absolute -inset-1 rounded-[30px] blur-xl opacity-20
                          bg-gradient-to-r from-amber-400 via-pink-500 to-indigo-500 -z-10" />
        </div>
      </div>
    </section>
  );
}