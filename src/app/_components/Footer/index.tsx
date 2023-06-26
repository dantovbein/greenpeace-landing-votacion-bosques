import Image from 'next/image'
import styles from './styles.module.css'

export default function Footer() {
  return (
    <footer className={styles.main}>
      {/* <Image
        src={`${process.env.BASE_PATH}/gp-bosques-fondo.svg`}
        alt="Votá por los bosques"
        className={styles.trees}
        width={1252}
        height={390}
        priority
      /> */}
      <div className={styles.trees} />
      <div className={styles.inner}>
        <div className={styles.content}>
          <p>La consulta popular estará abierta desde el 1° de julio hasta el 1° de octubre de 2023. Los resultados serán entregados al Congreso de la Nación.</p><br/>
          <span>Iniciativa propuesta por Greenpeace Argentina.</span>
        </div>
      </div>
    </footer>
  )
}
