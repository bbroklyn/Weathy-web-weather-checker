package ru.broklyn.weathy.api.openweather

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate


@Component
class Requests @Autowired constructor(private val restTemplate: RestTemplate) {

    @Value("\${api.openweather.key}")
    private lateinit var apiKey: String

    private val weatherUrl = "http://api.openweathermap.org/data/2.5/weather"
    private val forecastUrl = "https://api.openweathermap.org/data/2.5/onecall"

    fun getCurrentWeather(city: String): WeatherDTO? {
        val url = "$weatherUrl?q=$city&appid=$apiKey&units=metric"
        val response = restTemplate.getForObject(url, String::class.java) ?: return null
        val openWeatherResponse = deserializer.decodeFromString<OpenWeatherResponse>(response)
        return WeatherDTO(
            city = openWeatherResponse.name,
            temperature = openWeatherResponse.main.temp,
            windSpeed = openWeatherResponse.wind.speed,
            description = openWeatherResponse.weather.firstOrNull()?.description ?: "No description"
        )
    }

    fun getWeeklyWeather(city: String): WeeklyWeatherDTO? {
        val latLonUrl = "$weatherUrl?q=$city&appid=$apiKey"
        val latLonResponse = restTemplate.getForObject(latLonUrl, String::class.java) ?: return null
        val openWeatherResponse = deserializer.decodeFromString<OpenWeatherResponse>(latLonResponse)
        val lat = openWeatherResponse.coord.lat
        val lon = openWeatherResponse.coord.lon

        val url = "$forecastUrl?lat=$lat&lon=$lon&exclude=current,minutely,hourly,alerts&appid=$apiKey&units=metric&lang=en"
        val response = restTemplate.getForObject(url, String::class.java) ?: return null
        val forecastResponse = deserializer.decodeFromString<OpenWeatherForecastResponse>(response)

        val dailyForecasts = forecastResponse.daily.map { dailyForecast ->
            DailyForecastDTO(
                date = dailyForecast.dt * 1000,
                temperature = dailyForecast.temp.day,
                windSpeed = dailyForecast.wind_speed,
                description = dailyForecast.weather.firstOrNull()?.description ?: "No description"
            )
        }

        return WeeklyWeatherDTO(city, dailyForecasts)
    }
}
