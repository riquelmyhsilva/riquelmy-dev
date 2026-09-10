---
title: Introduction to Redis
description: A practical guide on how to get started with Redis for caching and in-memory key-value storage.
date: 2026-05-20
tags:
  - redis
  - database
draft: true
---

Redis is an extremely fast in-memory NoSQL key-value database. It is versatile, easy to use, and primarily used for caching, session management, and real-time rankings.

## First Commands

The first commands cover verifying connectivity and inserting basic key-value data.

### Environment Test

To test whether the Redis instance is running and accepting commands, run `PING`:

```text
PING
```

Output:

```text
"PONG"
```

```text
SET student:1 "Ana"
```
