// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";

//? esta es otra forma de consulatar la base de datos

export default async function handler(req, res) {
  const prisma = new PrismaClient();
  //? Para traer las categorias de los productos
  const productos = await prisma.producto.findMany({
    where: {
      categoriaId: 1,
    },
  });
  // console.log(productos);
  res.status(200).json(productos);
}
