# Weathy

Weathy is a web application for monitoring and analyzing weather conditions. The application consists of a frontend implemented in React using TypeScript, and a backend in Kotlin using the Spring Framework.

### Version: 0.1.1

---

## Table of Contents

1. [Description](#description)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [Usage](#usage)
5. [TODO](#todo)

## Description

Weathy allows users to get up-to-date weather information for various regions, view forecasts, and analyze historical weather data.

## Technologies

**Frontend:**

- React
- TypeScript
- Axios (for HTTP requests)
- M3 Material Design

**Backend:**

- Kotlin
- Spring Boot
- REST API

## Installation

### Requirements

- Node.js and npm
- Java

### Installation Steps

#### Clone the Repository

```bash
git clone https://github.com/bbroklyn/wealthy-web-weather-checker.git
cd backend
```

#### install backend

```bash
./gradlew bootRun
```

#### Install Frontend

```bash
cd frontend
npm install
npm start
```

## Usage

Configure `resources/application.properties`

```properties
spring.application.name=
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration,org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration
api.openweather.key=
api.weatherapi.key=
server.port=8000
```

#### Postman: [Click me](https://www.postman.com/bbroklyn/workspace/projects/collection/34359699-0e435bdb-e8fb-4e2a-b6e9-03e0a5a67667)

## TODO

- [x] Add support for multiple languages
- [ ] Implement push notification functionality
- [ ] Improve user interface and UX
- [x] Integrate with external APIs for more accurate weather data
- [ ] Write tests for frontend and backend
- [x] Correct forecast for 7 days
- [x] Adaptive interface
