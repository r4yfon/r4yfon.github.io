---
title: "WeatherDroid"
slug: weatherdroid
date: "2025-06"
description: "An Android weather app showing live conditions from the Open-Meteo API, built with Kotlin and Jetpack Compose."
kind: android
role: "Solo"
tags: [Kotlin, Jetpack Compose, Retrofit]
repo: https://github.com/r4yfon/weatherdroid
decision: "Added the real-world parts: live API calls with Retrofit and runtime location permissions for Android 12+."
---

WeatherDroid shows the current weather where you are, or in any of a list of major cities. Built for Android App Development while on exchange at Koç University, Istanbul: the last of three apps, after [TicTacDroid](/projects/tic-tac-droid/) and [TodoDroid](/projects/todo-droid/).

It's the first of the three to depend on the outside world. Weather data comes live from the Open-Meteo API, and your location comes from the device, which means asking for permission at runtime the way Android 12+ requires.

## Features

- Current weather for your location, using Android's location services
- A list of major cities to check instead
- Temperature with an icon for the conditions (sunny, cloudy, rainy and so on)
- Runtime location permission handling for Android 12+

## Tech stack

- Kotlin
- Jetpack Compose
- Retrofit (REST calls to the Open-Meteo API)
- Android SDK (LocationManager, Geocoder)
- Lucide icons
