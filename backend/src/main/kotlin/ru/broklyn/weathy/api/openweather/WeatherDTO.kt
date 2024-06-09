package ru.broklyn.weathy.api.openweather

import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@OptIn(ExperimentalSerializationApi::class)
val deserializer = Json {
    ignoreUnknownKeys = true
    explicitNulls = true
}

@Serializable
data class WeatherDTO(
    val city: String,
    val temperature: Double,
    val windSpeed: Double,
    val description: String
)

@Serializable
data class WeeklyWeatherDTO(
    val city: String,
    val dailyForecasts: List<DailyForecastDTO>
)

@Serializable
data class OpenWeatherResponse(
    val coord: Coord,
    val weather: List<WeatherDescription>,
    val main: Main,
    val wind: Wind,
    val name: String
)

@Serializable
data class Coord(
    val lat: Double,
    val lon: Double
)

@Serializable
data class Main(
    val temp: Double,
    val humidity: Int
)

@Serializable
data class Wind(
    val speed: Double
)

@Serializable
data class WeatherDescription(
    val description: String
)

@Serializable
data class OpenWeatherForecastResponse(
    val daily: List<DailyForecast>
)

@Serializable
data class DailyForecast(
    val dt: Long,
    val temp: Temp,
    val wind_speed: Double,
    val weather: List<WeatherDescription>
)

@Serializable
data class Temp(
    val day: Double
)

@Serializable
data class DailyForecastDTO(
    val date: Long,
    val temperature: Double,
    val windSpeed: Double,
    val description: String
)
