import React from 'react';
import { Button } from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import "components/common/Common.css";

const previousButton = (index, employees) => {
    let prevEmployeeId;
    if (employees && index > 0) {
        prevEmployeeId = employees[index - 1].employeeId;
    }

    return (

        <StyledButton
            disabled={!prevEmployeeId}
            //@ts-ignore
            withSeparator
        >
            <StyledLink className="no-text-transform" to={`/profile/${prevEmployeeId}`}>
                Previous
            </StyledLink>
        </StyledButton>
    );
}

const nextButton = (index, employees) => {
    let nextEmployeeId;
    if (employees && index + 1 < employees.length) {
        nextEmployeeId = employees[index + 1].employeeId;
    }

    return (
        <StyledButton disabled={!nextEmployeeId}>
            <StyledLink to={`/profile/${nextEmployeeId}`}>Next</StyledLink>
        </StyledButton>
    );
}

function PrevNextButtons(props) {
    const { index, employees } = props;

    return (
        <Container className="flex">
            {previousButton(index, employees)}
            <Separator />
            {nextButton(index, employees)}
        </Container>
    );
}

export default PrevNextButtons;

const Container = styled.div`
    margin-top: 25px;
    height: 30px;
    margin-right: 18px;
`;

const StyledButton = styled(Button)`
&&& {
    text-transform: none;
}
`;

const StyledLink = styled(Link)`
&& {
    text-decoration: none;
    color: inherit;
}
`;

const Separator = styled.div`
    width: 1px;
    border-right: 1px solid black;
    margin: 0 4px;
`;