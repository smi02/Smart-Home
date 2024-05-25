import { Link } from "react-router-dom"

const Narbar = () => {
  return (
    <nav className="">
      <div className="flex justify-end">
      <Link to='/' className="px-4 py-2 rounded-xl font-medium text-blue-600">Home</Link>
      <Link to='/login' className=" px-4 py-2 rounded-xl font-medium text-blue-600">Login</Link>
      <Link to='/register' className=" px-4 py-2 rounded-xl font-medium text-gray-600">Register</Link>
      </div>
    </nav>
  )
}

export default Narbar