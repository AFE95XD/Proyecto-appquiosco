import useQuiosco from "@/hooks/useQuiosco";
import Image from "next/image";
import Categoria from "./Categoria";

const SideBar = () => {
  const { categorias } = useQuiosco();
  // console.log(categorias);

  return (
    <>
      <Image
        width={300}
        height={100}
        src="/assets/img/logo.svg"
        alt="imagen logotipo"
      />

      <nav className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </nav>
    </>
  );
};

export default SideBar;
