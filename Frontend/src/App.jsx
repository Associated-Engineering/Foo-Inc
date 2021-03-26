import { loadFiltersAction } from "actions/filterAction";
import { Auth } from 'aws-amplify';
import { configureCurrUser, setAdmin } from "actions/generalAction";
import { searchWithAppliedFilterAction } from "actions/searchAction";
import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Routes from "./Routes";

function App(props) {
    React.useEffect(() => {
        // Loads the initial filter data
        props.loadFiltersAction();

        // Load the current user and set the current user's physical location as a filter
        props.configureCurrUser();
      
        Auth.currentSession()
            .then(() => {
                props.setAdmin();
            })
            .catch((res) => {
                console.error(res);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes />
            </Router>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setAdmin: () => dispatch(setAdmin()),
    loadFiltersAction: () => dispatch(loadFiltersAction()),
    configureCurrUser: () => dispatch(configureCurrUser()),
    searchWithAppliedFilters: () => dispatch(searchWithAppliedFilterAction()),
});

export default connect(null, mapDispatchToProps)(App);
