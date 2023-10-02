import styles from '@/app/_components/Footer/styles.module.css'

export default function Footer() {
  return (
    <footer className={styles.main}>
      <div className={styles.trees} style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/gp-bosques-fondo.svg)` }} />
      <div className={styles.inner}>
        <div className={styles.content}>
          <p>La consulta popular estuvo abierta desde el 10 de julio hasta el 10 de octubre de 2023. Los resultados serán entregados al Congreso de la Nación.</p><br/>
          <span>Iniciativa propuesta por Greenpeace Argentina.</span>
        </div>
      </div>
    </footer>
  )
}
