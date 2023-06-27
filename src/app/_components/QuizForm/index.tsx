import React, { ChangeEvent, FC, MouseEvent, useCallback, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/_components/QuizForm/styles.module.css'
import { useFormContext } from "@/app/_contexts/form";

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

export const Component:FC<{}> = () => {
  const { data, submitted, submitting, dispatch } = useFormContext();
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
        `https://app.greenpeace.org.ar/api/v1/hubspot/contact`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-Greenlab-App": 'formulario-votacion-bosques'
          },
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
        `https://app.greenpeace.org.ar/api/v1/forma/form/${data.answer ? 69 : 70}/record`,
        {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "X-Greenlab-App": 'formulario-votacion-bosques'
          },
          body: JSON.stringify({
            citizenId: data.docNumber,
            email: data.email,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            provincia: data.province,
          }),
        }
      );
  
      if(resHubsot.ok && resForma.ok) {
        dispatch({ type: 'SUBMITTED' });
      } else {
        console.log('Error')
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
          citizenId: data.docNumber,
          email: data.email,
          fullName: data.fullName,
          phoneNumber: data.phoneNumber,
          provincia: data.province,
          answer: data.answer,
        })
        // Update offline users
        window.localStorage.setItem('users', JSON.stringify(users))
      } else {
        // Create offline users
        window.localStorage.setItem('users', JSON.stringify([
          {
            citizenId: data.docNumber,
            email: data.email,
            fullName: data.fullName,
            phoneNumber: data.phoneNumber,
            provincia: data.province,
            answer: data.answer,
          }
        ]))
      }
    }
  }, [
    data,
    dispatch,
  ]);

  const onChangeCheckbox = useCallback(
    (evt: React.ChangeEvent<HTMLInputElement>) => {
      evt.preventDefault();
      dispatch({
        type: 'UPDATE_FIELD',
        payload: {
          [`${evt.currentTarget.name}`]: evt.currentTarget.checked,
        },
      })
    },
  [ dispatch ])

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
            <label>
              <input type='radio' value={1} checked={data.answer === 1 && false} className={styles.answer} onChange={onChangeQuestion} />
              <div className={`${styles.answerBtn} ${data.answer === 1 ? styles.questionSelected : ''}`}>SI</div>
            </label>
            <label>
              <input type='radio' value={0} checked={data.answer === 0 && false} className={styles.answer} onChange={onChangeQuestion} />
              <div className={`${styles.answerBtn} ${data.answer === 0 ? styles.questionSelected : ''}`}>NO</div>
            </label>
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
          <div className={styles.row}>
            <div className={styles.column}>
              <label htmlFor='agePermitted' className={styles.checkbox}>
                Soy mayor de 16 años {data.agePermitted ? 'true' : 'false'}
                <input type="checkbox" name='agePermitted' onChange={onChangeCheckbox} checked={data.agePermitted} /> 
              </label>
            </div>
          </div>
        </div>
        <nav className={styles.nav}>
          <button className={`${styles.submitBtn} ${(submitting || submitted)  ? styles.disable : ''}`} type='submit'>VOTAR</button>
        </nav>
      </form>
      { submitting && !submitted && <span>Enviando voto ..</span>}
    </>
  ), [
    data,
    submitting,
    submitted,
    userRef,
    onChange,
    onChangeCheckbox,
    onChangeQuestion,
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
