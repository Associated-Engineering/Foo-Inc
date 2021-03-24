import { loadFiltersAction } from "actions/filterAction";
import { setAdmin } from 'actions/generalAction';
import { Auth } from 'aws-amplify';
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Routes from "./Routes";

function App(props) {
    React.useEffect(() => {
        // Loads the initial filter data
        props.loadFiltersAction();

        Auth.currentSession()
            .then(() => {
                props.setAdmin();
            })
            .catch((res) => {
                console.error(res);
            })
    }, [props]); // TODO Make sure that this only runs once
    return (
        <div className="App">
            <Router>{Routes()}</Router>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setAdmin: () => dispatch(setAdmin()),
    loadFiltersAction: () => dispatch(loadFiltersAction()),
});

export default connect(null, mapDispatchToProps)(App);
