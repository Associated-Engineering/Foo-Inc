import { Auth } from "aws-amplify";

export function cognitoLogin(email, password) {
  return Auth.signIn(email, password);
}