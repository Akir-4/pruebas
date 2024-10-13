import { useState, useEffect } from 'react';
import axios from 'axios';
import { Producto } from "../../../../../types/auction"; // Usamos el import centralizado

interface ProductListProps {
  productos: Producto[];
  onClose: () => void;
  editProducto: Producto | null; // Nueva prop para manejar el producto a editar
}

// Listas predefinidas para los valores de estado y tamaño
const estados = ['Nuevo', 'Usado', 'Reacondicionado']; // Puedes agregar más valores según lo necesites
const tamanos = ['S', 'M', 'L', 'XL']; // Tamaños predefinidos

const ProductList: React.FC<ProductListProps> = ({ productos, onClose, editProducto }) => {
  const [nombre, setNombre] = useState('');
  const [estado, setEstado] = useState('');
  const [tamano, setTamano] = useState('');
  const [precioInicial, setPrecioInicial] = useState('');
  const [precioOfertado, setPrecioOfertado] = useState(''); // Nuevo estado para precio_ofertado
  const [imagen, setImagen] = useState<File | null>(null);
  const [descripcion, setDescripcion] = useState('');
  const [marcaId, setMarcaId] = useState<number | null>(null);
  const [tipoId, setTipoId] = useState<number | null>(null);
  const [marcas, setMarcas] = useState<any[]>([]);
  const [tiposPrenda, setTiposPrenda] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [showProductList, setShowProductList] = useState(true); // Estado para controlar la visibilidad de la lista

  useEffect(() => {
    const fetchMarcas = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/productos/marcas/');
      setMarcas(response.data);
    };

    const fetchTiposPrenda = async () => {
      const response = await axios.get('http://127.0.0.1:8000/api/productos/tipos_prenda/');
      setTiposPrenda(response.data);
    };

    fetchMarcas();
    fetchTiposPrenda();
  }, []);

  useEffect(() => {
    if (editProducto) {
      setEditId(editProducto.producto_id);
      setNombre(editProducto.nombre);
      setEstado(editProducto.estado);
      setTamano(editProducto.tamano);
      setPrecioInicial(String(editProducto.precio_inicial));
      setPrecioOfertado(editProducto.precio_ofertado ? String(editProducto.precio_ofertado) : ''); // Asignar valor de precio_ofertado
      setDescripcion(editProducto.descripcion ?? ''); // Asignar una cadena vacía si es null
      setMarcaId(editProducto.marca_id);
      setTipoId(editProducto.tipo_id);
      setImagen(null); // Si deseas que se mantenga la imagen actual, puedes cambiar esto
    }
  }, [editProducto]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('estado', estado);
    formData.append('tamano', tamano);
    formData.append('precio_inicial', precioInicial);
    formData.append('descripcion', descripcion);
    formData.append('marca_id', String(marcaId));
    formData.append('tipo_id', String(tipoId));
    formData.append('usuario_id', '2'); // Ajustar según corresponda

    if (precioOfertado) {
      formData.append('precio_ofertado', precioOfertado); // Agregar precio_ofertado si está presente
    }

    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      if (editId) {
        // Actualizar producto existente
        const response = await axios.put(`http://127.0.0.1:8000/api/productos/productos/${editId}/`, formData);
        console.log('Producto actualizado:', response.data);
      } else {
        // Crear nuevo producto
        const response = await axios.post('http://127.0.0.1:8000/api/productos/productos/', formData);
        console.log('Nuevo producto creado:', response.data);
      }

      // Limpiar los campos del formulario
      resetForm();
      onClose(); // Cerrar el modal
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error al crear o actualizar el producto:', error.response?.data || error.message);
      } else {
        console.error('Error inesperado:', error);
      }
    }
  };

  const resetForm = () => {
    setNombre('');
    setEstado('');
    setTamano('');
    setPrecioInicial('');
    setPrecioOfertado(''); // Reiniciar el estado de precio_ofertado
    setImagen(null);
    setDescripcion('');
    setMarcaId(null);
    setTipoId(null);
    setEditId(null); // Reiniciar estado de edición
    setShowProductList(true); // Volver a mostrar la lista al cerrar
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagen(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Crear o Editar Producto</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre del producto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">Seleccionar Estado</option>
            {estados.map((estado) => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>
          <select
            value={tamano}
            onChange={(e) => setTamano(e.target.value)}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">Seleccionar Tamaño</option>
            {tamanos.map((tamano) => (
              <option key={tamano} value={tamano}>
                {tamano}
              </option>
            ))}
          </select>
          <input
            type="number"
            placeholder="Precio Inicial"
            value={precioInicial}
            onChange={(e) => setPrecioInicial(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="number"
            placeholder="Precio Ofertado" // Nuevo campo
            value={precioOfertado}
            onChange={(e) => setPrecioOfertado(e.target.value)}
            className="border rounded p-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded p-2 w-full"
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <select
            value={marcaId || ''}
            onChange={(e) => setMarcaId(Number(e.target.value))}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">Seleccionar Marca</option>
            {marcas.map((marca) => (
              <option key={marca.marca_id} value={marca.marca_id}>
                {marca.marca}
              </option>
            ))}
          </select>
          <select
            value={tipoId || ''}
            onChange={(e) => setTipoId(Number(e.target.value))}
            required
            className="border rounded p-2 w-full"
          >
            <option value="">Seleccionar Tipo de Prenda</option>
            {tiposPrenda.map((tipo) => (
              <option key={tipo.tipo_id} value={tipo.tipo_id}>
                {tipo.tipo}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
            {editId ? 'Actualizar Producto' : 'Crear Producto'}
          </button>
          <button type="button" onClick={resetForm} className="bg-red-500 text-white rounded px-4 py-2">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductList;
