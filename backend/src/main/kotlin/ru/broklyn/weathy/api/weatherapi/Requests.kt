package ru.broklyn.weathy.api.weatherapi

import WeatherAPIDTO
import WeatherAPIResponse
import WeeklyWeatherAPIDTO
import WeeklyWeatherAPIResponse
import WeeklyWeatherDay
import deserializertwo
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component
import org.springframework.web.client.RestTemplate
import ru.broklyn.weathy.api.openweather.deserializer

@Component
class Requests @Autowired constructor(private val restTemplate: RestTemplate) {

    @Value("\${api.weatherapi.key}")
    private lateinit var apiKey: String

    private val weatherUrl = "https://api.weatherapi.com/v1"


    fun getCurrentWeather(city: String, lang: String = "en"): WeatherAPIDTO? {
        val url = "$weatherUrl/current.json?q=$city&key=$apiKey&lang=$lang"
        val response = restTemplate.getForObject(url, String::class.java) ?: return null
        val weatherAPIResponse = deserializertwo.decodeFromString<WeatherAPIResponse>(response)
        return weatherAPIResponse.toWeatherAPIDTO()
    }

    fun getWeeklyWeatherWeatherAPI(city: String, lang: String = "en"): WeeklyWeatherAPIDTO? {
        val url = "$weatherUrl/forecast.json?q=$city&key=$apiKey&days=7&lang=$lang"
        val response = restTemplate.getForObject(url, String::class.java) ?: return null
        val weatherAPIResponse = deserializertwo.decodeFromString<WeeklyWeatherAPIResponse>(response)
        return weatherAPIResponse.toWeeklyWeatherAPIDTO()
    }

    private fun WeatherAPIResponse.toWeatherAPIDTO(): WeatherAPIDTO {
        return WeatherAPIDTO(
            city = location.name,
            temperatureCelsius = current.tempCelsius,
            windSpeedKph = current.windSpeedKph,
            humidity = current.humidity
        )
    }

    private fun WeeklyWeatherAPIResponse.toWeeklyWeatherAPIDTO(): WeeklyWeatherAPIDTO {
        return WeeklyWeatherAPIDTO(
            city = location.name,
            forecastDays = forecast.forecastday.map { day ->
                WeeklyWeatherDay(
                    date = day.date,
                    temperatureCelsius = day.day.avgtempC
                )
            })
    }
}
