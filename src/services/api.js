const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

export async function request(endpoint) {
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}

/* POSTS */

// Fetches all posts sorted by newest first
export async function fetchPosts() {
  const json = await request("/blogs?populate[0]=image&populate[1]=categorie_posts&sort[0]=createdAt:desc");
  return json.data;
}

// FIXED: Changed from fetchPostBySlug to fetchPostById
// This matches your router-link :to="/blog/${post.documentId}"
export async function fetchPostById(id) {
  const json = await request(`/blogs/${id}?populate=*`);
  return json.data; // Strapi single entry returns the object directly inside data
}

/* HOME */

// Fetches the Home single type with deep population for skills, slogans, and popular blogs
export async function fetchHome() {
  const query = [
    "populate[home_skills][populate]=*",
    "populate[slogan][populate]=*",
    "populate[popular_blogs][populate][categorie_posts][populate]=*",
    "populate[popular_blogs][populate][image][populate]=*"
  ].join("&");

  const json = await request(`/home?${query}`);
  return json.data;
}