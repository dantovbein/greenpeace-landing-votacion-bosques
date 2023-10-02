'use client'

import { FC, useEffect, useMemo, useState } from "react";
import styles from '@/app/_components/Stats/styles.module.css';
import { useAppContext } from "@/app/_contexts/app";
import Image from "next/image";

const Component: FC<{}> = () => {
  const { quiz: { noVotes, yesVotes}, fetched, fetching, fetchVotes, dispatch } = useAppContext();
  const [ totalVotes, setTotalVotes ] = useState<number>();
  const [yesVotesCounter, setYesVotesCounter] = useState<number>(0);

  const calculatePercentage = (value: number) => {
    const percentage = Math.round(value * 100 / totalVotes!);

    if(percentage === 0) {
      return 1;
    }
    
    if(percentage === 100) {
      return 99;
    }

    return percentage;
  };

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
              <span>Sobre un total de <strong>{totalVotes}</strong> personas</span>
              <div className={styles.results}>
                <div className={styles.answerCounter}>
                  <h1>{yesVotes}</h1>
                  <span>votaron <strong>SI</strong></span>
                </div>
                <div className={styles.answerCounter}>
                  <h1>{noVotes}</h1>
                  <span>votaron <strong>NO</strong></span>
                </div>
              </div>
              <div className={styles.bar}>
                <div className={`${styles.answerBar}`} style={{ width: `${yesVotes! * 100 / totalVotes!}%`}}>{calculatePercentage(yesVotes || 0)}%</div>
                <div className={`${styles.answerBar}`} style={{ width: `${noVotes! * 100 / totalVotes!}%`}}>{calculatePercentage(noVotes || 0)}%</div>
              </div>
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
      yesVotesCounter,
      fetchVotes,
      dispatch,
    ]
  )
}

export default Component;
