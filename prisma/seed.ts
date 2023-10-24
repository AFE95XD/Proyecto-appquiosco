import { categorias } from "./data/categorias";
import { productos } from "./data/productos";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async (): Promise<void> => {
  try {
    await prisma.categoria.createMany({ data: categorias });
    await prisma.producto.createMany({ data: productos });
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

main();
