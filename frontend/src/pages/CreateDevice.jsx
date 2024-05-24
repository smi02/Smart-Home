import { useState } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreateDevice = () => {

  const [namecategory, setNamecategory] = useState('')
  const [colorcategory, setColorcategory] = useState('')
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState(false)
  const [color, setColor] = useState('')
  const [voice, setVoice] = useState('')
  const notification = true
  const [time, setTime] = useState('')
  const [icon, setIcon] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const handleSaveDevice = () => {
    const data = {
      namecategory,
      colorcategory,
      name,
      topic,
      status,
      color,
      voice,
      notification,
      time,
      icon
    }
    setLoading(true)
    axios
      .post('http://localhost:5555/device', data)
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
      <h1 className="text-3xl my-4">Create Device</h1>
      {loading ? <Spinner /> : ''}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name category</label>
          <input type="text" value={namecategory}
            onChange={(e) => setNamecategory(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Color category</label>
          <input type="text" value={colorcategory}
            onChange={(e) => setColorcategory(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name Device</label>
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
          <select name="status" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="true">On</option>
            <option value="false">Off</option>
          </select>
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Color Device</label>
          <input type="text" value={color}
            onChange={(e) => setColor(e.target.value)}
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
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Icon</label>
          <input type="text" value={icon}
            onChange={(e) => setIcon(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full" />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleSaveDevice}>Save</button>
      </div>
    </div>
  )
}

export default CreateDevice