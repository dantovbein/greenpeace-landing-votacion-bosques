"use client"

import React, { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/_components/FeedbackForm/styles.module.css'
import { useAppContext } from "@/app/_contexts/app";
import { headers, provinces } from '@/utils/data';
import { validateCitizenId, validateEmail, validateEmptyField, validateFirstName, validateLastName, validatePhoneNumber } from '@/utils/validator';

declare const window: Window & { dataLayer: Record<string, unknown>[]; };

export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;

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
            }),
          }
        );

        if(resHubsot.ok) {
          window.dataLayer.push({
            event: "formSubmission",
          });

          const resForma = await fetch(
            `${process.env.NEXT_PUBLIC_GP_API}forma/form/${process.env.NEXT_PUBLIC_CONTACT_FORM_ID}/record`,
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
                userAgent: window.navigator.userAgent.replace(/;/g, '').replace(/,/g, ''),
                fromUrl: window.location.search || '?',
              }),
            }
          );

          if(resForma.ok) {
            dispatch({ type: 'SUBMITTED_FORM' });
          } else {
            dispatch({
              type: 'FAILURE',
              error: 'Hubo un error inesperado. Volvé a intentar en unos segundos.'
            })
          }

        } else {
          dispatch({
            type: 'FAILURE',
            error: 'Hemos detectado un error en el email.',
          });
        }    
      } 
    } else {
      console.log('Formulario inválido')
    }
  }, [
    user,
    dispatch,
  ]);

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

  return useMemo(() => (
    <>
      <form className={styles.main} onSubmit={onSubmit}>
        <h2 className={styles.subHeading}>Si querés sumar tu apoyo a la campaña y recibir información, completá el siguiente formulario:</h2>
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
        </div>
        <nav className={styles.nav}>
          <button
            className={styles.submitBtn}
            type='submit'
            disabled={(submitting || submitted)}
          >
            {submitting ? 'ENVIANDO ...' :'ENVIAR'}
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
    onChangeQuestion,
    onClickQuestion,
    onSubmit,
  ]);
}

Component.displayName = 'FeedbackForm'
export default Component
