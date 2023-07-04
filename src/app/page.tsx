'use client'

import QuizForm from '@/app/_components/QuizForm'
import { useAppContext } from './_contexts/app'
import { useEffect } from 'react';
import styles from '@/app/page.module.css'
import Image from 'next/image';

export default function Home() {
  const { fetchVotes, quiz: {totalVotes}, fetched } = useAppContext();

  useEffect(() => {
    fetchVotes()
  }, [])
  
  return (
    <section className={styles.main}>

      {fetched && ((totalVotes || 0) > 1000) ? (
        <>
          <span className={styles.heading}>{totalVotes} personas ya votaron.</span>
        </>
      ) : (
        <span className={styles.loader}>
          <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/icons/preloader.svg`} alt="Cargando" width={32} height={32} />
        </span>
      )}
      <div>
        <QuizForm />
      </div>
    </section>
  )
}
