import { cognitoLogin } from 'api/adminAuth'

export const loginAction = () => (dispatch) => {
    cognitoLogin()
        .then((response) => {
            console.log(response);

            dispatch({
                type: "SET_ADMIN_PERM",
                payload: {
                    isAdmin: true
                },
            });
        })
        .catch((error) => {
            console.error("Admin login failed.\nErr:", error);
        });
}