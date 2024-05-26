import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function User() {

  const { id } = useParams()

  const [user, setUser] = useState()

  useEffect(() => {
    axios.get(`http://localhost:5555/auth/${id}`)
    .then((res) => {
      setUser(res.data)
    })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <h1>Home</h1>
      {user && (<h2>hi {user.name}</h2>)}
    </div>
  )
}
