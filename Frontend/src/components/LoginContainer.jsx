import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { PageContainer } from './common/PageContainer';
import { Button, Grid, TextField } from '@material-ui/core';

export default function LoginContainer(props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
  
    // Use Redux ready state
    setIsLoading(true);
  
    try {
      await Auth.signIn(event.target.email, event.target.password);
      this.props.userHasAuthenticated(true);
    } catch (e) {
      // Display auth failed message
      // alert(e.message);
    }

    setIsLoading(false);
  }  

  return (
    <PageContainer>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify="center">
            <Grid item xs={3}>
                <TextField label="Email" placeholder="john.doe@ae.com" name="email" variant="outlined" size="small" required fullWidth />
            </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
            <Grid item xs={3}>
                <TextField label="Password" name="password" variant="outlined" size="small" required fullWidth />
            </Grid>
        </Grid>
        <Grid container spacing={2} justify="center">
            <Grid item>
            <Button type="submit" variant="contained">Login</Button>
            </Grid>
        </Grid>
      </form>
    </PageContainer>
  )
}
