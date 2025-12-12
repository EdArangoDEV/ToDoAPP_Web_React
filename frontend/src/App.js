import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Home from "./pages/Home";
import AddTask from "./pages/AddTask";
import TaskList from "./pages/TaskList";
import TaskDetail from "./pages/TaskDetail";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100 flex">
        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:flex md:flex-col w-64 bg-[#111827] border-r border-gray-800">
          <div className="h-16 flex items-center px-6 border-b border-gray-800">
            <span className="text-xl font-bold">Todo App</span>
          </div>

          <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="mr-2">📊</span> Resumen
            </NavLink>
            <NavLink
              to="/list"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="mr-2">📋</span> Tareas
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) =>
                `flex items-center px-3 py-2 rounded-lg font-medium ${
                  isActive
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }
            >
              <span className="mr-2">➕</span> Nueva tarea
            </NavLink>
          </nav>
        </aside>

        {/* MENÚ MÓVIL */}
        {mobileOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <div className="fixed top-0 left-0 bottom-0 w-64 bg-[#111827] border-r border-gray-800 z-40 md:hidden">
              <div className="h-14 flex items-center px-4 border-b border-gray-800">
                <span className="text-lg font-bold flex-1">ToDo App</span>
                <button
                  className="text-2xl text-gray-200"
                  onClick={() => setMobileOpen(false)}
                >
                  ✕
                </button>
              </div>
              <nav className="px-3 py-4 space-y-1 text-sm">
                <NavLink
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg font-medium ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  📊 Resumen
                </NavLink>
                <NavLink
                  to="/list"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg font-medium ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  📋 Tareas
                </NavLink>
                <NavLink
                  to="/add"
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg font-medium ${
                      isActive
                        ? "bg-gray-800 text-white"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  ➕ Nueva tarea
                </NavLink>
              </nav>
            </div>
          </>
        )}

        {/* COLUMNA PRINCIPAL */}
        <div className="flex-1 flex flex-col">
          {/* NAVBAR MÓVIL */}
          <header className="md:hidden h-14 bg-[#111827] flex items-center px-4 shadow-lg">
            <button
              className="mr-3 text-gray-200 text-2xl"
              onClick={() => setMobileOpen(true)}
            >
              ☰
            </button>
            <span className="text-lg font-semibold">ToDo App</span>
          </header>

          {/* CONTENIDO CENTRAL */}
          <main className="flex-1 px-2 sm:px-4 py-4 sm:py-6">
            <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
              <Routes>
                <Route
                  path="/"
                  element={
                    <section className="main-card p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-center">
                        Resumen de tareas
                      </h2>
                      <Home />
                    </section>
                  }
                />
                <Route
                  path="/list"
                  element={
                    <section className="main-card p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-center">
                        Listado de tareas
                      </h2>
                      <TaskList />
                    </section>
                  }
                />
                <Route
                  path="/add"
                  element={
                    <section className="main-card p-4 sm:p-6 max-w-xl mx-auto">
                      <h2 className="text-lg sm:text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-center">
                        Crear tarea
                      </h2>
                      <AddTask />
                    </section>
                  }
                />
                <Route
                  path="/task/:id"
                  element={
                    <section className="main-card p-4 sm:p-6">
                      <h2 className="text-lg sm:text-xl font-semibold mb-4 border-b border-gray-700 pb-2 text-center">
                        Detalle de tarea
                      </h2>
                      <TaskDetail />
                    </section>
                  }
                />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
