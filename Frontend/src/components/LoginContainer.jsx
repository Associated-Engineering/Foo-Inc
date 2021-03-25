import React, { useState } from "react";
import { PageContainer } from './common/PageContainer';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { setAdmin, setReady } from 'actions/generalAction';
import { cognitoLogin } from 'api/adminAuth';

function LoginContainer(props) {
  const { isAdmin, setAdmin, setReady, ready } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  }

  if (isAdmin) {
      Auth.currentAuthenticatedUser().then((user) => {
          setFeedback(`Logged in as ${user.username}`);
      })
  }

  const handleSubmit = async event => {
    event.preventDefault();

    setReady(false);
    cognitoLogin(event.target.username.value, event.target.password.value)
        .then(() => {
            setAdmin();
            setReady(true);
        })
        .catch((e) => {
            setFeedback(e.message);
            setReady(true);
        });
    // TODO: Add success snackbar
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
                <Button type="submit" variant="contained" disabled={isAdmin || !ready}>Login</Button>
            </Grid>
        </Grid>
        {!!feedback && (
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        {feedback}
                    </Grid>
                </Grid>
        )}
      </form>
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
    isAdmin: state.appState.isAdmin,
    ready: state.appState.ready,
});

const mapDispatchToProps = (dispatch) => ({
    // loginAction: (email, password) => dispatch(loginAction(email, password)),
    setAdmin: () => dispatch(setAdmin()),
    setReady: (isReady) => dispatch(setReady(isReady)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginContainer);
