'use client'

import QuizForm from '@/app/_components/QuizForm'
import { useAppContext } from './_contexts/app'
import { useEffect } from 'react';
import styles from '@/app/page.module.css'

export default function Home() {
  const { fetchVotes, quiz: {yesVotes, noVotes, totalVotes}, fetched } = useAppContext();

  useEffect(() => {
    fetchVotes()
  }, [])
  
  return (
    <section className={styles.main}>
      {fetched ? (
        <>
          <h3 className={styles.heading}>{(yesVotes || 0) + (noVotes || 0)} personas ya votaron.</h3>
        </>
      ) : <span className={styles.loader}>Cargando datos...</span>}
      <div>
        <QuizForm />
      </div>
    </section>
  )
}
