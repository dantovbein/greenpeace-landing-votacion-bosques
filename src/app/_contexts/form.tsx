'use client'

import React, { createContext, useMemo, useReducer, useContext } from "react";
import { SharedActions, UserType, initialState, reducer } from '@/app/_reducers/form';

// type ContextType = {
//   submitted: boolean;
//   submitting: boolean;
//   data: UserType,
//   dispatch: React.Dispatch<SharedActions>,
// }

interface IProps {
  children: React.ReactNode;
}

interface IContextProps {
  submitted: boolean;
  submitting: boolean;
  data: UserType,
  dispatch: React.Dispatch<SharedActions>,
}

const Context = createContext<IContextProps>({} as IContextProps);
Context.displayName = 'FormContext';

export const Provider: React.FunctionComponent<IProps> = ({ children }) => {
  const [{ data, submitted, submitting }, dispatch] = useReducer(reducer, initialState);

  return useMemo(() => (
    <Context.Provider value={{
      data,
      submitted,
      submitting,
      dispatch,
    }}>
      { children }
    </Context.Provider>
  ), [
    children,
    data,
    submitted,
    submitting,
    dispatch,
  ]);
};

export const useFormContext = () => useContext(Context);

// export {
//   ContextProvider as QuizFormProvider,
//   Consumer as QuizFormConsumer,
//   Context as FormContext,
// }
