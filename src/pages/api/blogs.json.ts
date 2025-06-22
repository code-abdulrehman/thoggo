import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  try {
    const posts = await getCollection('blog');
    
    const blogData = posts.map(post => ({
      id: post.id,
      title: post.data.title,
      summary: post.data.description || '',
      content: post.body || '',
      link: `/blog/${post.id}`,
      url: `/blog/${post.id}`,
      pubDate: post.data.pubDate,
      updatedDate: post.data.updatedDate,
      heroImage: post.data.heroImage
    }));

    return new Response(JSON.stringify(blogData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch blog posts' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}; 