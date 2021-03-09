import { getOrgChartAPI } from "api/orgChartAPI";

export const setOrgChart = (workerId) => (dispatch) => {
    dispatch({
        type: "SET_READY",
        payload: {
            ready: false
        }
    });

    dispatch({
        type: "SET_ORGCHART",
        payload: {
            orgChartState: {},
        },
    });

    dispatch({
        type: "SET_FOCUSED_WORKERID",
        payload: {
            focusedWorkerId: workerId,
        }
    });

    getOrgChartAPI(workerId)
        .then((response) => {
            console.log(response);

            // if employee id is invalid
            if (response.focusedWorker !== null) {
                const workersById = {};
                const workersAllId = [];
                const orgChartState = {};
    
                if (response.supervisor !== null) {
                    workersById[response.supervisor.employeeNumber] = response.supervisor;
                    orgChartState["supervisor"] = response.supervisor.employeeNumber;
                    workersAllId.push(response.supervisor.employeeNumber);
                } else {
                    orgChartState["supervisor"] = undefined;
                }
    
                orgChartState["peers"] = [];
                response.colleagues.forEach(colleague => {
                    workersById[colleague.employeeNumber] = colleague;
                    workersAllId.push(colleague.employeeNumber);
                    orgChartState["peers"].push(colleague.employeeNumber);
                });
    
                orgChartState["subordinates"] = [];
                response.subordinates.forEach(subordinate => {
                    workersById[subordinate.employeeNumber] = subordinate;
                    workersAllId.push(subordinate.employeeNumber);
                    orgChartState["subordinates"].push(subordinate.employeeNumber);
                });
    
                dispatch({
                    type: "ADD_WORKERS",
                    payload: {
                        byId: workersById,
                        allId: workersAllId,
                    }
                });
    
                dispatch({
                    type: "SET_ORGCHART",
                    payload: {
                        orgChartState: orgChartState
                    },
                });
            }

            dispatch({
                type: "SET_READY",
                payload: {
                    ready: true
                }
            });
        })
        .catch((error) => {
            console.error("Filter endpoint failed.\nErr:", error);
        });
};