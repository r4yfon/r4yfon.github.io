---
title: "WFH Scheduler"
slug: wfh-scheduler
date: "2024-11"
description: "Role-based work-from-home scheduling for staff, managers, directors and HR, built with Flask and Vue 3."
kind: web
role: "Group · Fullstack & deployment"
tags: [Flask, Vue 3, MySQL, NeonDB, Vercel]
repo: https://github.com/r4yfon/is212-wfh-management-tool
demo: https://is212-frontend.vercel.app/
featured: true
order: 2
problem: "Teams tracked work-from-home requests in spreadsheets and chat, so nobody had one view of who was in the office."
decision: "Four role-based views (staff, manager, director, HR) on one data model, with a six-state approval flow and an alert when a team's in-office attendance drops below 50%."
impact: "Shipped to production in two months with CI on every push (GitHub Actions running 19 pytest tests). I built the director view and handled the deployment."
---

WFH Scheduler replaces the spreadsheets and chat threads that teams used for work-from-home requests with a single app showing who is in the office on any given day. It was a group project with a Flask backend and a Vue 3 frontend. I built the director view and owned the deployment.

## Four roles, one schedule

Users log in as staff, managers, directors or HR, each with their own access rights and dashboard. Staff submit and track their own WFH requests. Managers approve, reject or rescind requests from their team and see its schedule. Directors see across the teams under them, and HR sees the whole organisation by department, with any day under 50% in-office attendance flagged.

## Requests and approvals

- **One-time or recurring:** staff can request a single day or a repeating arrangement in one submission.
- **Reversible decisions:** managers can rescind a request they've already approved when plans change.
- **Full history:** every status change is logged, so it's always clear how a request got where it is.

## Deployment

The frontend and the Flask API are both hosted on Vercel. We developed against a local MySQL database, and production runs on NeonDB, a serverless PostgreSQL provider. GitHub Actions runs the pytest suite on every push.
