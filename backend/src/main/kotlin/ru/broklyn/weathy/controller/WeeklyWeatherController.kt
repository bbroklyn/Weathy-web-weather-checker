package ru.broklyn.weathy.controller

import org.springframework.web.bind.annotation.*
import ru.broklyn.weathy.api.openweather.WeeklyWeatherDTO
import ru.broklyn.weathy.service.WeatherService

@RestController
@RequestMapping("/api/forecast")
@CrossOrigin(origins = ["http://localhost:5173"])
class WeeklyWeatherController(private val weatherService: WeatherService) {

    @GetMapping
    fun getWeeklyWeather(
        @RequestParam city: String,
        @RequestParam(required = false, defaultValue = "en") lang: String
    ): WeeklyWeatherDTO? {
        return weatherService.getWeeklyWeather(city, lang)
    }
}
