import { Card, CardContent, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import ImagePlaceholder from "./ImagePlaceholder";
import styled from "styled-components";
import OrgChartIcon from "./OrgChartIcon";
import "../common/Common.css";
import React from "react";

export default function EmployeeCard(props) {
    const { employee, centered } = props;
    return (
        <StyledCard 
            // @ts-ignore
            centered={centered}>
            <Link to={`/profile/${employee.employeeId}`}>
                <EmployeeCardContent>
                    <PositionDiv>
                        <Link to={`/orgchart/${employee.employeeId}`}>
                            <StyledOrgChartIcon />
                        </Link>
                    </PositionDiv>
                    <ImagePlaceholder />
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        component="p"
                    >
                        <b>Name:</b>{" "}
                        {`${employee.firstName} ${employee.lastName}`}
                        <br />
                        <b>Title:</b> {employee.title}
                        <br />
                    </Typography>
                </EmployeeCardContent>
            </Link>
        </StyledCard>
    );
}

const StyledCard = styled(Card)`
    && {
        box-shadow: none;
    }
    max-width: 250px;
    max-height: 275px;
    ${props => /* @ts-ignore */
        props.centered && 'margin: auto;'}
`;

const EmployeeCardContent = styled(CardContent)`
    max-width: 250px;
    max-height: 275px;
    width: 100%;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 25px;
    > * {
        width: 100%;
        text-align: center;
    }
`;

const PositionDiv = styled.div`
    position: relative;
    left: calc(93% - 10px);
    width: 0;
    height: 0;
`;

const StyledOrgChartIcon = styled(OrgChartIcon)`
    position: absolute;
    rect {
        transition: fill 0.25s;
    }
    &:hover {
        rect {
            fill: midnightblue;
        }
    }
`;
