import React from "react";
import { PageContainer } from "./common/PageContainer";
import { Grid, TextField, Button} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from "@material-ui/core/styles";
import { insertContractorAPI } from "../api/contractor";

export function NewContractorsContainer() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

    const handleSubmit = (event) => {
    // Validate form fields (update error labels)
    // TODO: add profile image link to details
    // TODO: process skills input
    event.preventDefault();
    const details = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        workPhone: event.target.workPhone.value,
        cellPhone: event.target.cellPhone.value,
        title: event.target.title.value,
        supervisor: event.target.supervisor.value,
        hireDate: event.target.hireDate.value,
        contractEndDate: event.target.contractEndDate.value, 
        physicalLocation: event.target.physicalLocation.value,
        divisionType: event.target.divisionType.value,
        companyName: event.target.companyName.value,
        officeLocation: event.target.officeLocation.value,
        skills: event.target.skills.value,
        YOE: event.target.YOE.value,
    }
    insertContractor(details);
    }

    async function insertContractor(details) {
        let response = await insertContractorAPI(details)
        // TODO: Update success or failed snackbar
        console.log(response)
    }
    
    return (
        <PageContainer className= {classes.root}>
            <form onSubmit = {handleSubmit}>
            <TextField label="First Name" name = "firstname" variant="outlined" size="small" required/>
            <button type="submit">Add contractor</button>
            </form>
            <form onSubmit = {handleSubmit}>
            <h3><u>Basic information</u></h3>
            <Grid container spacing={1} xs={8}>
                <Grid item xs={6}>
                <TextField label="First Name" name="firstName" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Last Name" name="lastName" variant="outlined" size="small" required />
                </Grid>
                <Grid item xs={6}>
                <TextField label="Email" name="email" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Work Phone" name="workPhone" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Cell Phone" name="cellPhone" variant="outlined" size="small"/>
                </Grid>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                        Upload Profile Pic
                        </Button>
                    </label>
                </Grid>
                <h3><u>Position Details</u></h3>
                <Grid container spacing={1} xs={8}>
                <Grid item xs={6}>
                    <TextField label="Title" name="title" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Supervisor" name="supervisor" variant="outlined" size="small" required/>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={6}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            label="Hire Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            required
                            name="hireDate"
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Contract End Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            required
                            name="contractEndDate"
                            />
                        </Grid>
                    </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>

                <h3><u>Location</u></h3>
                <Grid container spacing={1} xs={8}>
                <Grid item xs={6}>
                    <TextField label="Physical Location" name="physicalLocation" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Division Type" name="divisionType" variant="outlined" size="small" required/>
                </Grid>
            <Grid item xs={6}>
                          <TextField label="Company Name" name="companyName" variant="outlined" size="small" required/>
                       </Grid>
                       <Grid item xs={6}>
                           <TextField label="Office Location" name="officeLocation" variant="outlined" size="small" required/>
                       </Grid>
                       </Grid>
                       <h3><u>Skills</u></h3>
            <Grid container spacing={1} xs={8}>
                <Grid item xs={12}>
                    <TextField label="Skills" name="skills" variant="outlined" size="small" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Years of Experience" name="YOE" variant="outlined" size="small" type="number"/>
                </Grid>
            </Grid>
            <Button type="submit" variant="contained">Add contractor</Button>
            </form>
        </PageContainer>
    );
}

const useStyles = makeStyles(() => ({
    root: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    input: {
        display: 'none',
      },
  }));