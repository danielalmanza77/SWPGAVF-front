import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const GestionarKardex = () => {
  const [productos, setProductos] = useState([
    {
      idProducto: "1",
      nombre: "Foco LED 500W",
      descripcion: "Foquito Led Con Elegancia",
      imagen:
        "https://dioselyna.com/public/imagen/producto_imagen/sub_dioselyna_photoroom_20230627_232509_70522327605572550017__43199209813926838136.jpg",
      stock: 50,
      precio: "380",
    },
    {
      idProducto: "2",
      nombre: "Panel solar de 300000W",
      descripcion:
        "Panel que puede mantener tu casa prendida por 10 meses después de un día soleado",
      imagen:
        "https://upload.wikimedia.org/wikipedia/commons/2/2c/Fixed_Tilt_Solar_panel_at_Canterbury_Municipal_Building_Canterbury_New_Hampshire.jpg",
      stock: 5,
      precio: "5000",
    },
    {
      idProducto: "3",
      nombre: "NAS 40TB",
      descripcion: "NAS que admite hasta 40tb de almacenamiento",
      imagen:
        "https://www.metafrase.com/blog/wp-content/uploads/sites/4/2022/02/nas-system-heimanwendung-c.jpeg",
      stock: 8,
      precio: "1200",
    },
    {
      idProducto: "4",
      nombre: "Generador 5000W",
      descripcion: "Generador a base de gasolina para suministrar hasta 5000w de energia",
      imagen:
        "https://berklin.com.pe/cdn/shop/files/E5000-1-min.jpg?v=1689799998",
      stock: 3,
      precio: "3200",
    },
  ]);

  const [nuevoKardex, setNuevoKardex] = useState({
    idProducto: "",
    entradaSalida: "",
    tipoOperacion: "",
    cantidad: "",
    fecha: "",
  });

  const [historialKardex, setHistorialKardex] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (modalVisible) {
        const message = "hola";
        e.preventDefault();
        e.returnValue = message; 
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [modalVisible]); 

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    if (name === "cantidad" && (/[e+\-]/.test(value) || value < 0)) {
      alert("La cantidad no puede contener operadores (+, -, e) o ser negativa.");
      return;
    }

    if (name === "tipoOperacion" && !nuevoKardex.entradaSalida) {
      alert("Debes seleccionar Entrada/Salida antes de seleccionar el tipo de operación.");
      return;
    }

    if (name === "cantidad" && !nuevoKardex.tipoOperacion) {
      alert("Debes seleccionar el tipo de operación antes de ingresar la cantidad.");
      return;
    }

    setNuevoKardex({ ...nuevoKardex, [name]: value });
  };

  const abrirModalKardex = (idProducto) => {
    setNuevoKardex({ ...nuevoKardex, idProducto });
    setModalVisible(true);
  };

  const agregarKardex = () => {
    if (parseInt(nuevoKardex.cantidad) < 0) {
      alert("La cantidad no puede ser un número negativo");
      return;
    }

    if (nuevoKardex.fecha < obtenerFechaActual()) {
      alert("La fecha no puede ser anterior a la fecha del sistema.");
      return;
    }

    setProductos(
      productos.map((producto) =>
        producto.idProducto === nuevoKardex.idProducto
          ? {
              ...producto,
              stock:
                nuevoKardex.entradaSalida === "Entrada"
                  ? producto.stock + parseInt(nuevoKardex.cantidad)
                  : producto.stock - parseInt(nuevoKardex.cantidad),
            }
          : producto
      )
    );

    setHistorialKardex([...historialKardex, nuevoKardex]);

    setNuevoKardex({
      idProducto: "",
      entradaSalida: "",
      tipoOperacion: "",
      cantidad: "",
      fecha: "",
    });
    setModalVisible(false);
  };

  const obtenerOpcionesTipoOperacion = () => {
    if (nuevoKardex.entradaSalida === "Entrada") {
      return (
        <>
          <option value="SeleccionTipoDeOperacion">Selecciona Tipo De Operacion</option>
          <option value="Compra">Compra</option>
          <option value="Devolución del cliente por insatisfacción o garantía">
            Devolución del cliente por insatisfacción o garantía
          </option>
        </>
      );
    } else if (nuevoKardex.entradaSalida === "Salida") {
      return (
        <>
          <option value="SeleccionTipoDeOperacion">Selecciona Tipo De Operacion</option>
          <option value="Venta">Venta</option>
          <option value="Devolución al proveedor por error">
            Devolución al proveedor por error
          </option>
        </>
      );
    }
    return <option value="">Seleccionar Operación</option>;
  };

  return (
    <div className="">
      <div className="mb-5">
        <Navbar />
      </div>

      {modalVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Nuevo Kardex</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="idProducto"
                value={nuevoKardex.idProducto}
                onChange={manejarCambio}
                placeholder="ID Producto"
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled
              />
              <select
                name="entradaSalida"
                value={nuevoKardex.entradaSalida}
                onChange={manejarCambio}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="SeleccionTipoDeProducto">Selecciona Tipo De Producto</option>
                <option value="Entrada">Entrada</option>
                <option value="Salida">Salida</option>
              </select>
              <select
                name="tipoOperacion"
                value={nuevoKardex.tipoOperacion}
                onChange={manejarCambio}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                {obtenerOpcionesTipoOperacion()}
              </select>
              <input
                type="number"
                name="cantidad"
                value={nuevoKardex.cantidad}
                onChange={manejarCambio}
                placeholder="Cantidad"
                className="w-full p-2 border border-gray-300 rounded-md"
                min="0"
              />
              <input
                type="date"
                name="fecha"
                value={nuevoKardex.fecha}
                onChange={manejarCambio}
                placeholder="Fecha"
                className="w-full p-2 border border-gray-300 rounded-md"
                min={obtenerFechaActual()}
                disabled={
                  !nuevoKardex.entradaSalida ||
                  !nuevoKardex.tipoOperacion ||
                  !nuevoKardex.cantidad
                }
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setModalVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancelar
              </button>
              <button
                onClick={agregarKardex}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Guardar Kardex
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="ml-6 mr-6 space-y-4">
        {productos.map((producto, indice) => (
          <div
            key={indice}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p>Stock: {producto.stock}</p>
                <p>Precio: ${producto.precio}</p>
              </div>
            </div>
            <button
              onClick={() => abrirModalKardex(producto.idProducto)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Nuevo Kardex
            </button> 
          </div>
        ))}
      </div>

      <div className="mt-8 flex ml-12">
        <button
          onClick={() => setMostrarHistorial(!mostrarHistorial)}
          className="bg-gray-500 text-white px-8 py-2 rounded-md"
        >
          {mostrarHistorial ? "Ocultar Historial" : "Mostrar Historial Kardex"}
        </button>
      </div>

      {mostrarHistorial && (
        <div className="ml-6 mr-6 mt-4 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Historial de Kardex</h2>
          {historialKardex.length === 0 ? (
            <p>No hay ningun kardex registrado todavia</p>
          ) : (
            <ul className="space-y-2">
              {historialKardex.map((registro, index) => (
                <li
                  key={index}
                  className="bg-white p-4 rounded-md shadow-md border border-gray-200"
                >
                  <p>
                    <strong>ID Producto:</strong> {registro.idProducto}
                  </p>
                  <p>
                    <strong>Entrada/Salida:</strong> {registro.entradaSalida}
                  </p>
                  <p>
                    <strong>Tipo de Operación:</strong> {registro.tipoOperacion}
                  </p>
                  <p>
                    <strong>Cantidad:</strong> {registro.cantidad}
                  </p>
                  <p>
                    <strong>Fecha:</strong> {registro.fecha}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <div className="mt-8">
        <Footer />
      </div>
    </div>
  );
};

export default GestionarKardex;