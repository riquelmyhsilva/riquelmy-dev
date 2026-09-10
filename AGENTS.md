# AGENTS.md - Documentação Técnica e Guia Operacional

Este documento serve como referência técnica completa para desenvolvedores e agentes de IA que precisam entender, manter, atualizar ou publicar conteúdo no portfólio e blog técnico **[riquelmy.dev](https://riquelmy.dev)** de **Riquelmy Henrique Silva**.

---

## 1. Visão Geral do Projeto

- **Propósito**: Portfólio pessoal e blog técnico com foco em Ciência de Dados, Engenharia de Dados, Business Intelligence, Machine Learning e Desenvolvimento de Software.
- **Tipo de Aplicação**: Site estático (SSG - Static Site Generation) com geração de rotas pré-renderizadas em HTML/CSS.
- **Hospedagem & Deploy**: Firebase Hosting (Projeto: `riquelmyhsilva-portfolio`).
- **Domínio de Produção**: `https://riquelmy.dev`
- **Internacionalização (i18n)**: Suporte bilíngue nativo em Português (`pt-BR`, padrão sem prefixo na URL) e Inglês (`en`, com prefixo `/en`).

---

## 2. Stack Tecnológica

| Tecnologia | Finalidade / Versão |
| :--- | :--- |
| **Astro** | Framework principal (v7 / `astro: ^7.3.2`), configurado para saída puramente estática (`output: 'static'`) e roteamento `i18n`. |
| **Astro Content Collections** | Gerenciamento de conteúdo tipado com validação de schemas via **Zod** (`src/content.config.ts`), organizado por subpastas `pt/` e `en/`. |
| **MDX / Markdown** | Suporte a arquivos `.md` e `.mdx` via `@astrojs/mdx`. |
| **Tailwind CSS v4** | Estilização via plugin Vite (`@tailwindcss/vite`) e plugin `@tailwindcss/typography`. |
| **Shiki** | Syntax highlighting em blocos de código com dual-theme (`github-dark` e `github-light`) adaptável ao tema ativo. |
| **SEO, RSS & Sitemap** | Geração automática de sitemap (`@astrojs/sitemap`) e feeds RSS dinâmicos em `/rss.xml` (PT) e `/en/rss.xml` (EN) (`@astrojs/rss`), com tags `alternate hreflang`. |
| **Firebase Hosting** | Hospedagem estática com cache longo e imutável para assets estáticos (`dist/`). |

---

## 3. Estrutura de Diretórios

```text
.
├── astro.config.mjs          # Configurações do Astro, integrações (MDX, Sitemap, Tailwind, i18n) e Shiki
├── firebase.json             # Regras de hospedagem, headers de cache e roteamento do Firebase Hosting
├── .firebaserc               # Mapeamento do projeto Firebase ("riquelmyhsilva-portfolio")
├── package.json              # Dependências e scripts de execução
├── tsconfig.json             # Configurações de TypeScript e path aliases (@components, @layouts, etc.)
├── public/                   # Arquivos estáticos servidos diretamente na raiz (ex: favicon.ico, favicon.svg)
└── src/
    ├── components/           # Componentes Astro reutilizáveis
    │   ├── ArticleCard.astro       # Card de resumo de post na listagem (adaptável a pt/en)
    │   ├── Callout.astro           # Componente MDX para avisos (note, warning, tip)
    │   ├── Footer.astro            # Rodapé do site com links localizados
    │   ├── Header.astro            # Cabeçalho com navegação, seletor de idioma e tema
    │   ├── LanguageToggle.astro    # Seletor de idioma em estilo Pill (PT | EN)
    │   ├── ProjectCard.astro       # Card de projeto com tags de stack e links
    │   ├── TableOfContents.astro   # Sumário lateral automático de headings
    │   ├── TagList.astro           # Lista de badges/tags com links no idioma ativo
    │   └── ThemeToggle.astro       # Botão de alternância Dark/Light mode
    ├── content/              # Diretórios das Content Collections
    │   ├── blog/             # Artigos em Markdown (.md) ou MDX (.mdx)
    │   │   ├── pt/           # Artigos em Português
    │   │   └── en/           # Artigos em Inglês
    │   └── projects/         # Projetos em MDX (.mdx)
    │       ├── pt/           # Projetos em Português
    │       └── en/           # Projetos em Inglês
    ├── content.config.ts     # Definição e validação dos schemas Zod das coleções
    ├── i18n/                 # Sistema de internacionalização
    │   ├── ui.ts             # Dicionário de traduções da UI (menus, botões, seções)
    │   └── utils.ts          # Helpers (getLangFromUrl, useTranslations, getLocalizedPath, formatLocalizedDate)
    ├── layouts/              # Layouts base
    │   ├── BaseLayout.astro        # Estrutura HTML base (head, hreflang, SEO, Header, Footer)
    │   └── ArticleLayout.astro     # Layout detalhado de leitura de artigos com ToC e paginação
    ├── pages/                # Rotas do site baseadas em arquivo
    │   ├── 404.astro               # Página de erro 404
    │   ├── about.astro             # Página /about (PT)
    │   ├── index.astro             # Página inicial / (PT)
    │   ├── projects.astro          # Página /projects (PT)
    │   ├── rss.xml.ts              # Feed RSS em Português
    │   ├── blog/                   # Rotas do Blog em Português
    │   │   ├── index.astro         # Página /blog (listagem com filtro)
    │   │   └── [...slug].astro     # Rota dinâmica /blog/:slug
    │   └── en/                     # Rotas em Inglês
    │       ├── index.astro         # Página /en (Home EN)
    │       ├── about.astro         # Página /en/about (About EN)
    │       ├── projects.astro      # Página /en/projects (Projects EN)
    │       ├── rss.xml.ts          # Feed RSS em Inglês (/en/rss.xml)
    │       └── blog/               # Rotas do Blog em Inglês
    │           ├── index.astro     # Página /en/blog
    │           └── [...slug].astro # Rota dinâmica /en/blog/:slug
    ├── styles/
    │   └── global.css        # Variáveis de tema CSS (Dark/Light), fontes e utilitários
    └── utils/
        ├── formatDate.ts     # Utilitário legado de formatação de data
        └── readingTime.ts    # Utilitário de cálculo de palavras/min
```

---

## 4. Gestão de Artigos do Blog (`src/content/blog/`)

### 4.1. Como criar um novo post

1. Crie o arquivo em Português em `src/content/blog/pt/<slug>.md` (ou `.mdx`).
2. Crie o arquivo em Inglês em `src/content/blog/en/<slug>.md` (ou `.mdx`), **usando o mesmo nome de arquivo/slug**.
3. Exemplo:
   - `src/content/blog/pt/introducao-ao-spark.md` -> Acessível em `/blog/introducao-ao-spark`
   - `src/content/blog/en/introducao-ao-spark.md` -> Acessível em `/en/blog/introducao-ao-spark`
4. Preencha o cabeçalho (Frontmatter) em ambos os arquivos.

### 4.2. Schema do Frontmatter para Artigos

Definido em `src/content.config.ts`:

| Campo | Tipo | Obrigatório | Padrão | Descrição |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `string` | **Sim** | - | Título principal do artigo. |
| `description` | `string` | **Sim** | - | Resumo/descrição usado no card, SEO e feed RSS. |
| `date` | `date` | **Sim** | - | Data de publicação no formato `YYYY-MM-DD` (ex: `2026-05-20`). |
| `tags` | `string[]` | **Sim** | - | Lista de tags/categorias do artigo (ex: `["python", "etl"]`). |
| `draft` | `boolean` | Não | `false` | Se `true`, o artigo é marcado como rascunho. |

---

## 5. Gestão de Projetos (`src/content/projects/`)

### 5.1. Como criar um novo projeto

1. Crie a versão em Português em `src/content/projects/pt/<slug-do-projeto>.mdx`.
2. Crie a versão em Inglês em `src/content/projects/en/<slug-do-projeto>.mdx` mantendo o mesmo slug.
3. Preencha o Frontmatter com as informações do projeto.

---

## 6. Sistema de Internacionalização (i18n)

### 6.1. Dicionário de UI (`src/i18n/ui.ts`)
Todas as mensagens e labels de navegação, botões, cabeçalho e rodapé são centralizadas no objeto `ui` com as chaves tipadas em `src/i18n/ui.ts`.

### 6.2. Utilitários (`src/i18n/utils.ts`)
- `getLangFromUrl(url)`: detecta o idioma a partir da URL.
- `useTranslations(lang)`: retorna a função `t(chave)` para strings de interface.
- `getLocalizedPath(pathname, targetLang)`: converte qualquer caminho entre `/caminho` e `/en/caminho`.
- `formatLocalizedDate(date, lang)`: formata datas em formato brasileiro (`pt-BR`) ou americano (`en-US`).
- `getLocalizedReadingTime(content, lang)`: calcula o tempo de leitura no formato "X min de leitura" ou "X min read".

---

## 7. Comandos de Desenvolvimento e Deploy

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor local de desenvolvimento (Hot Reload em http://localhost:4321)
npm run dev

# 3. Gerar a build de produção estática (gera a pasta dist/)
npm run build

# 4. Pré-visualizar localmente a build gerada
npm run preview

# 5. Deploy no Firebase Hosting
npx firebase deploy --only hosting
```
