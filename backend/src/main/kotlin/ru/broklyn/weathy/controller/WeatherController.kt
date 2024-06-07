package ru.broklyn.weathy.controller

import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import ru.broklyn.weathy.api.openweather.WeatherDTO
import ru.broklyn.weathy.service.WeatherService

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = ["http://localhost:5173"]) // Замените на адрес вашего фронтенда
class WeatherController(private val weatherService: WeatherService) {

    @GetMapping
    fun getWeather(@RequestParam city: String): WeatherDTO? {
        return weatherService.getWeather(city)
    }
}
