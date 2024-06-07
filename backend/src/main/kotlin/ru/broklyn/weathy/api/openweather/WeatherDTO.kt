package ru.broklyn.weathy.api.openweather

import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@OptIn(ExperimentalSerializationApi::class)
val deserializer = Json {
    ignoreUnknownKeys = true
    explicitNulls = false
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
    val dailyForecasts: List<WeatherDTO>
)

@Serializable
data class OpenWeatherResponse(
    val name: String,
    val main: Main,
    val wind: Wind,
    val weather: List<WeatherDescription>
)

@Serializable
data class Main(
    val temp: Double
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
    val city: City,
    val list: List<DailyForecast>
)

@Serializable
data class City(
    val name: String
)

@Serializable
data class DailyForecast(
    val dt: Long,
    val temp: Temp,
    val speed: Double,
    val weather: List<WeatherDescription>
)

@Serializable
data class Temp(
    val day: Double
)