'use client'

import { useEffect, useState } from "react"
import styles from './styles.module.css'
import { UserType } from "@/app/_reducers/form";

export default function Users() {
  const [ users, setUsers ] = useState<Array<any>>([])
  
  useEffect(() => {
    if(window) {
      setUsers(window.localStorage.getItem('users') ? JSON.parse(window.localStorage.getItem('users') as any) : [])
    }
  }, []);

  return (
    <section className={styles.main}>
      <h1>Usuarios</h1>
      <p>En esta sección se encuentran los usuarios que no se pudieron sincronizar</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span>Nombre completo</span>
          <span>Email</span>
          <span>DNI</span>
          <span>Teléfono</span>
          <span>Provincia</span>
          <span>Voto</span>
        </li>
        {users.map((user: UserType, key: number) => (
          <li key={key} className={styles.item}>
            <span>{user.fullName}</span>
            <span>{user.email}</span>
            <span>{user.docNumber}</span>
            <span>{user.phoneNumber}</span>
            <span>{user.province}</span>
            <span>{user.answer ? 'Si' : 'No'}</span>
         </li>
        ))}
      </ul>
    </section>
  )
}
