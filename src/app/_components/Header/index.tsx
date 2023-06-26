import styles from './styles.module.css'

export default function Header() {
  return (
    <header className={styles.main}>
      <div className={styles.topBar}>
        <h4>CONSULTA POPULAR</h4>
      </div>
      <div className={styles.picture}>
        <h1 className={styles.heading}>BASTA DE IMPUNIDAD.<br/><span className={styles.highlighted}>¡VOTÁ POR LOS BOSQUES!</span></h1>
        <span className={styles.url}>WWW.VOTAPORLOSBOSQUES.ORG</span>
      </div>
    </header>
  )
}
