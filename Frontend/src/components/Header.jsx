import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { AppBar, Toolbar } from "@material-ui/core";
import styled from "styled-components";

function Header(props) {
    // See React router for more info about headers
    return (
        <AppBar position="fixed">
            <StyledToolbar>
                <StyledNavContainer>
                    <StyledLink to="/search">Search Home</StyledLink>
                    <StyledLink to="/profile">Profile View</StyledLink>
                    <StyledLink to="/orgchart">Org Chart</StyledLink>
                    <StyledLink to="/">Dashboard (with redux demo)</StyledLink>
                </StyledNavContainer>
            </StyledToolbar>
        </AppBar>
    );
}

export default connect()(Header);

const StyledNavContainer = styled.div`
    margin-left: auto;
`;

const StyledLink = styled(Link)`
    color: black;
    margin-left: 1rem;
`;

const StyledToolbar = styled(Toolbar)`
    background-color: #f4f4f4;
`;