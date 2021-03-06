import React from "react";
import { Route, Switch } from "react-router-dom";
import { Redirect } from "react-router";
import NotFound from "./components/NotFound";
import OrgChartPageContainer from "./components/OrgChartPageContainer";
import ProfilePageContainer from "./components/ProfilePageContainer";
import SearchPageContainer from "./components/SearchPageContainer";
import Header from "./components/Header";
<<<<<<< HEAD
import { PagePathEnum } from 'components/common/constants';
=======
import { NewContractorsContainer } from "components/NewContractorsContainer";
>>>>>>> basic add contractor page components

export default function Routes() {
    return (
        <Switch>
            <Route exact path={PagePathEnum.SEARCH}>
                <Header activeTabIndex={0} />
                <SearchPageContainer />
            </Route>
            <Route path={`${PagePathEnum.PROFILE}/:workerId`}>
                <Header activeTabIndex={1} />
                <ProfilePageContainer />
            </Route>
            <Route path={`${PagePathEnum.ORGCHART}/:workerId`}>
                <Header activeTabIndex={2} />
                <OrgChartPageContainer />
            </Route>
            <Route path="/">
                <Header activeTabIndex={0} />
<<<<<<< HEAD
                <Redirect to={PagePathEnum.SEARCH} />
=======
                {/* <Redirect to="/search" /> */}
                <NewContractorsContainer/>
>>>>>>> basic add contractor page components
            </Route>
            <Route>
                <Header />
                <NotFound />
            </Route>
        </Switch>
    );
}
