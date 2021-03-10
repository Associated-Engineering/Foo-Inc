import React from "react";
import EmployeeCard from "../common/EmployeeCard";
import { Pagination } from "@material-ui/lab";
import styled from "styled-components";
import data from "../../mocks/mockEmployees.json";
import { useHistory, useLocation } from "react-router";
import "../common/Common.css";
import { setPageAction } from 'actions/searchAction';
import { connect } from 'react-redux';

const entriesPerPage = 6;

const getEmployee = (index) => {
    if (index < data.length) {
        return (
            <div className="card-grid-col">
                <EmployeeCard employee={data[index]} />
            </div>
        );
    }
};

function ResultsArea(props) {
    const history = useHistory();
    const location = useLocation();
    const { pageNumber, updatePage } = props;

    const handleChange = (_event, value) => {
        let params = new URLSearchParams(location.search);
        params.set("page", value);
        history.push({ search: params.toString() });
    }

    React.useEffect(() => {
        let params = new URLSearchParams(location.search);
        const page = Number(params.get("page"));

        // Sync Redux with URL page param
        if (page && page !== pageNumber) {
            updatePage(page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <>
            <div className="card-grid">
                {getEmployee((pageNumber - 1) * entriesPerPage + 0)}
                {getEmployee((pageNumber - 1) * entriesPerPage + 1)}
                {getEmployee((pageNumber - 1) * entriesPerPage + 2)}
            </div>
            <div className="card-grid">
                {getEmployee((pageNumber - 1) * entriesPerPage + 3)}
                {getEmployee((pageNumber - 1) * entriesPerPage + 4)}
                {getEmployee((pageNumber - 1) * entriesPerPage + 5)}
            </div>
            <StyledPagination
                count={Math.max(Math.ceil(data.length / 6), 1)}
                page={pageNumber}
                onChange={handleChange}
            />
        </>
    );
}

const StyledPagination = styled(Pagination)`
    > * {
        justify-content: center;
    }
`;

const mapStateToProps = (state) => ({
    pageNumber: state.searchPageState.pageNumber,
});

const mapDispatchToProps = (dispatch) => ({
    updatePage: (value) =>
        dispatch(setPageAction(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultsArea);
