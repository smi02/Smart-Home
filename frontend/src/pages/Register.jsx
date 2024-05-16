import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const navigate = useNavigate()
  const registerUser = async (e) => {
    e.preventDefault()
    const { name, email, password } = data
    try {
      const {data} = await axios.post('http://localhost:5555/auth/register',
      { name, email, password })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({})
        toast.success('Register Successful. Welcome!')
        navigate('/login')
      }
    } catch (error) {
        alert('An error happened. Please check console')
        console.log(error);
    }
  }

  return (
    <div>
      <label>Name</label>
      <input type="text" placeholder="enter name ..."
        value={data.name} onChange={(e) => setData({...data, name:e.target.value})} />
      <label>Email</label>
      <input type="email" placeholder="enter email ..."
        value={data.email} onChange={(e) => setData({...data, email:e.target.value})} />
      <label>Password</label>
      <input type="password" placeholder="enter password ..."
        value={data.password} onChange={(e) => setData({...data, password:e.target.value})} />
      <button onClick={registerUser}>Register</button>
    </div>
  )
}

export default Register