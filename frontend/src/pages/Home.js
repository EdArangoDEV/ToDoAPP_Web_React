import React, { useEffect, useState } from "react";
import { api } from "../services/api";

const Home = () => {
  const [stats, setStats] = useState({ pending: 0, completed: 0, total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.getTasks();
        const pending = data.filter((t) => !t.completada).length;
        const completed = data.filter((t) => t.completada).length;
        setStats({ pending, completed, total: data.length });
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <div className="h-10 w-10 border-b-2 border-indigo-400 rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="bg-gray-900/80 rounded-2xl p-4 shadow-lg border border-gray-700">
        <div className="text-3xl mb-2">📋</div>
        <p className="text-sm text-muted mb-1">Pendientes</p>
        <p className="text-2xl font-bold">{stats.pending}</p>
      </div>
      <div className="bg-gray-900/80 rounded-2xl p-4 shadow-lg border border-gray-700">
        <div className="text-3xl mb-2">✅</div>
        <p className="text-sm text-muted mb-1">Completadas</p>
        <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
      </div>
      <div className="bg-gray-900/80 rounded-2xl p-4 shadow-lg border border-gray-700">
        <div className="text-3xl mb-2">📊</div>
        <p className="text-sm text-muted mb-1">Total</p>
        <p className="text-2xl font-bold text-indigo-400">{stats.total}</p>
      </div>
    </div>
  );
};

export default Home;
