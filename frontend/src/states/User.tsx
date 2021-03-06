import { atom, AtomEffect } from "recoil";
import JWTDecode from 'jwt-decode';
import { User } from "../interfaces/user.interface";

const getLoggedInUser = () => {
  const userToken = localStorage.getItem('token');
  if (userToken) {
    const user = {...JWTDecode(userToken) as Partial<User>, token: userToken};
    const currentTime = new Date().getTime() / 1000;
    return user.exp as number > currentTime ? user : null;
  }
};

const localStorageEffect = (): AtomEffect<any> => ({onSet}) => {
  onSet((value: User) => {
    value ? localStorage.setItem('token', value.token) : localStorage.clear();
  });
};

export const userState = atom({
  key: 'User state',
  default: getLoggedInUser(),
  effects_UNSTABLE: [
    localStorageEffect()
  ],
});