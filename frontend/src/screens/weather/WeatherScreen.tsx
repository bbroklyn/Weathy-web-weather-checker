import {
	Button,
	Card,
	CardContent,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Snackbar,
	SnackbarContent,
	TextField,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { FaWind } from 'react-icons/fa'
import { Languages } from '../../utils/Languages'
import LanguageDialog from './LanguageDialog'

const WeatherScreen: React.FC = () => {
	const [city, setCity] = useState('')
	const [language, setLanguage] = useState('en')
	const [api, setApi] = useState('OpenWeather')
	const [weather, setWeather] = useState<any>(null)
	const [forecast, setForecast] = useState<any[]>([])
	const [snackbarOpen, setSnackbarOpen] = useState(false)
	const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false)

	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const fetchWeather = async () => {
		try {
			let weatherUrl = ''
			let forecastUrl = ''

			if (api === 'OpenWeather') {
				weatherUrl = `http://localhost:8000/api/v1/openweather/daily?city=${city}&lang=${language}`
				forecastUrl = `http://localhost:8000/api/v1/openweather/forecast?city=${city}&lang=${language}`
			} else {
				weatherUrl = `http://localhost:8000/api/v1/weatherapi/daily?city=${city}&lang=${language}`
				forecastUrl = `http://localhost:8000/api/v1/weatherapi/forecast?city=${city}&lang=${language}`
			}

			const response = await axios.get(weatherUrl)
			setWeather(response.data)
			console.log('Weather response:', response.data)

			const forecastResponse = await axios.get(forecastUrl)
			console.log('Forecast response:', forecastResponse.data)

			setForecast(
				api === 'OpenWeather'
					? forecastResponse.data.dailyForecasts
					: forecastResponse.data.forecastDays
			)
		} catch (error) {
			setSnackbarOpen(true)
			console.error('Error fetching weather data:', error)
		}
	}

	const formatDate = (dateString: string) => {
		const date = new Date(dateString)
		return date.toLocaleDateString()
	}

	return (
		<div className='background'>
			<div style={styles.container}>
				<LanguageDialog
					open={isLanguageDialogOpen}
					onClose={(selectedLanguage: string) => {
						setLanguage(selectedLanguage)
						setIsLanguageDialogOpen(false)
					}}
				/>
				<Snackbar
					anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
					open={snackbarOpen}
					autoHideDuration={5000}
					onClose={() => setSnackbarOpen(false)}
				>
					<SnackbarContent
						message='Error fetching weather data'
						style={{ backgroundColor: 'red' }}
					/>
				</Snackbar>
				{isMobile ? (
					<Button
						variant='contained'
						color='primary'
						onClick={() => setIsLanguageDialogOpen(true)}
					>
						Select Language
					</Button>
				) : (
					<FormControl variant='outlined' style={styles.languageSelector}>
						<InputLabel>Language</InputLabel>
						<Select
							value={language}
							onChange={e => setLanguage(e.target.value as string)}
							label='Language'
							style={styles.Language}
						>
							{Object.entries(Languages.supportedLanguages).map(
								([code, name]) => (
									<MenuItem key={code} value={code}>
										{name}
									</MenuItem>
								)
							)}
						</Select>
					</FormControl>
				)}
				<FormControl variant='outlined' style={styles.apiSelector}>
					<InputLabel>Select API</InputLabel>
					<Select
						value={api}
						onChange={e => setApi(e.target.value as string)}
						label='API'
						style={styles.Language}
					>
						<MenuItem value='OpenWeather'>OpenWeather</MenuItem>
						<MenuItem value='WeatherAPI'>WeatherAPI</MenuItem>
					</Select>
				</FormControl>
				<div style={styles.inputContainer}>
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
							{api === 'OpenWeather' ? (
								<>
									<Typography variant='h6'>{weather.temperature}°C</Typography>
									<Typography variant='body1'>
										<FaWind /> {weather.windSpeed} m/s
									</Typography>
									<Typography variant='body2'>{weather.description}</Typography>
								</>
							) : (
								<>
									<Typography variant='h6'>
										{weather.temperatureCelsius}°C
									</Typography>
									<Typography variant='body1'>
										<FaWind /> {weather.windSpeedKph} kph
									</Typography>
									<Typography variant='body2'>
										Humidity: {weather.humidity}%
									</Typography>
								</>
							)}
						</CardContent>
					</Card>
				)}
				{forecast.length > 0 && (
					<div style={styles.forecastContainer}>
						<Typography variant='h6'>7-Day Forecast</Typography>
						<Grid container spacing={2} style={styles.forecastGrid}>
							{forecast.map((day, index) => (
								<Grid item xs={12} sm={4} key={index}>
									<Card style={styles.forecastCard}>
										<CardContent style={styles.forecastContent}>
											<Typography variant='body1'>
												{formatDate(day.date)}
											</Typography>
											{api === 'OpenWeather' ? (
												<>
													<Typography variant='body2'>
														{day.temperature}°C
													</Typography>
													<Typography variant='body2'>
														<FaWind /> {day.windSpeed} m/s
													</Typography>
													<Typography variant='body2'>
														{day.description}
													</Typography>
												</>
											) : (
												<Typography variant='body2'>
													{day.temperatureCelsius}°C
												</Typography>
											)}
										</CardContent>
									</Card>
								</Grid>
							))}
						</Grid>
					</div>
				)}
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
	languageSelector: {
		width: '100%',
		maxWidth: '300px',
	},
	apiSelector: {
		width: '100%',
		maxWidth: '300px',
		marginTop: '20px',
	},
	inputContainer: {
		display: 'flex',
		alignItems: 'center',
		gap: '10px',
	},
	searchInput: {
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: '4px',
	},
	inputProps: {
		color: '#000000',
		backgroundColor: '#ffffff',
	},
	inputLabelProps: {
		color: '#000000',
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
	forecastContainer: {
		width: '100%',
		maxWidth: '900px',
	},
	forecastGrid: {
		width: '100%',
	},
	forecastCard: {
		borderRadius: '20px',
		backgroundColor: '#f0f0f0',
	},
	forecastContent: {
		padding: '10px',
		textAlign: 'center' as 'center',
	},
	Language: {
		color: '#000000',
		backgroundColor: '#ffffff',
	},
}

export default WeatherScreen
