import { useEffect, useState } from "react";
import axios from "axios";


export default function User() {

  const [user, setUser] = useState()

  const sendRequest = async () => {
    const res = await axios.get('http://localhost:5555/auth/profile')
      .catch(err => console.log(err))
    const data = await res.data
    return data
  }
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user))
  }, [])

  return (
    <div>
      <h1>Home</h1>
      {user && (<h2>hi {user.name}</h2>)}
    </div>
  )
}
