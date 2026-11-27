import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog', ({ id, data }) => !data.draft && id.startsWith('en/'));
  const sorted = posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'Riquelmy Henrique Silva',
    description: 'Technical articles on data science, machine learning, business intelligence, programming, and infrastructure.',
    site: new URL('/en', context.site!),
    trailingSlash: false,
    items: sorted.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/en/blog/${post.id.replace(/^en\//, '')}`,
    })),
    customData: '<language>en-us</language>',
  });
}
