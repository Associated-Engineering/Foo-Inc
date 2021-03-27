import React, { useState } from "react";
import { PageContainer } from './common/PageContainer';
import { Button, CircularProgress, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Slide, Snackbar, TextField } from '@material-ui/core';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { setAdmin } from 'actions/generalAction';
import { Alert } from '@material-ui/lab';

function Transition(props) {
    return <Slide {...props} direction="left" />;
  }

function Login(props) {
  const { isAdmin, setAdmin } = props;
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loggedInMessage, setLoggedInMessage] = useState(null);
  const [snackbarState, setSnackbarState] = useState({
      open: false,
      severity: "",
      message: "",
  });

  const toggleShowPassword = () => {
      setShowPassword(!showPassword);
  }

  const handleSnackbarClose = (_event, reason) => {
      if (reason !== 'clickaway') {
        setSnackbarState({
            ...snackbarState,
            open: false,
        });
      }
  }

  if (isAdmin) {
      Auth.currentAuthenticatedUser().then((user) => {
          setLoggedInMessage(`Logged in as ${user.username}`);
      })
  }

  const handleLogin = async event => {
    setLoading(true);
    Auth.signIn(event.target.username.value, event.target.password.value)
        .then(() => {
            setAdmin(true);
            setSnackbarState({
                open: true,
                severity: "success",
                message: "Successfully logged in",
            });
        })
        .catch((e) => {
            setSnackbarState({
                open: true,
                severity: "error",
                message: e.message,
            });
        })
        .finally(() => {
            setLoading(false);
        });
  }

  const handleLogout = async () => {
    setLoading(true);
    Auth.signOut()
        .then(() => {
            setAdmin(false);
            setLoggedInMessage(null);
            setSnackbarState({
                open: true,
                severity: "success",
                message: "Successfully logged out",
            });
        })
        .catch((e) => {
            setSnackbarState({
                open: true,
                severity: "error",
                message: e.message,
            });
        })
        .finally(() => {
            setLoading(false);
        })
  }

  const handleSubmit = (event) => {
    event.preventDefault();

      if (isAdmin) {
          handleLogout();
      } else {
          handleLogin(event);
      }
  }

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify="center">
            <Grid item xs={3}>
                <TextField label="Username" placeholder="johndoe" name="username" variant="outlined" size="small" required fullWidth disabled={isAdmin} />
            </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
            <Grid item xs={3}>
                <FormControl variant="outlined" size="small" required fullWidth disabled={isAdmin}>
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
                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={20} color="inherit" /> : isAdmin ? "Log out" : "Log in"}
                </Button>
            </Grid>
        </Grid>
        {!!loggedInMessage && (
            <Grid container spacing={2} justify="center">
                <Grid item>
                    {loggedInMessage}
                </Grid>
            </Grid>
        )}
      </form>
        <Snackbar
            open={snackbarState.open}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}
            TransitionComponent={Transition}
        >
            <Alert
                onClose={handleSnackbarClose} 
                // @ts-ignore
                severity={snackbarState.severity}
            >
                {snackbarState.message}
            </Alert>
        </Snackbar>
    </PageContainer>
  )
}

const mapStateToProps = (state) => ({
    isAdmin: state.appState.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
    setAdmin: (isAdmin) => dispatch(setAdmin(isAdmin)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
