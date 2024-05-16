import {useEffect, useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowDevice = () => {
  const [device, setDevice] = useState({})
  const [loading, setLoading] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    setLoading(true)
    axios
    .get(`http://localhost:5555/device/${id}`)
    .then((res) => {
      setDevice(res.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
      setLoading(false)
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
            <span className='text-xl mr-4 text-gray-500'>name</span>
            <span>{device.name}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>topic</span>
            <span>{device.topic}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>status</span>
            <span>{device.status}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>category</span>
            <span>{device.category}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default ShowDevice