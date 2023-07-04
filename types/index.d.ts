// import { EventType as GoogleTagManagerEventType } from 'google-tag-manager';

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}


// declare const window: Window & { dataLayer: Record<string, unknown>[]; };

// export type ParamsType = {
//   couponType: string;
// };

// export interface CustomHTMLScriptElement extends HTMLScriptElement {
//   view?: string;
// }

// export interface GenericReducerFn<S, A> { 
//   (state: S, action: A): S;
// }

// export type StylesType = {
//   [el: string]: React.CSSProperties,
// };
  
// export type AxiosResquestError = {
//   error: boolean,
//   status: number,
//   message: string,
// };

// export type ServiceParams = {
//   public_key?: string;
// }

// export interface IUserData {
//   firstName: string;
//   lastName: string;
//   birthDate: string;
//   email: string;
//   areaCode: string;
//   phoneNumber: string;
//   birthDate: string;
//   genre: '' | 'female' | 'male' | 'non-binary';
//   docNumber: string;
//   docType: string;
// }

// export interface IPaymentData {
//   cardNumber: string;
//   cardholderName: string;
//   securityCode: string;
//   cardExpirationMonth: string;
//   cardExpirationYear: string;
//   issuerInput: string;
//   transactionAmount: string;
//   paymentMethodId: string;
//   // docNumber: string;
//   // docType: string;
//   amount: string;
//   newAmount: string;
// }

// export interface IData {
//   user: IUserData;
//   payment: IPaymentData;
// }

// export type SharedState = {
//   submitting?: boolean,
//   submitted?: boolean,
//   fetching?: boolean,
//   fetched?: boolean,
// };

// export type SharedActions = 
//   | { type: 'SUBMIT' }
//   | { type: 'SUBMITTED' }
//   | { type: 'CANCEL' }
//   | { type: 'FAILURE', error: any }
  
// export type OnChangeEvent = MouseEvent<HTMLButtonElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLSelectElement>;
// export type OnClickEvent = MouseEvent<HTMLButtonElement>;

// export type {
//   GoogleTagManagerEventType,
// };
