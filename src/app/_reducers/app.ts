export interface GenericReducerFn<S, A> { 
  (state: S, action: A): S;
}

export type UserType = {
  id?: number,
  firstName: string;
  lastName: string;
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

export type QuizType = {
  yesVotes?: number;
  noVotes?: number;
}

export type DataType = {
  user: UserType;
  quiz: QuizType;
}
// export interface IData {
//   user: IUserData;
//   payment: IPaymentData;
// }

export type SharedState = {
  submitted: boolean,
  submitting: boolean,
  fetched: boolean,
  fetching: boolean,
  error: string | null,
};

export type SharedActions = 
  | { type: 'SUBMIT' }
  | { type: 'SUBMITTED' }
  | { type: 'FETCH' }
  | { type: 'FETCHED' }
  | { type: 'ERROR', payload: { error: string | null; } }
  | { type: 'FAILURE', error: any }
  | { type: 'UPDATE_FIELD', payload: any }
  | { type: 'UPDATE_QUIZ', payload: QuizType }
  
// export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;
// export type OnClickEvent = MouseEvent<HTMLButtonElement>;
// export type FeedbackType = 'positive' | 'negative';

// export type {
//   GoogleTagManagerEventType,
// };


export type ContextStateType = {
  user: UserType;
  quiz: QuizType;
} & SharedState;

export type ContextActionType = SharedActions;

export const initialState: ContextStateType = {
  user: {
    firstName: '',
    lastName: '',
    docNumber: '',
    phoneNumber: '',
    email: '',
    province: '',
    answer: -1,
    agePermitted: false,
    ...((process.env.NEXT_PUBLIC_FILL_FORM === 'true') ? {
      firstName: 'Doe',
      lastName: 'Deer',
      docNumber: '12345678',
      phoneNumber: '44440000',
      email: 'doe.deer@email.com',
      province: 'Buenos Aires',
    } : {}),
  } as UserType,
  quiz: {} as QuizType,
  submitted: false,
  submitting: false,
  fetching: false,
  fetched: false,
  error: null,
}

export const reducer: GenericReducerFn<ContextStateType, ContextActionType> = (state: ContextStateType, action: ContextActionType) => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      }
    }
    case 'UPDATE_QUIZ': {
      return {
        ...state,
        quiz: {
          ...state.quiz,
          yesVotes: action.payload.yesVotes,
          noVotes: action.payload.noVotes,
        },
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
    case 'FETCH': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }
    case 'FETCHED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
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
    case 'ERROR': {
      return {
        ...state,
        error: action.payload.error || null,
      }
    }
    default: {
      throw new Error('Reducer Error');
    }
  }
}
