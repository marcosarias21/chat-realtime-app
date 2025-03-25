import React from 'react'
import { useLoginStore } from '../../store/loginStore'

type Prop = {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void
}

const LoginComponent = ({ handleLogin }: Prop) => {
  const { setUsername, setPassword } = useLoginStore()
  return (
    <form onSubmit={handleLogin} className='w-[50%]'>
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-900">Iniciar sesión</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Ingresar
            </button>
          </div>
          <p className="text-sm text-center text-gray-600">
            ¿No tienes cuenta? <a href="#" className="text-blue-600 hover:underline">Regístrate</a>
          </p>
        </div>
      </div>
    </form>
  )
}

export default LoginComponent
