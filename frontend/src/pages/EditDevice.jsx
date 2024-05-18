import { useState, useEffect } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

const EditDevice = () => {
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [namedevice, setNamedevice] = useState('')
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState('')
  const [colordevice, setColordevice] = useState('')
  const [voice, setVoice] = useState('')
  const notification = true
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/device/${id}`)
      .then((res) => {
        setName(res.data.name)
        setColor(res.data.color)
        setNamedevice(res.data.category.color)
        setTopic(res.data.topic)
        setStatus(res.data.status)
        setColordevice(res.data.category.color)
        setVoice(res.data.category.voice)
        setTime(res.data.category.time)
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
      color,
      category: {
        namedevice,
        topic,
        status,
        colordevice,
        voice,
        notification,
        time
      }
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
          <label className="text-xl mr-4 text-gray-500">Color</label>
          <input type="text" value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name Device</label>
          <input type="text" value={namedevice}
            onChange={(e) => setNamedevice(e.target.value)}
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
          <label className="text-xl mr-4 text-gray-500">Color Device</label>
          <input type="text" value={colordevice}
            onChange={(e) => setColordevice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Voice</label>
          <input type="text" value={voice}
            onChange={(e) => setVoice(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Time</label>
          <input type="text" value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditDevice}>Save</button>
      </div>
    </div>
  )
}

export default EditDevice