'use client'

import FeedbackForm from '@/app/_components/FeedbackForm'
import { useAppContext } from './_contexts/app'
import { useEffect } from 'react';
import styles from '@/app/page.module.css'
import Stats from '@/app/_components/Stats'

export default function Home() {
  const { fetchVotes, quiz: { totalVotes}, fetched } = useAppContext();

  useEffect(() => {
    fetchVotes()
  }, [])
  
  return (
    <section className={styles.main}>
      <h1 style={{textAlign: 'center'}}>RESULTADOS DE LA CONSULTA POPULAR</h1><br/>
      <p>Ante la pregunta <strong>¿Estás de acuerdo con que se establezcan penas de prisión para los responsables de desmontes ilegales e incendios forestales?</strong> <strong className={styles.highlighted}>el 99% de las personas votaron a favor</strong>.</p>
      <Stats />

      <p>La Consulta Popular se realizó entre el 10 de julio y el 10 de octubre de 2023 y <strong className={styles.highlighted}>participaron más de 260.000 personas</strong> mayores de 16 años de todo el país.</p>
      <p>Los resultados serán entregados al Congreso de la Nación.</p>
      <FeedbackForm />
      <div className={styles.logo} style={{backgroundImage: `url(${process.env.NEXT_PUBLIC_ASSET_PREFIX}images/gp-bosques-logo.svg)`}}/>
    </section>
  )
}
