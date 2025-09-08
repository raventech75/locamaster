import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: "admin@locamaster.test" },
    update: {},
    create: {
      email: "admin@locamaster.test",
      name: "Admin",
      passwordHash: await bcrypt.hash("admin123", 10),
      role: Role.ADMIN
    }
  });

  const estUser = await prisma.user.upsert({
    where: { email: "lycee@locamaster.test" },
    update: {},
    create: {
      email: "lycee@locamaster.test",
      name: "Lycée Lumière",
      passwordHash: await bcrypt.hash("lycee123", 10),
      role: Role.ESTABLISHMENT
    }
  });

  const est = await prisma.establishment.upsert({
    where: { code: "LUM-2025" },
    update: { name: "Lycée Lumière" },
    create: {
      name: "Lycée Lumière",
      code: "LUM-2025",
      userId: estUser.id,
      commissionRate: 0.25
    }
  });

  // Products & prices (placeholder amounts)
  const packPortrait = await prisma.product.upsert({
    where: { id: "pack-portrait" },
    update: {},
    create: { id: "pack-portrait", name: "Pack Portrait", description: "Tirage 20x30 + porte-clés" }
  });
  const packFamille = await prisma.product.upsert({
    where: { id: "pack-famille" },
    update: {},
    create: { id: "pack-famille", name: "Pack Famille", description: "2 tirages 20x30 + 4 10x15" }
  });

  await prisma.price.upsert({
    where: { id: "price-portrait-2500" },
    update: {},
    create: {
      id: "price-portrait-2500",
      productId: packPortrait.id,
      unitAmount: 2500,
      currency: "eur",
      stripePriceId: null
    }
  });
  await prisma.price.upsert({
    where: { id: "price-famille-4500" },
    update: {},
    create: {
      id: "price-famille-4500",
      productId: packFamille.id,
      unitAmount: 4500,
      currency: "eur",
      stripePriceId: null
    }
  });

  const gallery = await prisma.gallery.create({
    data: {
      establishmentId: est.id,
      title: "Promo 3e 2025",
      accessCode: "LUM3E-2025",
      albums: {
        create: [{ title: "Classe 3E1" }, { title: "Classe 3E2" }]
      }
    }
  });

  console.log({ admin, estUser, est, gallery });
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
