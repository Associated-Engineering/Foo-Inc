import { cognitoLogin } from 'api/adminAuth'

export const loginAction = (username, password) => (dispatch) => {
    dispatch({
        type: "SET_READY",
        payload: {
            ready: false
        }
    });

    cognitoLogin(username, password)
        .then((response) => {
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
