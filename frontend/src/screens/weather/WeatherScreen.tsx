import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import axios from 'axios'
import * as React from 'react'
import { useState } from 'react'
import { FaWind } from 'react-icons/fa'
import '../../utils/background.css'

const WeatherScreen: React.FC = () => {
	const [city, setCity] = useState('')
	const [weather, setWeather] = useState<any>(null)
	// const [forecast, setForecast] = useState<any[]>([]) // Комментируем семидневный прогноз

	const fetchWeather = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8000/api/weather?city=${city}`
			)
			setWeather(response.data)
			// const forecastResponse = await axios.get( // Комментируем запрос для семидневного прогноза
			// 	`http://localhost:8000/api/forecast?city=${city}`
			// )
			// setForecast(forecastResponse.data)
		} catch (error) {
			console.error('Error fetching weather data:', error)
		}
	}

	return (
		<div className='background'>
			<div style={styles.container}>
				<div style={styles.searchContainer}>
					<TextField
						label='Enter city'
						variant='outlined'
						value={city}
						onChange={e => setCity(e.target.value)}
						style={styles.searchInput}
						InputProps={{ style: styles.inputProps }}
						InputLabelProps={{ style: styles.inputLabelProps }}
					/>
					<Button
						variant='contained'
						color='primary'
						onClick={fetchWeather}
						style={styles.searchButton}
					>
						Search
					</Button>
				</div>
				{weather && (
					<Card style={styles.card}>
						<CardContent>
							<Typography variant='h5'>{weather.city}</Typography>
							<Typography variant='h6'>{weather.temperature}°C</Typography>
							<Typography variant='body1'>
								<FaWind /> {weather.windSpeed} m/s
							</Typography>
							<Typography variant='body2'>{weather.description}</Typography>
						</CardContent>
					</Card>
				)}
				{/* <div style={styles.forecastContainer}> // Комментируем семидневный прогноз
					<Typography variant='h6'>7-Day Forecast</Typography>
					<Card style={styles.forecastCard}>
						<CardContent style={styles.forecastContent}>
							<Grid
								container
								spacing={2}
								direction='column'
								style={styles.forecastGrid}
							>
								{forecast.map((day, index) => (
									<React.Fragment key={index}>
										<Grid item xs={12} style={styles.forecastDay}>
											<Typography variant='body1'>
												{new Date(day.dt * 1000).toLocaleDateString()}
											</Typography>
											<Typography variant='body2'>{day.temp.day}°C</Typography>
											<Typography variant='body2'>
												<FaWind /> {day.speed} m/s
											</Typography>
											<Typography variant='body2'>
												{day.weather[0].description}
											</Typography>
										</Grid>
										{index < forecast.length - 1 && (
											<Divider style={styles.divider} />
										)}
									</React.Fragment>
								))}
							</Grid>
						</CardContent>
					</Card>
				</div> */}
			</div>
		</div>
	)
}

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column' as 'column',
		alignItems: 'center',
		padding: '20px',
		gap: '20px',
	},
	searchContainer: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
		width: '100%',
		justifyContent: 'center',
	},
	searchInput: {
		width: '100%',
		maxWidth: '300px',
		backgroundColor: '#fff',
		borderRadius: '4px',
	},
	inputProps: {
		color: '#333',
		backgroundColor: '#fff',
	},
	inputLabelProps: {
		color: '#333',
	},
	searchButton: {
		fontSize: '16px',
		padding: '10px 20px',
	},
	card: {
		width: '100%',
		maxWidth: '300px',
		borderRadius: '20px',
		backgroundColor: '#f0f0f0',
	},
}

export default WeatherScreen
