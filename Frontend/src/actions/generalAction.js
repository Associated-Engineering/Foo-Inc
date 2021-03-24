export const setFocusedWorkerId = (payload) => (dispatch) => {
	dispatch({
		type: "SET_FOCUSED_WORKERID",
		payload: {
			focusedWorkerId: payload,
		}
	});
}

export const setAdmin = () => (dispatch) => {
	dispatch({
		type: "SET_ADMIN_PERM",
		payload: {
			isAdmin: true
		},
    });
}
