---
title: "Edge AI Image Analyst"
slug: edge-ai-image-analyst
date: "2025-06"
description: "Fully local photo-gallery cleaner that uses a vision-language model to judge what an image actually is, running on everyday laptops without a discrete GPU."
kind: web
role: "Solo"
tags: [React, llama.cpp, VLM, SQLite, Frontend Virtualisation]
repo: https://github.com/r4yfon/image-gallery-analyser
featured: true
order: 0
problem: "Gallery cleaners flag photos by blur, resolution or duplicate hashes, so they can't tell an old meme screenshot from a screenshot of a receipt."
decision: "Run a quantised vision-language model locally through llama.cpp, with cheap heuristics as an instant first pass, and never send an image off the device."
impact: "Cut per-image inference from 20+ seconds to about 5 on integrated graphics (roughly 4–5× the throughput) by dropping Ollama for direct llama.cpp execution."
---

Edge AI Image Analyst started with my own photo gallery: years of memories mixed in with documents, screenshots, accidental shots and other clutter. Existing cleaner tools rely on technical metrics like blurriness, resolution or binary hashes, which are semantically blind. Whether an image is worth keeping depends on what it shows, so I built an app that uses a Vision-Language Model (VLM) to inspect, categorise and recommend images for deletion.

Two constraints were fixed from the start:

- **Fully on-device:** photos are personal data, so all processing and inference runs locally with no network requests and no cloud API costs.
- **No discrete GPU:** it had to run smoothly on everyday hardware with integrated graphics and a standard multi-core CPU.

## Key features

- **Semantic analysis:** a local VLM describes and categorises each image, then recommends what to keep or delete.
- **Heuristic pre-filter:** blur and exposure scores plus perceptual hashes for duplicates and near-duplicates give an instant first pass, so the AI step is optional when time is short.
- **Local storage:** analysis results are saved in a SQLite database inside the app.
- **Desktop-style grid:** drag-to-select, multi-select keyboard shortcuts and a full-screen preview, modelled on Google Photos and native file explorers.

## From Ollama to llama.cpp

The first version used Ollama to load and query vision models, which made early UI work fast. Stress-testing with large batches exposed two problems on CPU-only machines. Ollama hides most of llama.cpp's low-level execution flags, so the runtime couldn't be tuned to the hardware. Its API wrapper also adds a layer of inter-process communication, and across thousands of images that meant 20 to 30 seconds per image.

I refactored the pipeline to call llama.cpp directly, removing the intermediate server. With GGUF quantised models, memory-mapped weights (mmap) and tuned runtime parameters, inference dropped to about 5 seconds per image on integrated graphics: a fifth of the time, or roughly four to five times the throughput.

## Frontend and user testing

- **Virtualised grid:** rendering 1,000+ images at once caused frame drops and high memory use. Switching the grid to react-window renders only the visible tiles, so the DOM stays small however large the library is.
- **Think-aloud sessions:** I tested with friends and family of different technical backgrounds on their own photo libraries. The preview first opened as a small inline overlay, but testers expected it to take over the screen like a native photo viewer. I rebuilt it as a full-screen modal, which testers found easier to navigate without guidance.

## Learnings

- **Abstractions vs. control:** high-level wrappers are great for prototyping, but in compute-heavy, resource-constrained apps their overhead can cost more than they save. Sometimes the less convenient tool is the right one.
- **Designing for modest hardware:** assuming a low baseline forces a focus on efficiency and keeps the app dependable wherever it runs, especially where specialised hardware isn't available.
