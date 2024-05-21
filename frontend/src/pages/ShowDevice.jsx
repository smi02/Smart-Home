import { useState, useEffect } from "react"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
import axios from "axios"
import { useParams } from "react-router-dom"

const ShowDevice = () => {
  const [device, setDevice] = useState({})
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [status, setStatus] = useState(false)
  const [time, setTime] = useState('')
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/device/${id}`)
      .then((res) => {
        setDevice(res.data)
        setName(res.data.category.name)
        setTopic(res.data.category.topic)
        setStatus(res.data.category.status)
        setTime(res.data.category.time)
        setLoading(false)

      })
      .catch((error) => {
        setLoading(false)
        alert("An error happened. Please check console")
        console.log(error);
      })
  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Device</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{device._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>category</span>
            <span>{device.namecategory}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>name</span>
            <span>{name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>topic</span>
            <span>{topic}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>status</span>
            <span>{status ? "on" : "off"}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>time</span>
            <span>{time}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowDevice


