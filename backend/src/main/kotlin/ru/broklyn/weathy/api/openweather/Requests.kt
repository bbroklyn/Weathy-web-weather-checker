package ru.broklyn.weathy.api.openweather

import kotlinx.serialization.json.Json
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate

@Component
class Requests @Autowired constructor(private val restTemplate: RestTemplate) {

    @Value("\${api.openweather.key}")
    private lateinit var apiKey: String

    private val weatherUrl = "http://api.openweathermap.org/data/2.5/weather"
    private val forecastUrl = "https://api.openweathermap.org/data/2.5/forecast"

    private val json = Json { ignoreUnknownKeys = true }

    fun getCurrentWeather(city: String): WeatherDTO? {
        val url = "$weatherUrl?q=$city&appid=$apiKey&units=metric"
        val response = restTemplate.getForObject(url, String::class.java) ?: return null
        val openWeatherResponse = json.decodeFromString<OpenWeatherResponse>(response)
        return WeatherDTO(
            city = openWeatherResponse.name,
            temperature = openWeatherResponse.main.temp,
            windSpeed = openWeatherResponse.wind.speed,
            description = openWeatherResponse.weather.firstOrNull()?.description ?: "No description"
        )
    }

    fun getWeeklyWeather(city: String): WeeklyWeatherDTO? {
        val url = "$forecastUrl?q=$city&appid=$apiKey&units=metric&lang=en"
        val response = restTemplate.getForObject(url, String::class.java) ?: return null
        val forecastResponse = json.decodeFromString<OpenWeatherForecastResponse>(response)
        val dailyForecasts = forecastResponse.list.map { dailyForecast ->
            WeatherDTO(
                city = city,
                temperature = dailyForecast.temp.day,
                windSpeed = dailyForecast.speed,
                description = dailyForecast.weather.firstOrNull()?.description ?: "No description"
            )
        }
        return WeeklyWeatherDTO(
            city = city,
            dailyForecasts = dailyForecasts
        )
    }

}
