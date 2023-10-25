import useQuiosco from "@/hooks/useQuiosco";
import Layout from "@/layout/Layout";
// import { PrismaClient } from "@prisma/client";

export default function Home() {
  const { categoriaActual } = useQuiosco();
  return (
    <Layout pagina={`Menú ${categoriaActual?.nombre}`}>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación
      </p>
    </Layout>
  );
}

// export const getServerSideProps = async () => {
//   const prisma = new PrismaClient();
//   const categorias = await prisma.categoria.findMany();
//   //? Estos ejemplos
//   // const categorias = await prisma.categoria.findFirst();
//   // const categorias = await prisma.categoria.findFirst({
//   //   where: {
//   //     nombre: "Pizzas",
//   //   },
//   // });
//   console.log(categorias);
//   return { props: { categorias } };
// };
