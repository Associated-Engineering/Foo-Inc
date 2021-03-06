import React from "react";
import { PageContainer } from "./common/PageContainer";
import { Grid, TextField, Button} from "@material-ui/core";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from "@material-ui/core/styles";

export function NewContractorsContainer() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
    
    return (
        <PageContainer>
            Basic information
            <Grid container spacing={1} xs={6}>
                <Grid item xs={3}>
                <TextField label="First Name" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                <TextField label="Last Name" variant="outlined" />
                </Grid>
            </Grid>
            <Grid container spacing={1} xs={6}>
                <Grid item xs={3}>
                <TextField label="Email" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                <TextField label="Work Phone" variant="outlined" />
                </Grid>
                </Grid>
                <Grid container spacing={1} xs={6}>
                <Grid item xs={3}>
                <TextField label="Cell Phone" variant="outlined" />
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
            Position details
            <Grid container spacing={1} xs={6}>
                <Grid item xs={3}>
                    <TextField label="Title" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Supervisor" variant="outlined" />
                </Grid>
                </Grid>
      
            <Grid container spacing={1} xs={6}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid item xs={3}>
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
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={3}>
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
                            />
                        </Grid>
                    </Grid>
                    </MuiPickersUtilsProvider>
                </Grid>

            Location
            <Grid container spacing={1} xs={6}>
                <Grid item xs={3}>
                    <TextField label="Physical Location" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Division Type" variant="outlined" />
                </Grid>
            </Grid>
                <Grid container spacing={1} xs={6}>
                      <Grid item xs={3}>
                          <TextField label="Company Name" variant="outlined" />
                       </Grid>
                       <Grid item xs={3}>
                           <TextField label="Office Location" variant="outlined" />
                       </Grid>
                </Grid>
            Skills
            <Grid container spacing={1} xs={6}>
                <Grid item xs={3}>
                    <TextField label="Skills" variant="outlined" />
                </Grid>
                <Grid item xs={3}>
                    <TextField label="Years of Experience" variant="outlined" />
                </Grid>
            </Grid>
        </PageContainer>
    );
}

const useStyles = makeStyles(() => ({
    input: {
        display: 'none',
      },
  }));