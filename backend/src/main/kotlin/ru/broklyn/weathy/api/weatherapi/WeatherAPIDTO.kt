import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json

@OptIn(ExperimentalSerializationApi::class)
val deserializertwo = Json {
    ignoreUnknownKeys = true
    explicitNulls = true
}

@Serializable
data class WeatherAPIResponse(
    @SerialName("location") val location: Location,
    @SerialName("current") val current: CurrentWeather
)

@Serializable
data class Location(
    @SerialName("name") val name: String,
    @SerialName("region") val region: String,
    @SerialName("country") val country: String
)

@Serializable
data class CurrentWeather(
    @SerialName("temp_c") val tempCelsius: Double,
    @SerialName("condition") val condition: Condition,
    @SerialName("wind_kph") val windSpeedKph: Double,
    @SerialName("humidity") val humidity: Int,
    @SerialName("cloud") val cloud: Int
)

@Serializable
data class Condition(
    @SerialName("text") val text: String
)

@Serializable
data class WeatherAPIDTO(
    val city: String,
    val temperatureCelsius: Double,
    val windSpeedKph: Double,
    val humidity: Int
)

@Serializable
data class WeeklyWeatherAPIResponse(
    @SerialName("location") val location: Location,
    @SerialName("forecast") val forecast: Forecast
)

@Serializable
data class Forecast(
    @SerialName("forecastday") val forecastday: List<ForecastDay>
)

@Serializable
data class ForecastDay(
    @SerialName("date") val date: String,
    @SerialName("day") val day: Day
)

@Serializable
data class Day(
    @SerialName("avgtemp_c") val avgtempC: Double
)

@Serializable
data class WeeklyWeatherAPIDTO(
    val city: String,
    val forecastDays: List<WeeklyWeatherDay>
)

@Serializable
data class WeeklyWeatherDay(
    val date: String,
    val temperatureCelsius: Double
)
