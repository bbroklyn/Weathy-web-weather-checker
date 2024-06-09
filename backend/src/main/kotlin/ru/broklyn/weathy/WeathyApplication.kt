package ru.broklyn.weathy

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Import
import ru.broklyn.weathy.config.AppConfig

@SpringBootApplication
@Import(AppConfig::class)
class WeathyApplication

fun main(args: Array<String>) {
	runApplication<WeathyApplication>(*args)
}