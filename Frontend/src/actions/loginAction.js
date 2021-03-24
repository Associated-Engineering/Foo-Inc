import { cognitoLogin } from 'api/adminAuth'

export const loginAction = (email, password) => (dispatch) => {
    dispatch({
        type: "SET_READY",
        payload: {
            ready: false
        }
    });

    cognitoLogin(email, password)
        .then((response) => {
            console.log(response);

            dispatch({
                type: "SET_ADMIN_PERM",
                payload: {
                    isAdmin: true
                },
            });

            dispatch({
                type: "SET_READY",
                payload: {
                    ready: true
                }
            });
        })
        .catch((error) => {
            console.error("Admin login failed.\nErr:", error);

            dispatch({
                type: "SET_READY",
                payload: {
                    ready: true
                }
            });
        });
}
