import { useState, useEffect } from 'react';
import axios from 'axios';
import { usuario } from "../../../../../types/user"; // Usamos el import centralizado

interface EditUserProfileProps {
  onClose: () => void;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null); // Guardar el ID del usuario

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<usuario>("http://127.0.0.1:8000/api/usuarios/usuarios/2"); // Usuario con ID 2
        const user = response.data;
        setNombre(user.nombre);
        setEmail(user.email);
        setTelefono(user.telefono);
        setDescripcion(user.descripcion ?? '');
        setUserId(user.usuario_id);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los datos del usuario");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('email', email);
    formData.append('telefono', telefono);
    formData.append('descripcion', descripcion);

    if (imagen) {
      formData.append('imagen', imagen);
    }

    try {
      if (userId) {
        // Actualizar usuario
        await axios.put(`http://127.0.0.1:8000/api/usuarios/usuarios/${userId}/`, formData);
        console.log('Usuario actualizado');
      }
      onClose(); // Cerrar el modal después de actualizar
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error('Error al actualizar el usuario:', error.response?.data || error.message);
      } else {
        console.error('Error inesperado:', error);
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImagen(e.target.files[0]);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 shadow-lg w-11/12 max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-lg font-bold mb-4">Editar Perfil de Usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border rounded p-2 w-full"
          />
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
            Actualizar Perfil
          </button>
          <button type="button" onClick={onClose} className="bg-red-500 text-white rounded px-4 py-2">
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserProfile;
