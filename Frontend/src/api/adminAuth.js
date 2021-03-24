import { Auth } from "aws-amplify";

export function cognitoLogin(username, password) {
  return Auth.signIn(username, password);
}
