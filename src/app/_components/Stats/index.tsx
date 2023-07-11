'use client'

import { FC, useEffect, useMemo, useState } from "react";
import styles from '@/app/_components/Stats/styles.module.css';
import { useAppContext } from "@/app/_contexts/app";
import Image from "next/image";

const Component: FC<{}> = () => {
  const { quiz: { noVotes, yesVotes}, fetched, fetching, fetchVotes, dispatch } = useAppContext();
  const [ totalVotes, setTotalVotes ] = useState<number>();

  useEffect(() => {
    if(typeof yesVotes === 'number' && typeof noVotes === 'number') {
      setTotalVotes(yesVotes + noVotes);
    }
  }, [
    yesVotes,
    noVotes,
    fetching,
    fetched,
  ]);

  useEffect(() => {
    dispatch({ type: 'RESET_VOTES' })
    fetchVotes();
  }, [])

  return useMemo(
    () => (
      <div className={styles.main}>
        {fetching && !fetched && (
          <>
            <Image src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/icons/preloader.svg`} alt="Cargando" width={32} height={32} />
          </>
        )}
        <div className={styles.wrapper}>
          {!fetching && fetched && (
            <>
              <div className={styles.answer}>
                <span>SI</span>
                <div className={`${styles.answerBar}`} style={{ width: `${yesVotes! * 100 / totalVotes!}%`}}>{Math.round(yesVotes! * 100 / totalVotes!)}%</div>
              </div>
              <div className={styles.answer}>
                <span>NO</span>
                <div className={`${styles.answerBar}`} style={{ width: `${noVotes! * 100 / totalVotes!}%`}}>{Math.round(noVotes! * 100 / totalVotes!)}%</div>
              </div>
              <span>Sobre un total de <strong>{totalVotes}</strong> votos.</span>
            </>
          )}
        </div>
      </div>    
    ), [
      yesVotes,
      noVotes,
      totalVotes,
      fetching,
      fetched,
      fetchVotes,
      dispatch,
    ]
  )
}

export default Component;
