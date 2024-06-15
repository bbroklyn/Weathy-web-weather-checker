package ru.broklyn.weathy.service

import WeatherAPIDTO
import WeeklyWeatherAPIDTO
import org.springframework.stereotype.Service
import ru.broklyn.weathy.api.openweather.RequestsOpenWeather as OpenWeatherRequests
import ru.broklyn.weathy.api.openweather.WeatherDTO
import ru.broklyn.weathy.api.openweather.WeeklyWeatherDTO
import ru.broklyn.weathy.api.weatherapi.Requests as WeatherApiRequests

@Service
class WeatherService(
    private val openWeatherRequests: OpenWeatherRequests,
    private val weatherAPIRequests: WeatherApiRequests
) {

    fun getWeather(city: String, lang: String): WeatherDTO? {
        return openWeatherRequests.getCurrentWeather(city, lang)
    }

    fun getWeeklyWeather(city: String, lang: String): WeeklyWeatherDTO? {
        return openWeatherRequests.getWeeklyWeather(city, lang)
    }

    fun getWeatherAPIDaily(city: String, lang: String): WeatherAPIDTO? {
        return weatherAPIRequests.getCurrentWeather(city, lang)
    }

    fun getWeeklyWeatherAPI(city: String, lang: String): WeeklyWeatherAPIDTO? {
        return weatherAPIRequests.getWeeklyWeatherWeatherAPI(city, lang)
    }
}