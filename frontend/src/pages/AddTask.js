import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

const AddTask = ({ compact = false }) => {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tipo: "trabajo",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.createTask(form);
      if (!compact) navigate("/list");
      setForm({ nombre: "", descripcion: "", tipo: "trabajo" });
    } catch (err) {
      console.error(err);
      alert("Error al crear tarea");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1">
          Título
        </label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Ej: Reunión con el equipo"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1">
          Descripción
        </label>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          rows={compact ? 2 : 4}
          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
          placeholder="Detalles de la tarea…"
          required
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-300 mb-1">
          Tipo
        </label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="trabajo">💼 Trabajo</option>
          <option value="casa">🏠 Casa</option>
          <option value="negocios">💰 Negocios</option>
        </select>
      </div>

      <div className="mt-10 text-center">
        <button
          type="submit"
          disabled={loading}
          style={{ backgroundColor: "#0d6efd" }}
          className="
    px-4 sm:px-5 text-white font-semibold py-2.5 rounded-lg shadow-md transition
    disabled:opacity-60
    hover:opacity-80
  "
        >
          {loading ? "Guardando..." : "Guardar tarea"}
        </button>
      </div>
    </form>
  );
};

export default AddTask;
