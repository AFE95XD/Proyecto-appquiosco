import { PrismaClient } from "@prisma/client";

export default function Home({ categorias }) {
  console.log(categorias);
  return <h1>Hola</h1>;
}

export const getServerSideProps = async () => {
  const prisma = new PrismaClient();
  const categorias = await prisma.categoria.findMany();
  //? Estos ejemplos
  // const categorias = await prisma.categoria.findFirst();
  // const categorias = await prisma.categoria.findFirst({
  //   where: {
  //     nombre: "Pizzas",
  //   },
  // });
  console.log(categorias);
  return { props: { categorias } };
};
