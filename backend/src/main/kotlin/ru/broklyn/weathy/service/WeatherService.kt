package ru.broklyn.weathy.service

import org.springframework.stereotype.Service
import ru.broklyn.weathy.api.openweather.Requests
import ru.broklyn.weathy.api.openweather.WeatherDTO
import ru.broklyn.weathy.api.openweather.WeeklyWeatherDTO

@Service
class WeatherService(private val requests: Requests) {

    fun getWeather(city: String, lang: String): WeatherDTO? {
        return requests.getCurrentWeather(city, lang)
    }

    fun getWeeklyWeather(city: String, lang: String): WeeklyWeatherDTO? {
        return requests.getWeeklyWeather(city, lang)
    }
}
