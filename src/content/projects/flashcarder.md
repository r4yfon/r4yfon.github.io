---
title: "Flashcarder"
slug: flashcarder
date: "2025-04"
description: "A web-based flashcard application for efficient learning and memorisation."
kind: web
role: "Solo"
tags: [SvelteKit, Tailwind CSS, SQLite, Drizzle ORM, OpenRouter AI]
repo: https://github.com/r4yfon/flashcarder
featured: true
order: 3
problem: "Writing flashcards by hand takes longer than studying them."
decision: "Paste or drop in Markdown notes and let AI draft the cards, with every batch linked back to its source note."
# impact: "TODO: one measurable or concrete outcome"
---

Flashcarder is a simple and interactive web application designed to help users create, manage, and study flashcards. Ideal for students and lifelong learners, it offers an intuitive interface for building custom decks and tracking progress.

## Features

- Create Notes: Write notes directly in the application using a simple editor.
- Markdown Upload: Drag and drop Markdown (.md) files to import notes quickly.
- AI Flashcard Generation: Automatically generate flashcards from your note content using an AI service (OpenRouter/Gemini).
- View & Manage Notes: See a list of all your notes, view individual notes, and delete them.
- View & Manage Flashcards: Flashcards are grouped by generation batch. View batches, flip cards between question and answer, and delete individual cards or entire batches.
- Note Linking: Flashcard batches link back to the original note they were generated from.

## Technologies Used

- SvelteKit
- Tailwind CSS
- SQLite
- Drizzle ORM
- OpenRouter AI
