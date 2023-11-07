import axios from "axios";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const obtenerCategorias = async () => {
    const { data } = await axios("/api/categorias");
    // console.log(data);
    setCategorias(data);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  const handleClickCategoria = (id) => {
    // console.log(id);
    const categoria = categorias.filter((cat) => cat.id === id);
    setCategoriaActual(categoria[0]);
    // console.log(categoria[0]);

    router.push("/");
  };

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  const handleSetProducto = (producto) => {
    setProducto(producto);
    // console.log({ productoProvider: producto });
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    // console.log({ productoProvider: producto });
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      // console.log("El producto existe AGREGANDO");
      // Actualizar la cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado); /* aqui cambie*/
      // console.log(pedido);
      toast.success("Guardado Correctamente");
    } else {
      // console.log("El producto no existe NO AGREGANDO");
      setPedido([...pedido, producto]);
      toast.success("Agregado al pedido");
    }
    setModal(false);
    // console.log(pedido);
  };

  const handleEditarCantidades = (id) => {
    // console.log("Esta editando el producto");
    // console.log(id);
    // console.log(producto);
    // console.log(pedido);
    const productoActualizar = pedido.filter(
      (productoEditar) => productoEditar.id === id
    );
    // console.log(productoActualizar);
    setProducto(productoActualizar[0]);
    // console.log(producto);
    setModal(!modal);
  };

  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter(
      (productoEditar) => productoEditar.id !== id
    );
    setPedido(pedidoActualizado);
  };

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );

    setTotal(nuevoTotal);
  }, [pedido]);

  const colocarOrden = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/ordenes", {
        pedido,
        nombre,
        total,
        fecha: Date.now().toString(),
      });

      setCategoriaActual(categorias[0]);

      setPedido([]);
      setNombre("");
      setTotal(0);

      toast.success("Pedido Realizado Correctamente");
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
    // console.log(pedido);
    // console.log(nombre);
    // console.log(total);
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        categoriaActual,
        handleClickCategoria,
        producto,
        handleSetProducto,
        modal,
        handleChangeModal,
        handleAgregarPedido,
        pedido,
        handleEditarCantidades,
        handleEliminarProducto,
        nombre,
        setNombre,
        colocarOrden,
        total,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
