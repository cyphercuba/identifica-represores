
import { useAdmin } from "../contexts/AdminContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const { isAdmin, logout } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState("denuncias");
  const [denuncias, setDenuncias] = useState([
    "Testimonio 1 - Provincia Habana",
    "Testimonio 2 - Provincia Santiago"
  ]);

  const aprobarDenuncia = (index) => {
    alert("Denuncia aprobada: " + denuncias[index]);
    setDenuncias((prev) => prev.filter((_, i) => i !== index));
  };

  const eliminarDenuncia = (index) => {
    if (confirm("¿Estás seguro de eliminar esta denuncia?")) {
      setDenuncias((prev) => prev.filter((_, i) => i !== index));
    }
  };

  useEffect(() => {
    if (!isAdmin) {
      navigate("/admin-login");
    }
  }, [isAdmin]);

  const renderContent = () => {
    if (tab === "denuncias") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Denuncias recientes</h2>
          <ul className="space-y-2">
            {denuncias.map((item, index) => (
              <li key={index} className="p-4 bg-gray-700 text-white rounded shadow flex justify-between items-center">
                <span>{item}</span>
                <div className="space-x-2">
                  <button onClick={() => aprobarDenuncia(index)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded">Aprobar</button>
                  <button onClick={() => eliminarDenuncia(index)} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">Eliminar</button>
                </div>
              </li>
            ))}
            <li className="p-4 bg-gray-700 text-white rounded shadow">Testimonio 1 - Provincia Habana</li>
            <li className="p-4 bg-gray-700 text-white rounded shadow">Testimonio 2 - Provincia Santiago</li>
          </ul>
        </div>
      );
    } else if (tab === "represores") {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-white">Listado de represores</h2>
          <ul className="space-y-2">
            <li className="p-4 bg-gray-700 text-white rounded shadow">Carlos Pérez - Policía Nacional</li>
            <li className="p-4 bg-gray-700 text-white rounded shadow">Ana Morales - Seguridad del Estado</li>
          </ul>
        </div>
      );
    }

    return <p>Selecciona una opción del menú</p>;
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h1 className="text-2xl font-bold mb-6 text-white">Admin</h1>
        <button onClick={() => setTab("denuncias")} className="mb-2 text-left text-white hover:text-yellow-400">📄 Ver denuncias</button>
        <button onClick={() => setTab("represores")} className="mb-2 text-left text-white hover:text-yellow-400">🧑‍✈️ Ver represores</button>
        <button onClick={logout} className="mt-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Cerrar sesión</button>
      </aside>

      <main className="flex-1 bg-gray-900 p-6 overflow-auto text-white">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;
