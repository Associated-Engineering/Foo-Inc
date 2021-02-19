import React from "react";
import { connect } from "react-redux";
import { useParams, withRouter } from "react-router";
import { PageContainer } from "./common/PageContainer";
import CoreInfoArea from "./profilePage/CoreInfoArea";
import data from "../mocks/mockEmployees.json";
import NotFound from './NotFound';
import SkillsArea from './profilePage/SkillsArea';
import PrevNextButtons from './profilePage/PrevNextButtons';

export function ProfilePageContainer(props) {
    // @ts-ignore
    const { employeeId } = useParams();
    const index = data.findIndex((employee) => employee.employeeId === employeeId);
    const employee = index !== -1 && data[index];

    if (!employee) {
        return <NotFound />;
    }

    return (
        <PageContainer>
            <div className="flex space-between">
                <h1>Profile page</h1>
                <PrevNextButtons index={index} employees={data} />
            </div>
            <div className="flex">
                <CoreInfoArea employee={employee} />
                <SkillsArea employee={employee} />
            </div>
        </PageContainer>
    );
}

export default withRouter(connect()(ProfilePageContainer));