import { useState, useEffect } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const EditDevice = () => {
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState('')
  const [category, setCategory] = useState('')
  const [color, setColor] = useState('')
  const notification = true
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/device/${id}`)
      .then((res) => {
        setName(res.data.name)
        setTopic(res.data.topic)
        setStatus(res.data.status)
        setCategory(res.data.category)
        setColor(res.data.color)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        alert("An error happened. Please check console")
        console.log(error);
      })
  }, [])

  const handleEditDevice = () => {
    const data = {
      name,
      topic,
      status,
      category,
      color,
      notification
    }
    setLoading(true)
    axios
      .put(`http://localhost:5555/device/${id}`, data)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        alert('An error happened. Please check console')
        console.log(error);
      })
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Device</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name</label>
          <input type="text" value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Topic</label>
          <input type="text" value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Status</label>
          <input type="text" value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Category</label>
          <input type="text" value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Color</label>
          <input type="text" value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditDevice}>Save</button>
      </div>
    </div>
  )
}

export default EditDevice