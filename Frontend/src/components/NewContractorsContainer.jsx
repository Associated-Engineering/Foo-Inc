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

    async function getAPI() {
        let response = await insertContractorAPI()
        // TODO: Update response label
        console.log(response)
    }
    
    return (
        <PageContainer className= {classes.root}>
            <h3><u>Basic information</u></h3>
            <Grid container spacing={1} xs={8}>
                <Grid item xs={6}>
                <TextField label="First Name" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Last Name" variant="outlined" size="small" required />
                </Grid>
                <Grid item xs={6}>
                <TextField label="Email" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Work Phone" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                <TextField label="Cell Phone" variant="outlined" size="small"/>
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
                    <TextField label="Title" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Supervisor" variant="outlined" size="small" required/>
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={6}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Hire Date"
                            value={selectedDate}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            required
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
                            />
                        </Grid>
                    </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>

                <h3><u>Location</u></h3>
                <Grid container spacing={1} xs={8}>
                <Grid item xs={6}>
                    <TextField label="Physical Location" variant="outlined" size="small" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField label="Division Type" variant="outlined" size="small" required/>
                </Grid>
            <Grid item xs={6}>
                          <TextField label="Company Name" variant="outlined" size="small" required/>
                       </Grid>
                       <Grid item xs={6}>
                           <TextField label="Office Location" variant="outlined" size="small" required/>
                       </Grid>
                       </Grid>
                       <h3><u>Skills</u></h3>
            <Grid container spacing={1} xs={8}>
                <Grid item xs={12}>
                    <TextField label="Skills" variant="outlined" size="small" fullWidth/>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Years of Experience" variant="outlined" size="small" type="number"/>
                </Grid>
            </Grid>
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