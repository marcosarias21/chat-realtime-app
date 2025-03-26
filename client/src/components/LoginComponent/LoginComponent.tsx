import React from "react";
import { useLoginStore } from "../../store/loginStore";

type Prop = {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
};

const LoginComponent = ({ handleLogin }: Prop) => {
  const { setUsername, setPassword } = useLoginStore();
  return (
    <form onSubmit={handleLogin} className="w-[50%]">
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-900">
            Iniciar sesión
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              Ingresar
            </button>
          </div>
          <p className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginComponent;
