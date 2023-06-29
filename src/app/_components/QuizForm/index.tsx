"use client"

import React, { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/_components/QuizForm/styles.module.css'
import { useFormContext } from "@/app/_contexts/form";
import { UserType } from '@/app/_reducers/form';

declare const window: Window & { dataLayer: Record<string, unknown>[]; };

export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;

const provinces: Array<string> = [
  "Buenos Aires",
  "Córdoba",
  "Santa Fe",
  "Ciudad Autónoma de Buenos Aires",
  "Mendoza",
  "Tucumán",
  "Entre Ríos",
  "Salta",
  "Misiones",
  "Chaco",
  "Corrientes",
  "Santiago del Estero",
  "San Juan",
  "Jujuy",
  "Río Negro",
  "Neuquén",
  "Formosa",
  "Chubut",
  "San Luis",
  "Catamarca",
  "La Rioja",
  "La Pampa",
  "Santa Cruz",
  "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
];

const headers = {
  "Content-Type": "application/json",
  "X-Greenlab-App": 'formulario-votacion-bosques'
};

export const Component:FC<{}> = () => {
  const { data, submitted, submitting, dispatch } = useFormContext();
  const userRef = useRef<HTMLDivElement>(null);
  const agePermittedRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [ checked, setChecked ] = useState<boolean>(false);


  const onChangeQuestion = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          ['answer']: parseInt(evt.currentTarget.value),
        },
      })
    },
    [ dispatch ]
  )

  const onClickQuestion = useCallback(
    (evt: React.MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault()

      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          ['answer']: parseInt((evt.currentTarget as any).dataset.value),
        },
      })
    },
    [ dispatch ]
  )

  const onChange = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      evt.preventDefault();
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          [`${evt.currentTarget.name}`]: evt.currentTarget.value,
        },
      })
    },
    [ dispatch ]
  )
  
  const postData = useCallback(async () => {
    console.log(window.navigator.onLine)

    if(window.navigator.onLine) {
      dispatch({ type: 'SUBMIT' });
  
      const resHubsot = await fetch(
        `${process.env.NEXT_PUBLIC_GP_API}hubspot/contact`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            email: data.email,
            firstname: data.fullName,
            lastname: data.fullName,
            phone: data.phoneNumber,
            city: data.province,
            dni: data.docNumber,
          }),
        }
      );
  
      const resForma = await fetch(
        `${process.env.NEXT_PUBLIC_GP_API}forma/form/${data.answer ? process.env.NEXT_PUBLIC_FORM_ID_YES : process.env.NEXT_PUBLIC_FORM_ID_NO}/record`,
        {
          method: 'POST',
          headers,
          body: JSON.stringify({
            citizenId: data.docNumber,
            email: data.email,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            provincia: data.province,
          }),
        }
      );

      if(resHubsot.ok) {
        window.dataLayer.push({
          event: "formSubmission",
        })
      }
  
      if(resHubsot.ok && resForma.ok) {
        dispatch({ type: 'SUBMITTED' });
      } else {
        dispatch({
          type: 'FAILURE',
          error: 'Hubo un error inesperado. Volvé a intentar en unos segundos.'
        })
      }
    } else {
      // Only when the connection is down
      const offlineUsers = window.localStorage.getItem('users')
      if(offlineUsers) {
        const users = (JSON.parse(offlineUsers) as Array<any>)
        users.push({
          docNumber: data.docNumber,
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          province: data.province,
          answer: data.answer,
        } as UserType)
        // Update offline users
        window.localStorage.setItem('users', JSON.stringify(users))
      } else {
        // Create offline users
        window.localStorage.setItem('users', JSON.stringify([
          {
            docNumber: data.docNumber,
            email: data.email,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            province: data.province,
            answer: data.answer,
          } as UserType
        ]))
      }
    }
  }, [
    data,
    dispatch,
  ]);

  // const onChangeCheckbox = useCallback(
  //   (evt: React.ChangeEvent<HTMLInputElement>) => {
  //     evt.preventDefault();
  //     console.log(data.agePermitted)
  //     dispatch({
  //       type: 'UPDATE_FIELD',
  //       payload: {
  //         [`${evt.currentTarget.name}`]: !data.agePermitted,
  //       },
  //     })
  //     // setChecked(!checked)
  //   },
  // [
  //   data,
  //   checked,
  //   dispatch,
  // ])

  const onChangeCheckbox = (evt: React.ChangeEvent<HTMLInputElement>) => {
    evt.preventDefault();
    console.log(data.agePermitted)
    dispatch({
      type: 'UPDATE_FIELD',
      payload: {
        [`${evt.currentTarget.name}`]: !data.agePermitted,
      },
    })
    // setChecked(!checked)
  }

  const onSubmit = useCallback(
    async (evt: React.FormEvent) => {
      evt.preventDefault();
      postData();
    },
    [ postData ]
  );

  useEffect(() => {
    if(agePermittedRef.current) {
      agePermittedRef.current.checked = data.agePermitted
    }
  }, [
    data.agePermitted,
    agePermittedRef,
  ])

  useEffect(() => {
    if(submitted) {
      router.push(`/thank-you`)
    }
  }, [
    submitted,
    router,
  ])

  useEffect(() => {
    if(data.answer !== -1 && userRef.current) {
      const elementRect = userRef.current.getBoundingClientRect();
      
      window.scrollTo({
        top: elementRect.top - 100,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [ data.answer ])

  return useMemo(() => (
    <>
      <form className={styles.main} onSubmit={onSubmit}>
        <div className={styles.question}>
          <h3 className={styles.questionText}>¿Estás a favor de que se establezcan penas de prisión para los responsables de desmontes ilegales e incendios forestales?</h3>
          <div className={styles.column}>
            <nav className={styles.answerNav}>
              <button onClick={onClickQuestion} className={`${styles.answerBtn} ${data.answer === 1 ? styles.answerSelected : ''}`} data-value={1}>SI</button>
              <button onClick={onClickQuestion} className={`${styles.answerBtn} ${data.answer === 0 ? styles.answerSelected : ''}`} data-value={0}>NO</button>
            </nav>
          </div>
        </div>
        <div ref={userRef} className={styles.userSection}>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor='fullName'>
                <input
                  name='fullName'
                  placeholder='Nombre y apellido'
                  value={data.fullName}
                  required={true}
                  minLength={2}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className={styles.column}>
              <label htmlFor='docNumber'>
                <input
                  type='number'
                  name='docNumber'
                  placeholder='Documento de Identidad'
                  minLength={7}
                  maxLength={8}
                  required={true}
                  value={data.docNumber}
                  onChange={onChange}
                />
              </label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor='phoneNumber'>
                <input onChange={onChange} type='phoneNumber' name='phoneNumber' placeholder='Número de teléfono' value={data.phoneNumber} />
              </label>
            </div>
            <div className={styles.column}>
              <label htmlFor='email'>
                <input onChange={onChange} type='email' name='email' placeholder='Correo electrónico' value={data.email} />
              </label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor='province'>Provincia
                <select
                  name='province'
                  value={data.province}
                  onChange={onChange}
                >
                  <option value="" />
                  {provinces.map((province: string) => <option key={province} value={province}>{province}</option>)}
                </select>
              </label>
            </div>
          </div>
          {`${checked}`}
          <div className={styles.row}>
            <div className={`${styles.column}`}>
              <label htmlFor='agePermitted' className={styles.checkbox}>
                Soy mayor de 16 años {data.agePermitted ? 'true' : 'false'}
                {/* <input ref={agePermittedRef} type="checkbox" name='agePermitted' onChange={onChangeCheckbox} checked={data.agePermitted} /> */}
                <input ref={agePermittedRef} type="checkbox" name='agePermitted' onChange={onChangeCheckbox} />
                {/* <input type="checkbox" name='agePermitted' onChange={onChangeCheckbox} checked={checked} /> */}
              </label>
            </div>
          </div>
        </div>
        <nav className={styles.nav}>
          <button className={`${styles.submitBtn} ${(submitting || submitted)  ? styles.disable : ''}`} type='submit'>{submitting ? 'ENVIANDO VOTO ...' :'VOTAR'}</button>
        </nav>
      </form>
    </>
  ), [
    data,
    submitting,
    submitted,
    userRef,
    agePermittedRef,
    checked,
    onChange,
    onChangeCheckbox,
    onChangeQuestion,
    onClickQuestion,
    onSubmit,
  ]);
}

// export default function QuizForm() {
//   return (
//     <Provider>
//       <QuizForm />
//     </Provider>
//   )
// }
Component.displayName = 'QuizForm'
export default Component
