---
title: "TodoDroid"
slug: todo-droid
date: "2025-05"
description: "A to-do app for Android with tasks grouped into columns, built with Kotlin and Jetpack Compose."
kind: android
role: "Solo"
tags: [Kotlin, Jetpack Compose]
repo: https://github.com/r4yfon/todo-droid
decision: "Moved to Jetpack Compose and added local persistence, so tasks survive the app closing."
---

TodoDroid is a to-do app for Android, built with Kotlin and Jetpack Compose. Tasks live in named groups shown side by side as columns, and everything persists locally with Room.

Built for Android App Development while on exchange at Koç University, Istanbul: the second of three apps, after [TicTacDroid](/projects/tic-tac-droid/).

## Features

- Create, edit and delete tasks, each with a title and details
- Organise tasks into named groups, displayed as columns
- Mark tasks as complete
- Deleting a group removes its tasks with it
- Local persistence with Room, so tasks survive the app closing

## Tech stack

- Kotlin
- Jetpack Compose
- Room (with KSP)
- Android SDK
