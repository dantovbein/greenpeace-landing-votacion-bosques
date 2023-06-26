'use client'

import { useEffect, useState } from "react"

export default function Users() {
  const [ users, setUsers ] = useState<Array<any>>([])
  
  useEffect(() => {
    if(window) {
      setUsers(window.localStorage.getItem('users') ? JSON.parse(window.localStorage.getItem('users') as any) : [])
    }
  }, []);

  return (
    <section>
      <h2>Usuarios</h2>
      <p>En esta sección se encuentran los usuarios que no se pudieron sincronizar</p>
      <ul>
        {users.map((user: any, key: number) => (
          <li key={key}>
          {user.email}
         </li>
        ))}
      </ul>
    </section>
  )
}
