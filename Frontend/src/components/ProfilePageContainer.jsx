import React from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router";
import { PageContainer } from "./common/PageContainer";
import CoreInfoArea from "./profilePage/CoreInfoArea";
import data from "../mocks/mockEmployees.json";
import NotFound from './NotFound';
import SkillsArea from './profilePage/SkillsArea';

export function ProfilePageContainer(props) {
    // @ts-ignore
    const { employeeId } = useParams();
    const employee = data.find((employee) => employee.employeeId === employeeId);

    if (!employee) {
        return <NotFound />;
    }

    return (
        <PageContainer>
            <h1>Profile page</h1>
            <div className="flex">
                <CoreInfoArea employee={employee} />
                <SkillsArea employee={employee} />
            </div>
        </PageContainer>
    );
}

export default withRouter(connect()(ProfilePageContainer));
