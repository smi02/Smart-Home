import { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsInfoCircle } from 'react-icons/bs'
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md'

const Home = () => {
    const [devices, setDevices] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/device')
            .then((res) => {
                setDevices(res.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }, [])

    return (
        <div className='p-4'>
            <div className="flex justify-between items-center">
                <h1 className='text-3xl my-8'></h1>
                <Link to='/device/create'>
                    <MdOutlineAddBox className='text-sky-800 text-4xl' />
                </Link>
            </div>
            {loading ? (
                <Spinner />
            ) : (
                <table className='w-full border-separate border-spacing-2'>
                    <thead>
                        <tr>
                            <th className='border border-slate-600 rounded-md'>No</th>
                            <th className='border border-slate-600 rounded-md'>category</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>name</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>topic</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>status</th>
                            <th className='border border-slate-600 rounded-md max-md:hidden'>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {devices.map((device, index) => (
                            <tr key={device._id} className='h-8'>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {index + 1}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    {device.namecategory}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {device.category.name}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    {device.category.topic}
                                </td>
                                <td className='border border-slate-700 rounded-md text-center max-md:hidden'>
                                    <p>{device.category.status ? "on" : "off"}</p>
                                </td>
                                <td className='border border-slate-700 rounded-md text-center'>
                                    <div className='flex justify-center gap-x-4'>
                                        <Link to={`/device/details/${device._id}`}>
                                            <BsInfoCircle className='text-2xl text-green-800' />
                                        </Link>
                                        <Link to={`/device/edit/${device._id}`}>
                                            <AiOutlineEdit className='text-2xl text-yellow-600' />
                                        </Link>
                                        <Link to={`/device/delete/${device._id}`}>
                                            <MdOutlineDelete className='text-2xl text-red-600' />
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default Home