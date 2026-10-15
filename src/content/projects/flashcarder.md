---
title: "Flashcarder"
slug: flashcarder
date: "2025-04"
description: "Turns your study notes into flashcards with AI, and links every card back to the note it came from."
kind: web
role: "Solo"
tags: [SvelteKit, Tailwind CSS, SQLite, Drizzle ORM, OpenRouter AI]
repo: https://github.com/r4yfon/flashcarder
featured: true
order: 1
problem: "Writing flashcards by hand takes longer than studying them."
decision: "Paste or drop in Markdown notes and let AI draft the cards, with every batch linked back to its source note."
impact: "Shipped AI-drafted, source-linked flashcards in April 2025, five months before NotebookLM added the same feature."
---

I was spending longer writing flashcards than studying them. The notes already held everything the cards needed, so I built a tool to bridge the gap: drop in your Markdown notes, choose how many cards you want, and get a study-ready deck. I built it in a week in April 2025. Five months later, Google added the same idea to NotebookLM.

## Why every card links to its source

AI-drafted cards are only useful if you can trust them. Each generation produces a **batch** tied to the note it came from, so you can always check a card against the original text. If a batch misses the point, **regenerate** replaces the whole batch instead of leaving stale cards mixed in with new ones.

## How it works

- **Notes in, cards out:** write notes in the app with a live Markdown preview, or drag in `.md` files.
- **You choose the deck size:** request between 1 and 50 cards per generation.
- **Structured output:** the model (Gemini 2.0 Flash via OpenRouter) returns strict JSON question–answer pairs. Malformed items are filtered out, so a bad response can't break the deck.
- **Study mode:** flip through a batch one card at a time.

## Why I stopped

Next on the roadmap was local model support, so notes would never have to leave your machine. Then NotebookLM shipped flashcards from your own sources, free and backed by Google. Privacy was the one edge left, and I didn't think it was enough to build a product around, so I stopped there instead of maintaining a weaker copy. Local inference didn't go to waste: it's the core of [Edge AI Image Analyst](/projects/edge-ai-image-analyst/), which runs a vision model fully on-device.

## Tech stack

- **App:** SvelteKit, Tailwind CSS
- **Data:** SQLite with Drizzle ORM
- **AI:** OpenRouter (Gemini 2.0 Flash)
