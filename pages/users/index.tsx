'use client'

import { useEffect, useState } from "react"
import styles from './styles.module.css'
import { UserType } from "@/app/_reducers/app";

export default function Users() {
  const [ users, setUsers ] = useState<Array<any>>([])
  
  const fetchUsers = async () => {
    // const res = await fetch('/api/users')
    const res = await (await fetch('/api/user')).json();
    if(res) {
      setUsers(res.data)
    }
    // console.log(res.json())
  } 

  useEffect(() => {
    // if(window) {
    //   setUsers(window.localStorage.getItem('users') ? JSON.parse(window.localStorage.getItem('users') as any) : [])
    // }
    fetchUsers();
  }, []);

  return (
    <section className={styles.main}>
      <h1>Usuarios</h1>
      <p>En esta sección se encuentran los usuarios que no se pudieron sincronizar</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span>Email</span>
          <span>Nombre</span>
          <span>Apellido</span>
          <span>DNI</span>
          <span>Teléfono</span>
          <span>Provincia</span>
          <span>Voto</span>
        </li>
        {users.map((user: any, key: number) => (
          <li key={key} className={styles.item}>
            <span>{user.createdAt}</span>
            <span>{user.email}</span>
            <span>{user.firstName}</span>
            <span>{user.lastName}</span>
            <span>{user.docNumber}</span>
            <span>{user.phoneNumber}</span>
            <span>{user.city}</span>
            <span>{user.answer ? 'Si' : 'No'}</span>
         </li>
        ))}
      </ul>
    </section>
  )
}
