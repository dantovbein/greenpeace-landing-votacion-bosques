"use client"

import React, { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/_components/QuizForm/styles.module.css'
import { useAppContext } from "@/app/_contexts/app";
import { UserType } from '@/app/_reducers/app';
import { validateCitizenId, validateEmail, validateEmptyField, validateFirstName, validateLastName, validatePhoneNumber } from '@/utils/validator';

declare const window: Window & { dataLayer: Record<string, unknown>[]; };

export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;

const provinces: Array<string> = [
  "No vivo en Argentina",
  "Buenos Aires",
  "Catamarca",
  "Chaco",
  "Chubut",
  "Ciudad Autónoma de Buenos Aires",
  "Córdoba",
  "Corrientes",
  "Entre Ríos",
  "Formosa",
  "Jujuy",
  "La Pampa",
  "La Rioja",
  "Mendoza",
  "Misiones",
  "Neuquén",
  "Río Negro",
  "Salta",
  "San Juan",
  "San Luis",
  "Santa Cruz",
  "Santa Fe",
  "Santiago del Estero",
  "Tierra del Fuego",
  "Tucumán",
];

const headers = {
  "Content-Type": "application/json",
  "X-Greenlab-App": 'formulario-votacion-bosques'
};

export const Component:FC<{}> = () => {
  const { user, submitted, submitting, error, dispatch } = useAppContext();
  const userRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const validate = useCallback(() => {
    let isValid = true;
    const checks = [
      validateFirstName(user.firstName),
      validateLastName(user.lastName),
      validateCitizenId(user.docNumber),
      validatePhoneNumber(user.phoneNumber),
      validateEmail(user.email),
      validateEmptyField(user.province),
    ]

    checks.forEach((check:any) => {
      if(isValid && !check.isValid) {
        isValid = false
        dispatch({
          type: 'ERROR',
          payload: { error: check.errorMessage || null },
        })
        return
      }
    })

    if(isValid) {
      dispatch({
        type: 'ERROR',
        payload: { error: null },
      })
    }

    return isValid
  }, [
    user,
    dispatch,
  ])
  
  const postData = useCallback(async () => {
    if(validate()) {
      if(window.navigator.onLine) {
        dispatch({ type: 'SUBMIT_FORM' });

        // Check if the user has already voted
        const userResponse = await (await fetch(`${process.env.NEXT_PUBLIC_GP_API}hubspot/contact/email/${user.email}`)).json();
        if(userResponse && userResponse.votacion_campana_bosques) {
          dispatch({ type: 'FAILURE', error: 'No se pueden emitir mas de un voto.'})
          return;
        }

        const answer = (user.answer === 1) ? 'SI' : 'NO'
  
        const resHubsot = await fetch(
          `${process.env.NEXT_PUBLIC_GP_API}hubspot/contact`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              email: user.email,
              firstname: user.firstName,
              lastname: user.lastName,
              phone: user.phoneNumber,
              lugar_de_residencia: user.province,
              dni__c: user.docNumber,
              Votacion_campana_bosques: user.answer === -1 ? '' : answer,
            }),
          }
        );
    
        const resForma = await fetch(
          `${process.env.NEXT_PUBLIC_GP_API}forma/form/${user.answer ? process.env.NEXT_PUBLIC_FORM_ID_YES : process.env.NEXT_PUBLIC_FORM_ID_NO}/record`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({
              citizenId: user.docNumber,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
              provincia: user.province,
              campaignName: answer,
              userAgent: window.navigator.userAgent.replace(/;/g, '').replace(/,/g, ''),
              fromUrl: window.location.search || '?',
            }),
          }
        );
  
        if(resHubsot.ok) {
          window.dataLayer.push({
            event: "formSubmission",
          })
        }
    
        if(resHubsot.ok && resForma.ok) {
          dispatch({ type: 'SUBMITTED_FORM' });
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
            id: new Date().getTime(),
            docNumber: user.docNumber,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            province: user.province,
            answer: user.answer,
          } as UserType)
          // Update offline users
          window.localStorage.setItem('users', JSON.stringify(users))
        } else {
          // Create offline users
          window.localStorage.setItem('users', JSON.stringify([
            {
              id: new Date().getTime(),
              docNumber: user.docNumber,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              phoneNumber: user.phoneNumber,
              province: user.province,
              answer: user.answer,
            } as UserType
          ]))
        }
      }
    } else {
      console.log('Formulario inválido')
    }
  }, [
    user,
    dispatch,
  ]);

  const onChangeCheckbox = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          [`${evt.currentTarget.name}`]: !user.agePermitted,
        },
      })
    },
  [
    user,
    dispatch,
  ])

  const onSubmit = useCallback(
    async (evt: React.FormEvent) => {
      evt.preventDefault();
      postData();
    },
    [ postData ]
  );

  useEffect(() => {
    if(submitted) {
      router.push(`/thank-you`)
    }
  }, [
    submitted,
    router,
  ])

  useEffect(() => {
    if(user.answer !== -1 && userRef.current) {
      const elementRect = userRef.current.getBoundingClientRect();
      
      window.scrollTo({
        top: elementRect.top - 100,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [ user.answer ])

  return useMemo(() => (
    <>
      <form className={styles.main} onSubmit={onSubmit}>
        <div className={styles.question}>
          <h3 className={styles.questionText}>¿Estás a favor de que se establezcan penas de prisión para los responsables de desmontes ilegales e incendios forestales?</h3>
          <div className={styles.column}>
            <nav className={styles.answerNav}>
              <button onClick={onClickQuestion} className={`${styles.answerBtn} ${user.answer === 1 ? styles.answerSelected : ''}`} data-value={1}>SI</button>
              <button onClick={onClickQuestion} className={`${styles.answerBtn} ${user.answer === 0 ? styles.answerSelected : ''}`} data-value={0}>NO</button>
            </nav>
          </div>
        </div>
        <h2 className={styles.subHeading}>Completá tus datos</h2>
        <div ref={userRef} className={styles.userSection}>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor='firstName'>
                <input
                  name='firstName'
                  placeholder='Nombre'
                  value={user.firstName}
                  minLength={2}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className={styles.column}>
              <label htmlFor='lastName'>
                <input
                  name='lastName'
                  placeholder='Apellido'
                  value={user.lastName}
                  minLength={2}
                  onChange={onChange}
                />
              </label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor='docNumber'>
                <input
                  type='number'
                  name='docNumber'
                  placeholder='Documento de Identidad'
                  minLength={7}
                  maxLength={8}
                  value={user.docNumber}
                  onChange={onChange}
                />
              </label>
            </div>
            <div className={styles.column}>
              <label htmlFor='phoneNumber'>
                <input onChange={onChange} type='phoneNumber' name='phoneNumber' placeholder='Número de teléfono' value={user.phoneNumber} />
              </label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor='email'>
                <input onChange={onChange} type='email' name='email' placeholder='Correo electrónico' value={user.email} />
              </label>
            </div>
            <div className={styles.column}>
              <label htmlFor='province'>Provincia
                <select
                  name='province'
                  value={user.province}
                  onChange={onChange}
                >
                  <option value="" />
                  {provinces.map((province: string) => <option key={province} value={province}>{province}</option>)}
                </select>
              </label>
            </div>
          </div>
          <div className={styles.row}>
            <div className={`${styles.column}`}>
              <label htmlFor='agePermitted' className={styles.checkbox}>
                <span><strong>Soy mayor de 16 años</strong></span>
                <input type="checkbox" name='agePermitted' onChange={onChangeCheckbox} />
              </label>
            </div>
          </div>
        </div>
        <nav className={styles.nav}>
          <button
            className={styles.submitBtn}
            type='submit'
            disabled={(submitting || submitted || !user.agePermitted || user.answer === -1)}
          >
            {submitting ? 'ENVIANDO VOTO ...' :'VOTAR'}
          </button>
        </nav>
        {(error) && <span className={styles.error}>{error}</span>}
      </form>
    </>
  ), [
    user,
    submitting,
    submitted,
    error,
    userRef,
    validate,
    onChange,
    onChangeCheckbox,
    onChangeQuestion,
    onClickQuestion,
    onSubmit,
  ]);
}

Component.displayName = 'QuizForm'
export default Component
