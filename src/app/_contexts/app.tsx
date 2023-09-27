'use client'

import React, { createContext, useMemo, useReducer, useContext, useCallback } from "react";
import { QuizType, SharedActions, UserType, initialState, reducer } from '@/app/_reducers/app';

interface IProps {
  children: React.ReactNode;
}

interface IContextProps {
  submitted: boolean;
  submitting: boolean;
  fetched: boolean;
  fetching: boolean;
  error: string | null;
  user: UserType;
  quiz: QuizType;
  fetchVotes: () => void;
  dispatch: React.Dispatch<SharedActions>,
}

const Context = createContext<IContextProps>({} as IContextProps);
Context.displayName = 'FormContext';

export const Provider: React.FunctionComponent<IProps> = ({ children }) => {
  const [{ user, quiz, submitted, submitting, fetched, fetching, error }, dispatch] = useReducer(reducer, initialState);

  const fetchVotes = useCallback(async () => {
    dispatch({ type: 'FETCH_VOTES' })
    const formYes = await (await fetch(`${process.env.NEXT_PUBLIC_GP_API}forma/form/${process.env.NEXT_PUBLIC_FORM_ID_YES}`)).json();
    const formNo = await (await fetch(`${process.env.NEXT_PUBLIC_GP_API}forma/form/${process.env.NEXT_PUBLIC_FORM_ID_NO}`)).json();
    
    dispatch({
      type: 'UPDATE_QUIZ',
      payload: {
        yesVotes: 68722 + 155631 + (formYes.total || 0),
        noVotes: 13 + (formNo.total || 0),
      }
    })
    
    dispatch({ type: 'FETCHED_VOTES' })
  }, [ dispatch ])

  return useMemo(() => (
    <Context.Provider value={{
      user,
      quiz,
      submitted,
      submitting,
      fetched,
      fetching,
      error,
      fetchVotes,
      dispatch,
    }}>
      { children }
    </Context.Provider>
  ), [
    children,
    user,
    quiz,
    fetched,
    fetching,
    submitted,
    submitting,
    error,
    fetchVotes,
    dispatch,
  ]);
};

export const useAppContext = () => useContext(Context);
