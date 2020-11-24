import { atom, AtomEffect } from "recoil";

export interface User {
  token: string;
  firstName: string; 
  lastName: string; 
  email: string;
  iat?: number;
  exp?: number;
}

const localStorageEffect = (): AtomEffect<any> => ({onSet}) => {
  onSet((value: User) => {
    value ? localStorage.setItem('token', value.token) : localStorage.clear();
  });
};

export const userState = atom({
  key: 'User state',
  default: null,
  effects_UNSTABLE: [
    localStorageEffect()
  ],
});