const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

async function request(endpoint) {
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
export async function fetchPosts() {
  const json = await request("/posts?populate=*");
  return json.data;
}

export async function fetchPostBySlug(slug) {
  const json = await request(
    `/posts?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`
  );
  return json.data?.[0];
}

/* HOME */
export async function fetchHome() {
  const json = await request("/homes?populate=*");
  return json.data[0];
}