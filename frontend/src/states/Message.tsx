import { atom } from "recoil";

export const messageState = atom({
  key: 'Message state',
  default: ''
});