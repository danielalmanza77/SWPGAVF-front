import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const GestionarKardex = () => {
  // Estados para los productos, el nuevo kardex, y el historial
  const [productos, setProductos] = useState([]);
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

  // Estados para el estado de carga y errores
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar los productos desde el backend (ejemplo con fetch)
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://localhost:8080/products"); // URL del backend
        if (!response.ok) {
          throw new Error("No se pudieron cargar los productos.");
        }
        const data = await response.json();

        // Transforma los datos, añadiendo la URL completa de la imagen desde S3
        const transformedData = data.map((producto) => ({
          ...producto,
          imageUrls: producto.imageUrls.map((imageName) => 
            `https://buckimgtestdan.s3.us-east-1.amazonaws.com/${imageName}`
          ),
        }));
        
        setProductos(transformedData); // Asumimos que 'data' es el array de productos
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const obtenerFechaActual = () => {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const dia = String(hoy.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    // Validaciones
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
        producto.id === nuevoKardex.idProducto
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
                disabled={ !nuevoKardex.entradaSalida || !nuevoKardex.tipoOperacion || !nuevoKardex.cantidad }
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
        {loading ? (
          <p>Cargando productos...</p>
        ) : error ? (
          <p>{`Error: ${error}`}</p>
        ) : (
          productos.map((producto, indice) => (
            <div
              key={indice}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={producto.imageUrls[0]} // Usamos la URL completa generada en el map
                  alt={producto.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="text-lg font-semibold">{producto.name}</h3>
                  <p>{producto.description}</p>
                  <p>Stock: {producto.stock}</p>
                  <p>Precio: ${producto.price}</p>
                </div>
              </div>
              <button
                onClick={() => abrirModalKardex(producto.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Agregar al Kardex
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default GestionarKardex;
