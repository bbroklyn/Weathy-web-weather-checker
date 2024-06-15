package ru.broklyn.weathy.controller

import WeatherAPIDTO
import WeeklyWeatherAPIDTO
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.broklyn.weathy.api.openweather.WeatherDTO
import ru.broklyn.weathy.api.openweather.WeeklyWeatherDTO
import ru.broklyn.weathy.service.WeatherService

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = ["http://localhost:5173"])
class WeatherController(private val weatherService: WeatherService) {

    @GetMapping("/v1/openweather/daily")
    fun getOpenWeatherDaily(
        @RequestParam city: String,
        @RequestParam(required = false, defaultValue = "en") lang: String
    ): WeatherDTO? {
        return weatherService.getWeather(city, lang)
    }

    @GetMapping("/v1/openweather/forecast")
    fun getOpenWeatherForecast(
        @RequestParam city: String,
        @RequestParam(required = false, defaultValue = "en") lang: String
    ): WeeklyWeatherDTO? {
        return weatherService.getWeeklyWeather(city, lang)
    }

    @GetMapping("/v1/weatherapi/daily")
    fun getWeatherAPIDaily(
        @RequestParam city: String,
        @RequestParam(required = false, defaultValue = "en") lang: String
    ): WeatherAPIDTO? {
        return weatherService.getWeatherAPIDaily(city, lang)
    }

    @GetMapping("/v1/weatherapi/forecast")
    fun getWeatherAPIForecast(
        @RequestParam city: String,
        @RequestParam(required = false, defaultValue = "en") lang: String
    ): WeeklyWeatherAPIDTO? {
        return weatherService.getWeeklyWeatherAPI(city, lang)
    }
}
