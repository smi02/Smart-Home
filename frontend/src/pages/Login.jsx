import { useState } from "react"
import axios from 'axios'
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: 'abc@gmail.com',
    password: '123456',
  })
  const loginUser = async (e) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const { data } = await axios.post('http://localhost:5555/auth/login',
        { email, password })
      if (data.error) {
        toast.error(data.error)
      } else {
        navigate(`/user/${data.user._id}`)
        setData({})
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-300">
      <div className="w-96 p-6 shadow-lg bg-white rounded-md">
        <h1 className="text-3xl block text-center font-semibold">Login</h1>
        <form onSubmit={loginUser}>
          <label className="block text-base mb-2">Email</label>
          <input type="email" placeholder="enter email ..."
            value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
          <label className="block text-base mb-2 mt-5">Password</label>
          <input type="password" placeholder="enter password ..."
            value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}
            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600" />
          <button type="submit" className="mt-5 border-indigo-700 bg-indigo-700 text-white px-5 py-1 w-full
           rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold">Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login