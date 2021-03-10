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
    // TODO 1. Validate form fields and update error labels
    // TODO 2. Process skills
    // TODO 3. Image upload (+ update PhotoUrl)
    event.preventDefault();
    
    const details = {
        FirstName: event.target.firstName.value,
        LastName: event.target.lastName.value,
        Email: event.target.email.value,
        WorkPhone: event.target.workPhone.value,
        WorkCell: event.target.cellPhone.value,
        Title: event.target.title.value,
        Supervisor: event.target.supervisor.value, // TODO: Replace with supervisor employee number once we have predictive search
        HireDate: event.target.hireDate.value,
        TerminationDate: event.target.contractEndDate.value, 
        PhysicalLocationLabel: event.target.physicalLocation.value,
        GroupLabel: event.target.divisionType.value,
        CompanyLabel: event.target.companyName.value,
        OfficeLocationLabel: event.target.officeLocation.value,
        skills: event.target.skills.value, // TODO: process skills into an array
        YearsPriorExperience: event.target.YPE.value,
        PhotoUrl: "https://www.placecage.com/200/300" // TODO: Replace with s3 link
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
            <h3><u>Basic information</u></h3>
            <Grid container spacing={1} xs={8}>
                <Grid item xs={6}>
                <TextField label="First Name" placeholder="John" name="firstName" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Last Name" placeholder="Doe" name="lastName" variant="outlined" size="small" required />
                </Grid>
                <Grid item xs={6}>
                <TextField label="Email" placeholder="john.doe@ae.com" name="email" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Work Phone" placeholder="123-456-7890" name="workPhone" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Cell Phone" placeholder="123-456-7890" name="cellPhone" variant="outlined" size="small"/>
                </Grid>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" component="span">
                        Upload Profile Pic
                        </Button>
                    </label>
                </Grid>
                <h3><u>Position Details</u></h3>
                <Grid container spacing={1} xs={8}>
                <Grid item xs={6}>
                    <TextField label="Title" placeholder="Manager" name="title" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Supervisor" placeholder="James Smith" name="supervisor" variant="outlined" size="small" required/>
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
                    <TextField label="Physical Location" placeholder="Victoria" name="physicalLocation" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Group" placeholder="Administration" name="groupType" variant="outlined" size="small" required/>
                </Grid>
            <Grid item xs={6}>
                          <TextField label="Company" placeholder="Acme Seeds Inc" name="companyName" variant="outlined" size="small" required/>
                       </Grid>
                       <Grid item xs={6}>
                           <TextField label="Office Location" placeholder="Vancouver" name="officeLocation" variant="outlined" size="small" required/>
                       </Grid>
                       </Grid>
                       <h3><u>Skills</u></h3>
            <Grid container spacing={1} xs={8}>
                <Grid item xs={12}>
                    <TextField label="Skills" placeholder="Project Management, Marketing" name="skills" variant="outlined" size="small" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Years Prior Experience" name="YPE" variant="outlined" size="small"/>
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