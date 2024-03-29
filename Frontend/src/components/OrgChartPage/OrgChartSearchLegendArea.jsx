import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useHistory } from "react-router";
import "./OrgChart.css";
import React from "react";
import { getPredictiveSearchAPI } from "../../api/predictiveSearchAPI";
import { PagePathEnum } from "components/common/constants";
import { coordinatedDebounce } from "components/common/helpers";
import { parseFullName } from "parse-full-name";
import { HelpButton } from "components/common/HelpButton";
import { setProfileLinkedToSearchResults } from "actions/generalAction";
import { connect } from "react-redux";

const useStyles = makeStyles({
    searchRect: {
        minWidth: 284,
    },
    loading: {
        color: "#00569c",
        marginLeft: "auto",
        marginRight: "auto",
    },
});

// counter for timeout in case of input change
const predictiveSearchTimer = {};

function OrgChartSearchBar(props) {
    const { setProfileLinkedToSearchResults } = props;
    const history = useHistory();
    const classes = useStyles();
    const [options, setOptions] = React.useState([]);
    const [inputValue, setInputValue] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (inputValue.length >= 2) {
            coordinatedDebounce((name) => {
                const { first, last } = parseFullName(name);
                setLoading(true);
                getPredictiveSearchAPI(first, last)
                    .then((response) => {
                        setOptions(response);
                    })
                    .catch((err) => {
                        console.error(
                            "Org chart predictive search endpoint failed: ",
                            err
                        );
                        setOptions([]);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            }, predictiveSearchTimer)(inputValue);
        }
    }, [inputValue]);

    const handleTextfieldChange = (value, reason) => {
        if (reason === "input") {
            setInputValue(value);
        } else if (reason === "clear" || (reason === "reset" && value === "")) {
            setInputValue("");
        }
    };

    return (
        <Autocomplete
            options={loading ? ["loading"] : options}
            getOptionLabel={() => inputValue}
            openOnFocus={true}
            freeSolo={true}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    label="Search by name"
                    classes={{ root: classes.searchRect }}
                    size="small"
                />
            )}
            renderOption={(option) =>
                loading ? (
                    <div className={"search-dropdown-entry"}>
                        <CircularProgress
                            size={"20px"}
                            classes={{ root: classes.loading }}
                        />
                    </div>
                ) : (
                    <div
                        className={"search-dropdown-entry"}
                        onClick={() => {
                            setInputValue(
                                option.firstName + " " + option.lastName
                            );
                            setProfileLinkedToSearchResults(false);
                            history.push(
                                `${PagePathEnum.ORGCHART}/` +
                                    option.employeeNumber
                            );
                        }}
                    >
                        <img
                            src={option.imageURL || "/workerPlaceholder.png"}
                            alt={"workerPhoto"}
                        />
                        <Typography noWrap>
                            {`${option.firstName} ${option.lastName}`}
                        </Typography>
                    </div>
                )
            }
            inputValue={inputValue}
            onInputChange={(_event, value, reason) => {
                handleTextfieldChange(value, reason);
            }}
        />
    );
}

function OrgChartSearchLegendArea(props) {
    const { setProfileLinkedToSearchResults } = props;
    return (
        <div id="searchLegendArea">
            <div id="searchArea">
                <OrgChartSearchBar
                    setProfileLinkedToSearchResults={
                        setProfileLinkedToSearchResults
                    }
                />
            </div>
            <ul id="legend">
                <li>
                    LEGEND
                    <HelpButton className={"org-chart-help-button"}>
                        <ol>
                            <li>
                                Move around by dragging with the cursor, zoom
                                in/out by scrolling up/down.
                            </li>
                            <li>
                                To hide supervisor and colleagues, or
                                subordinates, toggle the show or hide buttons.
                            </li>
                            <li>
                                To see the full text of the name, title or
                                email, hover the mouse over the text.
                            </li>
                            <li>
                                To copy the name, title or email, click on the
                                copy button next to the text.
                            </li>
                            <li>
                                To find an employee/contractor by name and see
                                an organization chart for the selected
                                employee/contractor, use the “Search by name”
                                bar.
                            </li>
                            <li>
                                To see the full profile of an
                                employee/contractor, navigate to "Profile View".
                            </li>
                        </ol>
                    </HelpButton>
                </li>
                <li>
                    <div className={"dark-blue-background"}></div>Current Search
                </li>
                <li>
                    <div className={"orange-background"}></div>Contractor
                </li>
            </ul>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setProfileLinkedToSearchResults: (profileLinkedToSearchResults) =>
        dispatch(setProfileLinkedToSearchResults(profileLinkedToSearchResults)),
});

export default connect(null, mapDispatchToProps)(OrgChartSearchLegendArea);
