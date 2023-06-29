export interface GenericReducerFn<S, A> { 
  (state: S, action: A): S;
}

export type UserType = {
  fullName: string;
  agePermitted: boolean;
  answer: -1 | 0 | 1;
  // lastName: string;
  // birthDate: string;
  email: string;
  // areaCode: string;
  phoneNumber: string;
  // birthDate: string;
  // genre: '' | 'female' | 'male' | 'non-binary';
  docNumber: string;
  province: string;
  // docType: string;
}

// export interface IData {
//   user: IUserData;
//   payment: IPaymentData;
// }

export type SharedState = {
  submitted: boolean,
  submitting: boolean,
};

export type SharedActions = 
  | { type: 'SUBMIT' }
  | { type: 'SUBMITTED' }
  // | { type: 'CANCEL' }
  | { type: 'FAILURE', error: any }
  | { type: 'UPDATE_FIELD', payload: any }
  
// export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;
// export type OnClickEvent = MouseEvent<HTMLButtonElement>;
// export type FeedbackType = 'positive' | 'negative';

// export type {
//   GoogleTagManagerEventType,
// };


export type ContextStateType = {
  data: UserType;
} & SharedState;

export type ContextActionType = SharedActions;

export const initialState: ContextStateType = {
  data: {
    fullName: '',
    docNumber: '',
    phoneNumber: '',
    email: '',
    province: '',
    answer: -1,
    agePermitted: false,
    ...((process.env.NEXT_PUBLIC_FILL_FORM === 'true') ? {
      fullName: 'Doe Deer',
      docNumber: '12345678',
      phoneNumber: '44440000',
      email: 'doe.deer@email.com',
      province: 'Buenos Aires',
    } : {}),
  } as UserType,
  submitted: false,
  submitting: false,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      console.log(action.payload)
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        }
      }
    }
    case 'SUBMIT': {
      return {
        ...state,
        submitting: true,
        submitted: false,
      }
    }
    case 'SUBMITTED': {
      return {
        ...state,
        submitting: false,
        submitted: true,
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        submitting: true,
        submitted: false,
        error: action.error,
      }
    }
    default: {
      throw new Error('Reducer Error');
    }
  }
}
