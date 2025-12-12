import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const load = async () => {
    try {
      const { data } = await api.getTasks();
      setTasks(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const complete = async (id) => {
    await api.completeTask(id);
    load();
  };

  const askDelete = (task) => {
    setTaskToDelete(task);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (!taskToDelete) return;
    await api.deleteTask(taskToDelete._id);
    setConfirmOpen(false);
    setTaskToDelete(null);
    load();
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setTaskToDelete(null);
  };

  const pending = tasks.filter((t) => !t.completada);
  const done = tasks.filter((t) => t.completada);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="h-8 w-8 border-b-2 border-indigo-400 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* CARD 2: PENDIENTES */}
      <section className="bg-gray-900/95 border border-gray-700 rounded-3xl shadow-2xl p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold mb-3 text-center">
          Tareas pendientes
        </h3>

        {pending.length === 0 ? (
          <p className="text-sm text-gray-400">No hay tareas pendientes. 🎉</p>
        ) : (
          <div className="space-y-3">
            {pending.map((task) => (
              <Link
                key={task._id}
                to={`/task/${task._id}`}
                className="block bg-gray-900/85 border border-gray-700 rounded-2xl p-4 sm:p-5 shadow-lg hover:border-indigo-500 transition group"
              >
                <div className="flex justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base sm:text-lg mb-1 group-hover:text-indigo-400">
                      {task.nombre}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                      {task.descripcion}
                    </p>
                    {/* CONTENEDOR TIPO + FECHA CON MÁS SEPARACIÓN */}
                    <div className="space-y-3">
                      {/* TIPO */}
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-200">
                        {task.tipo}
                      </span>

                      <div className="text-xs text-gray-400">
                        Creada:{" "}
                        {new Date(task.fechaCreacion).toLocaleString("es-ES", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        complete(task._id);
                      }}
                      className="mb-2 px-2.5 py-1 rounded-lg bg-green-500/10 text-green-300 text-xs hover:bg-green-500/20"
                    >
                      ✓ Completar
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        askDelete(task);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-300 text-xs hover:bg-red-500/20"
                    >
                      ✕ Eliminar
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* CARD 3: COMPLETADAS */}
      <section className="bg-gray-900/95 border border-gray-700 rounded-3xl shadow-2xl p-4 sm:p-5">
        <h3 className="text-base sm:text-lg font-semibold mb-3 text-center">
          Tareas completadas
        </h3>

        {done.length === 0 ? (
          <p className="text-sm text-gray-400">
            Aún no has completado ninguna tarea.
          </p>
        ) : (
          <div className="space-y-3">
            {done.map((task) => (
              <Link
                key={task._id}
                to={`/task/${task._id}`}
                className="block bg-gray-900/70 border border-gray-700 rounded-2xl p-4 sm:p-5 shadow-md hover:border-emerald-400 transition group"
              >
                <div className="flex justify-between gap-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-base sm:text-lg mb-1 text-emerald-300 group-hover:text-emerald-200">
                      {task.nombre}
                    </h4>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                      {task.descripcion}
                    </p>
                    <div className="space-y-3">
                      {/* TIPO */}
                      <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-500/20 text-green-300">
                        {task.tipo}
                      </span>

                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        Completada:{" "}
                        {new Date(task.fechaCreacion).toLocaleString("es-ES", {
                          dateStyle: "short",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        askDelete(task);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-300 text-xs hover:bg-red-500/20"
                    >
                      ✕ Eliminar
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* MODAL CONFIRMACIÓN ELIMINAR */}
      {confirmOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-sm">
            <h4 className="text-lg font-semibold mb-3">Eliminar tarea</h4>
            <p className="text-sm text-gray-300 mb-4">
              ¿Seguro que deseas eliminar la tarea{" "}
              <span className="font-semibold">{taskToDelete?.nombre}</span>?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-lg bg-gray-700 text-sm hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-red-600 text-sm hover:bg-red-500"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
