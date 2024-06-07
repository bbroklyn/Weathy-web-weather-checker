package ru.broklyn.weathy.service

import org.springframework.stereotype.Service
import ru.broklyn.weathy.api.openweather.Requests
import ru.broklyn.weathy.api.openweather.WeatherDTO
import ru.broklyn.weathy.api.openweather.WeeklyWeatherDTO

@Service
class WeatherService(private val requests: Requests) {

    fun getWeather(city: String): WeatherDTO? {
        return requests.getCurrentWeather(city)
    }

    fun getWeeklyWeather(city: String): WeeklyWeatherDTO? {
        return requests.getWeeklyWeather(city)
    }
}
