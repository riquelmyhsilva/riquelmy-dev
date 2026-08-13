# AGENTS.md - Documentação Técnica e Guia Operacional

Este documento serve como referência técnica completa para desenvolvedores e agentes de IA que precisam entender, manter, atualizar ou publicar conteúdo no portfólio e blog técnico **[riquelmy.dev](https://riquelmy.dev)** de **Riquelmy Henrique Silva**.

---

## 1. Visão Geral do Projeto

- **Propósito**: Portfólio pessoal e blog técnico com foco em Ciência de Dados, Engenharia de Dados, Business Intelligence, Machine Learning e Desenvolvimento de Software.
- **Tipo de Aplicação**: Site estático (SSG - Static Site Generation) com geração de rotas pré-renderizadas em HTML/CSS.
- **Hospedagem & Deploy**: Firebase Hosting (Projeto: `riquelmyhsilva-portfolio`).
- **Domínio de Produção**: `https://riquelmy.dev`

---

## 2. Stack Tecnológica

| Tecnologia | Finalidade / Versão |
| :--- | :--- |
| **Astro** | Framework principal (v5 / `astro: ^6.3.5`), configurado para saída puramente estática (`output: 'static'`). |
| **Astro Content Collections** | Gerenciamento de conteúdo tipado com validação de schemas via **Zod** (`src/content.config.ts`). |
| **MDX / Markdown** | Suporte a arquivos `.md` e `.mdx` via `@astrojs/mdx`. |
| **Tailwind CSS v4** | Estilização via plugin Vite (`@tailwindcss/vite`) e plugin `@tailwindcss/typography`. |
| **Shiki** | Syntax highlighting em blocos de código com dual-theme (`github-dark` e `github-light`) adaptável ao tema ativo. |
| **SEO, RSS & Sitemap** | Geração automática de sitemap (`@astrojs/sitemap`) e feed RSS dinâmico em `/rss.xml` (`@astrojs/rss`). |
| **Firebase Hosting** | Hospedagem estática com cache longo e imutável para assets estáticos (`dist/`). |

---

## 3. Estrutura de Diretórios

```text
.
├── astro.config.mjs          # Configurações do Astro, integrações (MDX, Sitemap, Tailwind) e Shiki
├── firebase.json             # Regras de hospedagem, headers de cache e roteamento do Firebase Hosting
├── .firebaserc               # Mapeamento do projeto Firebase ("riquelmyhsilva-portfolio")
├── package.json              # Dependências e scripts de execução
├── tsconfig.json             # Configurações de TypeScript e path aliases (@components, @layouts, etc.)
├── public/                   # Arquivos estáticos servidos diretamente na raiz (ex: favicon.ico, favicon.svg)
└── src/
    ├── components/           # Componentes Astro reutilizáveis
    │   ├── ArticleCard.astro       # Card de resumo de post na listagem
    │   ├── Callout.astro           # Componente MDX para avisos (note, warning, tip)
    │   ├── Footer.astro            # Rodapé do site
    │   ├── Header.astro            # Cabeçalho com navegação e menu mobile
    │   ├── ProjectCard.astro       # Card de projeto com tags de stack e links
    │   ├── TableOfContents.astro   # Sumário lateral automático de headings
    │   ├── TagList.astro           # Lista de badges/tags
    │   └── ThemeToggle.astro       # Botão de alternância Dark/Light mode
    ├── content/              # Diretórios das Content Collections
    │   ├── blog/             # Artigos em Markdown (.md) ou MDX (.mdx)
    │   │   ├── .obsidian/    # Configurações locais do Obsidian (ignorado no git)
    │   │   └── .trash/       # Lixeira do Obsidian (ignorado no git)
    │   └── projects/         # Projetos em MDX (.mdx)
    ├── content.config.ts     # Definição e validação dos schemas Zod das coleções
    ├── layouts/              # Layouts base
    │   ├── BaseLayout.astro        # Estrutura HTML base (head, meta tags SEO, Header, Footer)
    │   └── ArticleLayout.astro     # Layout detalhado de leitura de artigos com ToC e navegação
    ├── pages/                # Rotas do site baseadas em arquivo
    │   ├── 404.astro               # Página de erro 404
    │   ├── about.astro             # Página /about (biografia, matriz de skills, contatos)
    │   ├── index.astro             # Página inicial / (Hero, artigos recentes, projetos destacados)
    │   ├── projects.astro          # Página /projects (listagem completa de projetos)
    │   ├── rss.xml.ts              # Endpoint que gera o feed RSS
    │   └── blog/                   # Rotas do Blog
    │       ├── index.astro         # Página /blog (listagem com filtro interativo por tags)
    │       └── [...slug].astro     # Rota dinâmica /blog/:slug (renderização do post)
    ├── styles/
    │   └── global.css        # Variáveis de tema CSS (Dark/Light), fontes, utilitários e estilos .prose
    └── utils/
        ├── formatDate.ts     # Utilitário de formatação de data ("May 19, 2026")
        └── readingTime.ts    # Utilitário para cálculo de tempo de leitura (~200 palavras/min)
```

---

## 4. Gestão de Artigos do Blog (`src/content/blog/`)

### 4.1. Como criar um novo post

1. Crie um novo arquivo dentro de `src/content/blog/` com a extensão `.md` ou `.mdx`.
2. O nome do arquivo (em `kebab-case`) definirá o **slug** e a URL do artigo (ex: `src/content/blog/meu-novo-artigo.md` será acessível em `/blog/meu-novo-artigo`).
3. Adicione o cabeçalho obrigatório (Frontmatter) no início do arquivo.

### 4.2. Schema do Frontmatter para Artigos

Definido em `src/content.config.ts`:

| Campo | Tipo | Obrigatório | Padrão | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `string` | **Sim** | - | Título principal do artigo. |
| `description` | `string` | **Sim** | - | Resumo/descrição usado no card, SEO e feed RSS. |
| `date` | `date` | **Sim** | - | Data de publicação no formato `YYYY-MM-DD` (ex: `2026-05-20`). |
| `tags` | `string[]` | **Sim** | - | Lista de tags/categorias do artigo (ex: `["python", "etl"]`). |
| `draft` | `boolean` | Não | `false` | Se `true`, o artigo é marcado como rascunho. |

#### Exemplo de arquivo `.md` básico:
```markdown
---
title: Introdução ao Apache Spark
description: Um guia introdutório e prático sobre processamento de dados em larga escala com PySpark.
date: 2026-08-15
tags:
  - python
  - spark
  - data-engineering
draft: false
---

Aqui começa o conteúdo do seu artigo em Markdown padrão.
```

### 4.3. Como funcionam os Drafts (Rascunhos)

- **Com `draft: true`**:
  - O arquivo existe no repositório, mas é **ignorado** durante a build em:
    - Página inicial (`/` - artigos recentes)
    - Listagem geral do blog (`/blog`)
    - Geração de páginas estáticas (`/blog/[slug]`)
    - Feed RSS (`/rss.xml`)
- **Para publicar o rascunho**:
  - Altere para `draft: false` (ou remova a linha `draft`, cujo padrão é `false`).
  - Execute a build e o deploy.

### 4.4. Recursos Avançados em Artigos (MDX)

Ao usar a extensão `.mdx`, você pode usar componentes Astro dentro do texto:

#### Componente Callout (`@components/Callout.astro`):
```mdx
---
title: Exemplo com Componentes MDX
description: Demonstrando recursos de Callout.
date: 2026-08-15
tags: ["tutorial"]
draft: false
---
import Callout from '@components/Callout.astro';

<Callout type="note" title="Nota Importante">
  Este é um aviso do tipo nota (azul/accent).
</Callout>

<Callout type="warning" title="Atenção">
  Este é um aviso de alerta (amarelo/laranja).
</Callout>

<Callout type="tip" title="Dica Pro">
  Esta é uma dica prática (verde).
</Callout>
```

#### Tabela de Conteúdos Automática (Table of Contents):
- O layout `ArticleLayout.astro` analisa os títulos (`h2` e `h3`).
- Se houver **3 ou mais títulos** (`h2`/`h3`) no artigo, um menu lateral com o sumário navegável é gerado automaticamente na visualização desktop.

#### Tempo de Leitura Automático:
- O helper `getReadingTime` calcula dinamicamente o tempo estimado de leitura (baseado em ~200 palavras por minuto) e exibe no cabeçalho do post e no card.

### 4.5. Integração com Obsidian

- A pasta `src/content/blog/` está configurada para poder ser aberta diretamente como um **Vault do Obsidian**.
- As pastas `.obsidian` e `.trash` são intencionalmente ignoradas no `.gitignore` para permitir escrita e organização de notas sem poluir o versionamento do git.

---

## 5. Gestão de Projetos (`src/content/projects/`)

### 5.1. Como criar um novo projeto

1. Crie um arquivo em `src/content/projects/<slug-do-projeto>.mdx`.
2. Preencha o Frontmatter conforme o schema.

### 5.2. Schema do Frontmatter para Projetos

| Campo | Tipo | Obrigatório | Padrão | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `string` | **Sim** | - | Nome do projeto. |
| `description` | `string` | **Sim** | - | Resumo sucinto do que o projeto faz. |
| `stack` | `string[]` | **Sim** | - | Tecnologias utilizadas (ex: `["Python", "Docker", "PostgreSQL"]`). |
| `githubUrl` | `string` | Não | - | Link para o repositório no GitHub (opcional). |
| `liveUrl` | `string` | Não | - | Link para demo online ou deploy em produção (opcional). |
| `featured` | `boolean` | Não | `false` | Se `true`, exibe o projeto na Home (`/`) e coloca-o no topo de `/projects`. |

#### Exemplo de projeto:
```mdx
---
title: "Pipeline de Ingestão de Dados em Tempo Real"
description: "Arquitetura distribuída com Kafka e Spark Streaming para processamento de eventos analíticos."
stack: ["Python", "Apache Kafka", "Apache Spark", "Docker", "PostgreSQL"]
githubUrl: "https://github.com/riquelmyhsilva/realtime-pipeline"
liveUrl: ""
featured: true
---

Descrição adicional opcional sobre arquitetura e decisões de engenharia.
```

---

## 6. Comandos de Desenvolvimento e Deploy

### 6.1. Pré-requisitos
- Node.js 20+ (recomendado >= 22.12.0)
- npm

### 6.2. Comandos do dia a dia

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor local de desenvolvimento (Hot Reload em http://localhost:4321)
npm run dev

# 3. Gerar a build de produção estática (gera a pasta dist/)
npm run build

# 4. Pré-visualizar localmente a build gerada
npm run preview
```

### 6.3. Deploy no Firebase Hosting

O site é hospedado no Firebase Hosting sob o projeto `riquelmyhsilva-portfolio`.

```bash
# 1. Certifique-se de que a build está atualizada
npm run build

# 2. Executar o deploy no Firebase Hosting
npx firebase deploy --only hosting
# ou se tiver o firebase-tools instalado globalmente:
firebase deploy
```

---

## 7. Rotas e Arquitetura do Site

- `/` (`src/pages/index.astro`):
  - Hero com introdução de Riquelmy Henrique Silva.
  - Seção com os 3 artigos mais recentes (não-drafts).
  - Seção com projetos marcados com `featured: true`.
- `/blog` (`src/pages/blog/index.astro`):
  - Listagem completa de todos os artigos publicados.
  - Filtro interativo por tags (atualiza o parâmetro `?tag=nome-da-tag` via URL).
- `/blog/[...slug]` (`src/pages/blog/[...slug].astro`):
  - Exibição do artigo completo com suporte a syntax highlighting, ToC e paginação de post anterior / próximo.
- `/projects` (`src/pages/projects.astro`):
  - Catálogo completo de projetos (ordenados por destaque e depois alfabeticamente).
- `/about` (`src/pages/about.astro`):
  - Biografia detalhada, foco de atuação atual e matriz de habilidades (Data Science/ML, Data Engineering, BI, Programming, Infrastructure).
- `/rss.xml` (`src/pages/rss.xml.ts`):
  - Feed RSS 2.0 contendo todos os artigos com `draft: false`.

---

## 8. Convenções e Boas Práticas

1. **Nomenclatura de Arquivos**: Use `kebab-case` para nomes de arquivos de posts e projetos (ex: `otimizando-queries-sql.md`).
2. **Formato de Datas**: Sempre usar `YYYY-MM-DD` nas propriedades `date` do frontmatter.
3. **Imagens & Assets**:
   - Imagens globais ou favicons: colocar na pasta `public/`.
   - Imagens de posts: colocar em `public/images/blog/` ou importar diretamente no MDX.
4. **Performance & JavaScript**: Manter a filosofia de **Zero JavaScript no cliente por padrão**; usar scripts inline leves apenas para interações essenciais de UI (filtro de tags, toggle de tema, menu mobile).
5. **Estilos**:
   - Utilizar as variáveis CSS de tema definidas em `src/styles/global.css` (`--color-bg`, `--color-surface`, `--color-accent`, `--color-text`, etc.).
   - Utilizar classes utilitárias `.container-main` (1100px) e `.container-article` (720px) para consistência de largura de página.
