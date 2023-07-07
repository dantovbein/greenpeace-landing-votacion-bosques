import styles from '@/app/_components/Header/styles.module.css'

export default function Header() {
  return (
    <header className={styles.main}>
      <div className={styles.topBar}>
        <h4>CONSULTA POPULAR</h4>
      </div>
      <div className={styles.picture} style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)), url(${process.env.NEXT_PUBLIC_BASE_PATH}/images/gp-bosques-header.jpg)` }}>
        <h1 className={styles.heading}>BASTA DE IMPUNIDAD.<br/><span className={styles.highlighted}>¡VOTÁ POR LOS BOSQUES!</span></h1>
        <span className={styles.url}>WWW.VOTAPORLOSBOSQUES.ORG</span>
      </div>
    </header>
  )
}
