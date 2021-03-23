import React from "react";
import { PageContainer } from './common/PageContainer';
import { Button, Grid, TextField } from '@material-ui/core';
import { loginAction } from 'actions/loginAction';
import { connect } from 'react-redux';


function LoginContainer(props) {
  const { loginAction, isAdmin } = props;

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
                <TextField label="Password" name="password" variant="outlined" size="small" required fullWidth />
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
