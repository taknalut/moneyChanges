import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Box, Button, CssBaseline, Grid, Table, TableBody, TableCell, TableContainer,TableHead,  TableRow, Paper, TextField, Typography} from '@mui/material';
import Image from './money.jpg';
import { getChangeReturned } from './api';

const defaultTheme = createTheme();

const CalculateChanges = () => {
	const [data, setData] = useState([])
	const [totalChanges, setTotalChanges] = useState(0)
	const [error, setError] = useState("")
	const denominations = [
		{"10": "$10 bill"},
		{"5": "$5 bill"},
		{"1": "$1 bill"}, 
		{"0.25": "quarter"},
		{"0.1": "dime"},
		{"0.05": "nickel"},
		{"0.01": "penny"}
  	]
	/* Example data
		{
			"1": 2,
			"5": 1,
			"10": 1,
			"0.25": 0,
			"0.1": 0,
			"0.05": 0,
			"0.01": 0
		}
	*/

	const handleSubmit = async (event) => {
		event.preventDefault();
		setData([])
		const data = new FormData(event.currentTarget);
		const cost = parseFloat(data.get('total_cost'))
		const receive = parseFloat(data.get('amount_provided'))
		setTotalChanges(receive-cost)

		console.log({
			cost: cost,
			receive: receive,
		})

		const result = await getChangeReturned(cost, receive)
		console.log("RESULT", result)
		
		if( Object.keys(result?.data)?.length > 0 && !result?.data?.errorMessage) {
			let formatData = denominations.map(denom => {
				const amount = Object.keys(denom)[0]
				const label = Object.values(denom)[0]
				const count = result?.data[amount] || 0
				return { [label]: count }
			})
			setData(formatData)
		}

		if(result?.data?.errorMessage) {
			setError(result?.data?.errorMessage)
		}
	}

	const handleReset = () => {
		setData([])
		setTotalChanges(0)
		setError('')
	}

	return (
		<ThemeProvider theme={defaultTheme}>
		<Grid container component="main" sx={{ height: '100vh' }}>
			<CssBaseline />
			<Grid
				item
				xs={false}
				sm={3}
				md={6}
				sx={{
					backgroundImage: `url(${Image})`,
					backgroundRepeat: 'no-repeat',
					backgroundColor: (t) =>
					t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}
			/>
			<Grid item xs={12} sm={9} md={6} component={Paper} elevation={6} square>
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
						type="reset"
						variant="outlined"
						sx={{ mt: 3, mb: 2, float: "left"}}
						onClick={handleReset}
					>
					Reset
					</Button>
					</Grid>
				</Grid>
				</Box>
				{ totalChanges !== 0 && error?.length <= 0 &&
					<Typography 
						variant="subtitle1"
						mt={3}
						mb={3}
						sx={{fontWeight: '600', float: 'left'}}
					>
						Total Changes: {`$${totalChanges}`}
					</Typography>
				}
				{ data?.length > 0 && 
					<TableContainer component={Paper}>
						<Table sx={{ minWidth: 650 }} >
						<TableHead>
							<TableRow component="th">
								<TableCell>Type</TableCell>
								<TableCell>Count</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{ data.map(item => (
								<TableRow
									key={Object.keys(item)[0]}
								>
								<TableCell align="left">{Object.keys(item)[0]}</TableCell>
								<TableCell align="left">{Object.values(item)[0]}</TableCell>
								</TableRow>
								
							))}
						</TableBody>
						</Table>
					</TableContainer>
				}
				{ error?.length > 0 &&  <Alert severity="error" mt={4}>{error}</Alert> }
				
			</Box>
			</Grid>
		</Grid>
		</ThemeProvider>
	)
}

export default CalculateChanges;