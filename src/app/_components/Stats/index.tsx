'use client'

import { FC, useEffect, useMemo, useState } from "react";
import styles from '@/app/_components/Stats/styles.module.css';

const Component: FC<{}> = () => {
  const [ totalVotes, setTotalVotes ] = useState<number>();
  const [ yesVotes, setYesVotes ] = useState<number>();
  const [ noVotes, setNoVotes ] = useState<number>();
  const [ fetching, setFetching ] = useState<boolean>(false);
  const [ fetched, setFetched ] = useState<boolean>(false);

  const fetchVotes = async () => {
    setFetching(true)
    const forms = await (await fetch(`${process.env.NEXT_PUBLIC_GP_API}forma/form`)).json();
    setFetching(false)
    setFetched(true)
    setYesVotes(forms.filter((form: any) => form.formId === 69)[0].total); // 47
    setNoVotes(forms.filter((form: any) => form.formId === 70)[0].total); // 52
  }

  useEffect(() => {
    if(yesVotes && noVotes) {
      setTotalVotes(yesVotes + noVotes);
    }
  }, [
    yesVotes,
    noVotes
  ]);

  useEffect(() => {
    fetchVotes();
  }, [])

  return useMemo(
    () => (
      <div className={styles.main}>
        <div className={styles.wrapper}>
        {!fetching && !fetched && (
          <span>Cargando encuesta</span>
        )}

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
          </>
        )}
        </div>
      </div>    
    ), [
      totalVotes,
      yesVotes,
      noVotes,
      fetching,
      fetched,
    ]
  )
}

export default Component;
