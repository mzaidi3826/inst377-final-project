AUDIENCE

This document is written for future developers who will maintain or extend the Email Risk Checker.

Readers are assumed to:
- Understand JavaScript, APIs, and databases
- Be familiar with Node.js and Express
- Have general web development experience 

SYSTEM OVERVIEW

The system follows a client–server architecture:

Front End
- HTML, CSS, JavaScript
- Chart.js & Toastify.js

Back End
- Node.js with Express
- REST API endpoints

Database
- Supabase (PostgreSQL)

External API
- IPQualityScore (Email Fraud API)

INSTALLATION & DEPENDENCIES

Prerequisites
- Node.js (v18+ recommended)
- npm
- Supabase account
- IPQualityScore API key