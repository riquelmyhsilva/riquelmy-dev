import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ id, data }) => !data.draft && id.startsWith('pt/'));
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Riquelmy Henrique Silva',
    description: 'Artigos técnicos sobre ciência de dados, machine learning, business intelligence, programação e infraestrutura.',
    site: context.site!,
    trailingSlash: false,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/blog/${post.id.replace(/^pt\//, '')}`,
    })),
    customData: '<language>pt-br</language>',
  });
}
