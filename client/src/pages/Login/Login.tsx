import { useEffect } from 'react'
import { LoginComponent } from '../../components/LoginComponent'
import { useAuthStore } from '../../store/authStore'
import { useLoginStore } from '../../store/loginStore'
import { JsonResp } from '../../types/types.d'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { username, password } = useLoginStore()
  const { getUser, user } = useAuthStore()

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const resp = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json: JsonResp = await resp.json()
    if (json.token) {
      getUser(json.user)
      window.location.href = '/app/chat'
    }
  }

  useEffect(() => {
    if (user) navigate('/app/chat')
  }, [])

  return (
    <section className="flex h-dvh w-full items-center justify-center">
      <LoginComponent handleLogin={handleLogin} />
    </section>
  )
}

export default Login
