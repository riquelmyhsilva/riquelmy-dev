export const languages = {
  pt: 'Português',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'pt';

export const ui = {
  pt: {
    // Navigation
    'nav.blog': 'Blog',
    'nav.projects': 'Projetos',
    'nav.about': 'Sobre',

    // Site meta
    'site.title': 'Riquelmy Henrique Silva',
    'site.description': 'Site pessoal e blog técnico sobre ciência de dados, machine learning, business intelligence, programação e infraestrutura.',

    // Hero
    'hero.greeting': 'Olá, eu sou',
    'hero.name': 'Riquelmy Henrique Silva',
    'hero.role': 'Cientista de Dados / Engenheiro de IA & Dados / Desenvolvedor',
    'hero.bio': 'Construo pipelines de dados, sistemas de IA em produção, treino modelos, crio dashboards e escrevo sobre o que aprendo pelo caminho. Este site é onde compartilho artigos técnicos e projetos em ciência de dados, engenharia de IA, machine learning, business intelligence e infraestrutura.',
    'hero.ctaBlog': 'Ler o blog',
    'hero.ctaProjects': 'Ver projetos',

    // Sections
    'section.recentArticles': 'Artigos Recentes',
    'section.featuredProjects': 'Projetos em Destaque',
    'section.viewAll': 'Ver todos',

    // Blog
    'blog.title': 'Blog',
    'blog.desc': 'Artigos técnicos sobre ciência de dados, engenharia e desenvolvimento de software.',
    'blog.metaDesc': 'Artigos técnicos sobre ciência de dados, machine learning, business intelligence, programação e infraestrutura.',
    'blog.filterAll': 'Todos',
    'blog.empty': 'Nenhum artigo publicado ainda.',

    // Projects
    'projects.title': 'Projetos',
    'projects.desc': 'Uma seleção de projetos abrangendo ciência de dados, engenharia de dados, business intelligence e desenvolvimento de software.',
    'projects.metaDesc': 'Portfólio de projetos de ciência de dados, engenharia e desenvolvimento.',
    'projects.source': 'Código',
    'projects.live': 'Online',
    'projects.viewDetails': 'Ver detalhes',
    'projects.backToProjects': 'Todos os projetos',
    'projects.featuredBadge': 'Destaque',
    'projects.prev': 'Projeto anterior',
    'projects.next': 'Próximo projeto',
    'projects.empty': 'Nenhum projeto publicado ainda.',

    // About
    'about.title': 'Sobre',
    'about.metaDesc': 'Trajetória, habilidades e áreas de foco atual.',
    'about.bio1': 'Sou Cientista de Dados, Engenheiro de IA & Dados e Desenvolvedor atuando na interseção entre inteligência artificial, análise de dados, machine learning e engenharia de software. No meu dia a dia, construo sistemas de IA em produção, pipelines de dados, modelos preditivos e dashboards que transformam dados brutos em inteligência acionável.',
    'about.bio2': 'Tenho grande interesse em fluxos de trabalho de dados e IA ponta a ponta: desde a ingestão e transformação inicial até o deploy de agentes LLM, modelos de ML e visualização. Trabalho principalmente com Python para engenharia de IA e ciência de dados, Power BI e Microsoft Fabric para business intelligence, e TypeScript para desenvolvimento web.',
    'about.bio3': 'Fora do trabalho, mantenho um ambiente de desenvolvimento Linux, contribuo com ferramentas open-source e escrevo sobre os tópicos que exploro neste blog.',
    'about.focusTitle': 'Foco Atual',
    'about.focus1': 'Desenvolvimento de sistemas de IA em produção (LLMs, RAG, Agentes, Guardrails e Evals automatizadas)',
    'about.focus2': 'Modelos de previsão de séries temporais e planejamento de demanda',
    'about.focus3': 'Construção de pipelines ETL escaláveis com orquestração moderna',
    'about.focus4': 'Adoção de Microsoft Fabric e modelagem semântica no Power BI',
    'about.focus5': 'Escrita técnica e compartilhamento de conhecimento',
    'about.skillsTitle': 'Habilidades',
    'about.skills.ai': 'AI Engineering',
    'about.skills.ds': 'Ciência de Dados / ML',
    'about.skills.de': 'Engenharia de Dados',
    'about.skills.bi': 'Business Intelligence',
    'about.skills.prog': 'Programação',
    'about.skills.infra': 'Infraestrutura',
    'about.contactTitle': 'Contato',
    'about.contactP1': 'Você pode me encontrar no',
    'about.contactP2': 'e no',
    'about.contactP3': ', ou assinar o',
    'about.contactP4': 'para novos artigos.',

    // Article Layout
    'article.prev': 'Anterior',
    'article.next': 'Próximo',
    'article.toc': 'Neste artigo',
    'article.readingTime': 'min de leitura',

    // Footer
    'footer.rights': 'Todos os direitos reservados.',
    'footer.rss': 'RSS',

    // 404
    '404.title': 'Página Não Encontrada',
    '404.message': 'A página que você está procurando não existe.',
    '404.returnHome': 'Voltar para o início',
  },
  en: {
    // Navigation
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',
    'nav.about': 'About',

    // Site meta
    'site.title': 'Riquelmy Henrique Silva',
    'site.description': 'Personal site and technical blog covering data science, machine learning, business intelligence, programming, and infrastructure.',

    // Hero
    'hero.greeting': 'Hello, I am',
    'hero.name': 'Riquelmy Henrique Silva',
    'hero.role': 'Data Scientist / AI & Data Engineer / Developer',
    'hero.bio': 'I build data pipelines, production AI systems, train models, craft dashboards, and write about the things I learn along the way. This site is where I share technical articles and project work across data science, AI engineering, machine learning, business intelligence, and infrastructure.',
    'hero.ctaBlog': 'Read the blog',
    'hero.ctaProjects': 'View projects',

    // Sections
    'section.recentArticles': 'Recent Articles',
    'section.featuredProjects': 'Featured Projects',
    'section.viewAll': 'View all',

    // Blog
    'blog.title': 'Blog',
    'blog.desc': 'Technical writing on data science, engineering, and software development.',
    'blog.metaDesc': 'Technical articles on data science, machine learning, business intelligence, programming, and infrastructure.',
    'blog.filterAll': 'All',
    'blog.empty': 'No articles published yet.',

    // Projects
    'projects.title': 'Projects',
    'projects.desc': 'A selection of projects spanning data science, data engineering, business intelligence, and software development.',
    'projects.metaDesc': 'Portfolio of data science, engineering, and development projects.',
    'projects.source': 'Source',
    'projects.live': 'Live',
    'projects.viewDetails': 'View details',
    'projects.backToProjects': 'All projects',
    'projects.featuredBadge': 'Featured',
    'projects.prev': 'Previous project',
    'projects.next': 'Next project',
    'projects.empty': 'No projects published yet.',

    // About
    'about.title': 'About',
    'about.metaDesc': 'Background, skills, and current focus areas.',
    'about.bio1': 'I am a Data Scientist, AI & Data Engineer, and Developer working at the intersection of artificial intelligence, analytics, machine learning, and software engineering. My day-to-day involves building production AI systems, data pipelines, predictive models, and dashboards that turn raw data into actionable insight.',
    'about.bio2': 'I have a strong interest in end-to-end data and AI workflows: from raw ingestion and transformation through to LLM agent deployment, ML models, and visualization. I work primarily with Python for AI engineering and data science, Power BI and Microsoft Fabric for business intelligence, and TypeScript for web development.',
    'about.bio3': 'Outside of work, I maintain a Linux-based development environment, contribute to open-source tooling, and write about the topics I explore on this blog.',
    'about.focusTitle': 'Current Focus',
    'about.focus1': 'Building production AI systems (LLMs, RAG, Agents, Guardrails, and automated Evals)',
    'about.focus2': 'Time series forecasting and demand planning models',
    'about.focus3': 'Building scalable ETL pipelines with modern orchestration',
    'about.focus4': 'Microsoft Fabric adoption and Power BI semantic modeling',
    'about.focus5': 'Technical writing and knowledge sharing',
    'about.skillsTitle': 'Skills',
    'about.skills.ai': 'AI Engineering',
    'about.skills.ds': 'Data Science / ML',
    'about.skills.de': 'Data Engineering',
    'about.skills.bi': 'Business Intelligence',
    'about.skills.prog': 'Programming',
    'about.skills.infra': 'Infrastructure',
    'about.contactTitle': 'Get in Touch',
    'about.contactP1': 'You can find me on',
    'about.contactP2': 'and',
    'about.contactP3': ', or subscribe to the',
    'about.contactP4': 'for new articles.',

    // Article Layout
    'article.prev': 'Previous',
    'article.next': 'Next',
    'article.toc': 'On this page',
    'article.readingTime': 'min read',

    // Footer
    'footer.rights': 'All rights reserved.',
    'footer.rss': 'RSS',

    // 404
    '404.title': 'Page Not Found',
    '404.message': 'The page you are looking for does not exist.',
    '404.returnHome': 'Return home',
  },
} as const;

export type UIKey = keyof typeof ui[typeof defaultLang];
