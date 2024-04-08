import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Image from './money.jpg';
import { getChangeReturned } from './api';

const defaultTheme = createTheme();

const CalculateChanges = () => {
  // const [cost, setCost] = useState(0)
  // const [receive, setReceive] = useState(0)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cost = parseFloat(data.get('total_cost'))
    const receive = parseFloat(data.get('amount_provided'))

    // setCost(parseFloat(data.get('total_cost')))
    // setReceive(parseFloat(data.get('amount_provided')))
    console.log({
      cost: cost,
      receive: parseFloat(data.get('amount_provided')),
    });

    const result = await getChangeReturned(cost, receive)
    console.log("RESULT", result)
  };

  // const handleReset = (event) => {
  //   const data = new FormData(event.currentTarget);

  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Bills/Coins Changes
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="total_cost"
                label="Total Cost"
                name="total_cost"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="amount_provided"
                label="Amount Provided"
                type="amount_provided"
                id="amount_provided"
              />
              <Grid container>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2, mr: 2, float: "right" }}
                >
                  Calculate
                </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    type="submit"
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, float: "left"}}
                >
                  Reset
                </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </Grid>
    </ThemeProvider>
  );
}

export default CalculateChanges;