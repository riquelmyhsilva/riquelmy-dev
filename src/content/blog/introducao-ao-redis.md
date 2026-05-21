---
title: Introdução ao Redis
description: Um guia prático que ensina a como utilizar o Redis.
date: 2026-05-20
tags:
  - redis
  - banco-de-dados
draft: true
---

Redis é um tipo de banco de dados NoSQL extremamente rápido. Trabalhando em memória, armazena dados em formato de chave-valor de forma versátil e de fácil uso. É usado principalmente para armazenamento de cache, gerenciamento de sessões e classificações.
## Primeiros comandos

Os primeiros comandos a serem ensinados baseiam-se em testar o ambiente e adicionar alguns dados no banco de dados.

### Teste de ambiente

Para testar se o ambiente está online recebendo comandos, utilize o PING:

```
PING
```

Output:

```
"PONG"
```

```redis
SET aluno: 1 "Ana"
```

