'use client'

import QuizForm from '@/app/_components/QuizForm'
import { useAppContext } from './_contexts/app'
import { useEffect } from 'react';
import styles from '@/app/page.module.css'

export default function Home() {
  const { fetchVotes, quiz: {yesVotes, noVotes} } = useAppContext();
  
  useEffect(() => {
    fetchVotes()
  }, [])
  
  return (
    <section className={styles.main}>
      {/* <h1 className={styles.heading}>Ya votaron {(yesVotes || 0) + (noVotes || 0)} personas.</h1> */}
      <div>
        <QuizForm />
      </div>
    </section>
  )
}
