export interface GenericReducerFn<S, A> { 
  (state: S, action: A): S;
}

export type UserType = {
  id?: number,
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  docNumber: string;
  province: string;
}

export type QuizType = {
  yesVotes: number | null;
  noVotes: number | null;
  totalVotes?: number | null;
}

export type DataType = {
  user: UserType;
  quiz: QuizType;
}

export type SharedState = {
  submitted: boolean,
  submitting: boolean,
  fetched: boolean,
  fetching: boolean,
  error: string | null,
};

export type SharedActions = 
  | { type: 'SUBMIT_FORM' }
  | { type: 'SUBMITTED_FORM' }
  | { type: 'FETCH_VOTES' }
  | { type: 'FETCHED_VOTES' }
  | { type: 'RESET_VOTES' }
  | { type: 'ERROR', payload: { error: string | null; } }
  | { type: 'FAILURE', error: any }
  | { type: 'UPDATE_FIELD', payload: any }
  | { type: 'UPDATE_QUIZ', payload: QuizType }

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
          totalVotes: (action.payload.yesVotes || 0) + (action.payload.noVotes || 0)
        },
      }
    }
    case 'SUBMIT_FORM': {
      return {
        ...state,
        submitting: true,
        submitted: false,
      }
    }
    case 'SUBMITTED_FORM': {
      return {
        ...state,
        submitting: false,
        submitted: true,
      }
    }
    case 'FETCH_VOTES': {
      return {
        ...state,
        fetching: true,
        fetched: false,
      }
    }
    case 'FETCHED_VOTES': {
      return {
        ...state,
        fetching: false,
        fetched: true,
      }
    }
    case 'RESET_VOTES': {
      return {
        ...state,
        quiz: {
          yesVotes: null,
          noVotes: null,
          totalVotes: null,
        }
      }
    }
    case 'FAILURE': {
      return {
        ...state,
        submitting: false,
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
