'use client'

import FeedbackForm from '@/app/_components/FeedbackForm'
import { useAppContext } from './_contexts/app'
import { useEffect } from 'react';
import styles from '@/app/page.module.css'

export default function Home() {
  const { fetchVotes, quiz: { totalVotes}, fetched } = useAppContext();

  useEffect(() => {
    fetchVotes()
  }, [])
  
  return (
    <section className={styles.main}>
      <h1 style={{textAlign: 'center'}}>DESTRUIR BOSQUES ES UN CRIMEN</h1><br/>
      <p>Argentina se encuentra en emergencia forestal. Entre 1998 y 2023 la pérdida de bosques nativos en el país fue de cerca de 7 millones de hectáreas, una superficie similar a la de una provincia entera.</p>
      <p>En 2007 se logró la sanción de la Ley de Boques y desde entonces bajó la deforestación, pero aún más de la mitad de los desmontes son ilegales. Y para peor, <strong className={styles.highlighted}>aumentaron los incendios forestales</strong>.</p>
      <p>En el año 2023 más de 260.000 personas de todo el país participaron de una Consulta Popular impulsada por Greenpeace, y el 99% apoyó que se establezcan penas de prisión para los responsables de desmontes ilegales e incendios forestales.</p>
      <FeedbackForm />
      <div className={styles.logo} style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_ASSET_PREFIX}images/gp-bosques-logo.svg)`}}/>
    </section>
  )
}


