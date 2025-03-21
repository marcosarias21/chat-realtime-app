import { useNavigate } from 'react-router-dom'
import { LoginComponent } from '../../components/LoginComponent'
import { useAuthStore } from '../../store/authStore'
import { useLoginStore } from '../../store/loginStore'
import { JsonResp } from '../../types/types.d'
import { useEffect } from 'react'

const Login = () => {
  const { username, password } = useLoginStore()
  const navigate = useNavigate()
  const { getUser, user } = useAuthStore()
  console.log(user)

  const handleLogin = async () => {
    const resp = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json: JsonResp = await resp.json()
    console.log(json)
    if (json.token) {
      getUser(json.user)
      navigate('/app/chat')
    }
  }

  return (
    <section className='h-dvh flex justify-center items-center'>
      <LoginComponent handleLogin={handleLogin}/>
    </section>
  )
}

export default Login
