import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";

const TaskDetail = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      const { data } = await api.getTask(id);
      setTask(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [id]);

  const complete = async () => {
    await api.completeTask(id);
    load();
  };

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="h-10 w-10 border-b-2 border-indigo-400 rounded-full animate-spin" />
      </div>
    );

  if (!task) return <p>Tarea no encontrada</p>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-sm text-muted">
        <Link to="/list" className="hover:text-indigo-400">
          ← Volver a la lista
        </Link>
        <span>
          Creada:{" "}
          {new Date(task.fechaCreacion).toLocaleString("es-ES", {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </span>
      </div>

      <div className="bg-gray-900/80 rounded-2xl border border-gray-700 p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold">{task.nombre}</h1>

          <span
            className={`block px-3 py-2 rounded-full text-xs font-medium text-right ${
              task.completada
                ? "bg-green-500/20 text-green-300 border border-green-500/30"
                : "bg-yellow-500/20 text-yellow-200"
            }`}
          >
            {task.completada && task.fechaCompletada
              ? `Completada: ${new Date(task.fechaCompletada).toLocaleString(
                  "es-ES",
                  {
                    dateStyle: "short",
                    timeStyle: "short",
                  }
                )}`
              : "Pendiente"}
          </span>
        </div>

        <p className="text-sm text-muted mb-4">{task.descripcion}</p>

        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="bg-gray-950/60 rounded-xl p-3 border border-gray-800">
            <p className="text-xs text-muted mb-1">Tipo</p>
            <p className="font-semibold">{task.tipo}</p>
          </div>
        </div>

        <div className="mt-4 text-center">
        {!task.completada && (
          <button
            onClick={complete}
            className="mt-5 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-sm font-semibold"
          >
            ✅ Marcar como completada
          </button>
        )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
