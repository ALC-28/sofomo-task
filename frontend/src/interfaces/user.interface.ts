export interface User {
  token: string;
  firstName: string; 
  lastName: string; 
  email: string;
  iat?: number;
  exp?: number;
}