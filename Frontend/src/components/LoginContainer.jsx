import React, { useState } from "react";
import { PageContainer } from './common/PageContainer';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import { loginAction } from 'actions/loginAction';
import { connect } from 'react-redux';
import { Visibility, VisibilityOff } from '@material-ui/icons';

function LoginContainer(props) {
  const { loginAction, isAdmin } = props;
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  }

  const handleSubmit = async event => {
    event.preventDefault();
    loginAction(event.target.username.value, event.target.password.value);

    // TODO: Add success or failed snackbar
  }  

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify="center">
            <Grid item xs={3}>
                <TextField label="Username" placeholder="johndoe" name="username" variant="outlined" size="small" required fullWidth />
            </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
            <Grid item xs={3}>
                <FormControl variant="outlined" size="small" required fullWidth>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={toggleShowPassword}
                                edge="end"
                            >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                        }
                        labelWidth={85}
                    />
                </FormControl>
            </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
            <Grid item>
                <Button type="submit" variant="contained" disabled={isAdmin}>Login</Button>
            </Grid>
        </Grid>
      </form>
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
    isAdmin: state.appState.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
    loginAction: (email, password) => dispatch(loginAction(email, password)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
