# Misconception Lab — business model and scalability

## Problem
Most learning systems record correctness but lose the reason behind an error. Teachers then spend time manually diagnosing whether a learner chose the wrong concept, made a procedure mistake, missed a constraint, or guessed.

## Initial user
High-school learners, tutors, and small tutoring centers that need faster diagnosis between practice sessions.

## Proposed model
This is a prototype; it has no revenue yet.

- Free learner tier: personal diagnosis, local history, JSON export.
- Educator tier: class-level misconception trends, intervention queue, longitudinal learner profiles.
- School/API tier: LMS integration, roster management, privacy controls, and analytics APIs.

A pilot would test willingness to pay before setting final pricing. The economic hypothesis is that reducing teacher diagnosis time and improving targeted remediation can justify a per-seat or per-classroom subscription.

## Scalability
The current prototype deliberately runs client-side for zero-cost deployment and transparent evaluation. A production architecture would move events to an authenticated API and relational store while keeping the evidence engine deterministic and testable. Aggregations can be computed per learner, class, topic, and time window.

## Go-to-market test
1. Recruit 3–5 tutors or teachers.
2. Run a two-week pilot with real practice sessions.
3. Measure diagnosis time, intervention acceptance, and repeat usage.
4. Interview users on workflow fit and willingness to pay.
5. Only then choose pricing and build LMS integrations.

## Risks
- Cause labels can be wrong if learners self-diagnose poorly.
- Educational impact must be validated; the prototype does not claim improved grades.
- Student data requires strict privacy controls before production deployment.
