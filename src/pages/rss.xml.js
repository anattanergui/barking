import rss from '@astrojs/rss';
import { getAllPoems } from '../lib/poems.js';

export function GET(context) {
  const poems = getAllPoems();

  return rss({
    title: 'Barking',
    description: 'A collection of sounds and sentences — organised in different ways. Essentially no different from barkings of a dog.',
    site: context.site,
    items: poems.map(poem => ({
      title: poem.title,
      link: `/poem/${poem.slug}/`,
      description: poem.preview || poem.title,
    })),
    customData: `<language>en-us</language>`,
  });
}
