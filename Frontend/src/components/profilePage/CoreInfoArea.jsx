import { connect } from "react-redux";
import styled from "styled-components";
import EmployeeCard from "../common/EmployeeCard";
import { Typography } from "@material-ui/core";
import "./ProfilePage.css";

function CoreInfoArea(props) {
    const { employee } = props;
    return (
        <ContainerDiv>
            <EmployeeCard employee={employee} centered />
            <div className="heading">Core Information</div>
            <StyledTypography
                variant="body1"
                color="textPrimary"
                component="p"
            >
                <b>Employment Type:</b>{" "}
                {`${employee.employmentType}`}
                <br />
                <b>Years Prior Experience:</b>{" "}
                {`${employee.yearsPriorExperience}`}
                <br />
                <b>Email:</b>{" "}
                {`${employee.email}`}
                <br />
                <b>Cell:</b>{" "}
                {`${employee.workCell}`}
                <br />
            </StyledTypography>
        </ContainerDiv>
    );
}

const ContainerDiv = styled.div`
    width: 30%;
    height: 100%;
    border-right: 1px solid black;
`;

const StyledTypography = styled(Typography)`
    font-size: 18px !important;
    margin-left: 18px !important;  
`;

export default connect()(CoreInfoArea);
