import { useState, useEffect } from 'react';
import axios from 'axios';
import { usuario } from "../../../../../types/user"; // Usamos el import centralizado

interface EditBuyerProfileProps {
  onClose: () => void;
  onUpdate: (updatedUser: usuario) => void; // Función para actualizar el estado en el componente principal
}

const EditBuyerProfile: React.FC<EditBuyerProfileProps> = ({ onClose, onUpdate }) => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [usuario, setUsuario] = useState(''); // Añadimos el campo usuario
  const [imagen, setImagen] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null); // Guardar el ID del usuario
  const [existingImage, setExistingImage] = useState<string | null>(null); // Imagen actual

  useEffect(() => {
    // Obtener el usuario desde el localStorage
    const storedUser = localStorage.getItem('usuario'); // Asumiendo que guardas 'usuario' en localStorage después del login
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.usuario_id); // Aquí obtenemos el 'usuario_id'
      setUsuario(user.usuario); // Aquí obtenemos el 'usuario'

      // Realizar la solicitud a la API usando el 'usuario_id'
      const fetchUserData = async (id: number) => {
        try {
          const response = await axios.get<usuario>(`http://127.0.0.1:8000/api/usuarios/usuarios/${id}/`); // Usamos el 'usuario_id'
          const user = response.data;
          setNombre(user.nombre);
          setEmail(user.email);
          setContrasena(user.contrasena);
          setTelefono(user.telefono);
          setDescripcion(user.descripcion ?? '');
          setExistingImage(user.imagen); // Cargar la imagen existente
          setLoading(false);
        } catch (err) {
          setError("Error al cargar los datos del usuario");
          setLoading(false);
        }
      };

      if (user.usuario_id) {
        fetchUserData(user.usuario_id);
      }
    } else {
      setError("Usuario no encontrado");
      setLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
        
    formData.append('usuario', usuario);
    formData.append('nombre', nombre);
    formData.append('contrasena', contrasena);
    formData.append('email', email);
    formData.append('telefono', telefono);
    formData.append('descripcion', descripcion);
        
    if (imagen) {
        formData.append('imagen', imagen); // Aquí se asegura de que la imagen se adjunta
    }
        
    try {
        if (userId) {
            const response = await axios.put(`http://127.0.0.1:8000/api/usuarios/usuarios/${userId}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            const updatedUser = response.data; // Obtener los datos actualizados del usuario
            onUpdate(updatedUser); // Llamar a la función para actualizar el estado en el componente principal
            setSuccess('Perfil actualizado con éxito');
            onClose(); // Cerrar el modal después de actualizar
        }
    } catch (error) {
        setError('Error al actualizar el perfil');
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
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            aria-label="Usuario"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            aria-label="Nombre"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="email"
            aria-label="Email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="Contrasena"
            aria-label="Contrasena"
            placeholder="Contrasena"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            aria-label="Teléfono"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          <textarea
            aria-label="Descripción"
            placeholder="Descripción"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
            className="border rounded p-2 w-full"
          />
          {/* Mostrar la imagen actual si existe */}
          {existingImage && (
            <div className="mb-4">
              <img src={existingImage} alt="Imagen de perfil actual" className="rounded-full h-20 w-20 object-cover" />
            </div>
          )}
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

export default EditBuyerProfile;
