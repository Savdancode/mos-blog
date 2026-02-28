const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_STRAPI_TOKEN;

// src/services/api.js

export async function request(endpoint, options = {}) {
  // ✅ Merging your Token with any other headers (like Content-Type)
  const res = await fetch(`${API_URL}/api${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json", // Required for Strapi POST
      Authorization: `Bearer ${TOKEN}`,
      ...options.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`);
  }

  return res.json();
}

/* POSTS */

// src/services/api.js
export async function fetchPosts(category = "All", search = "", page = 1, pageSize = 6) {
  let url = `/blogs?populate[0]=image&populate[1]=categorie_posts&sort[0]=createdAt:desc`;
  
  // ✅ Add Pagination parameters
  url += `&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  if (category !== "All") {
    url += `&filters[categorie_posts][title][$eq]=${category}`;
  }
  if (search) {
    url += `&filters[title][$containsi]=${search}`;
  }

  const json = await request(url);
  // ✅ Return the full JSON so the component can read meta.pagination
  return json; 
}
// export async function fetchPosts(category = "All", search = "") {
//   let url = "/blogs?populate[0]=image&populate[1]=categorie_posts&sort[0]=createdAt:desc";

//   // ✅ Add Category Filter
//   if (category !== "All") {
//     url += `&filters[categorie_posts][title][$eq]=${category}`;
//   }

//   // ✅ Add Search Filter (filters by title)
//   if (search) {
//     url += `&filters[title][$containsi]=${search}`;
//   }

//   const json = await request(url);
//   return json.data;
// }


export async function fetchCate() {
  const json = await request("/categorie-posts");
  return json.data;
}

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
export async function fetchAbout(id) {
  const json = await request(`/about?populate[0]=tags`);
  return json.data; // Strapi single entry returns the object directly inside data
}
// src/services/api.js

// src/services/api.js
export async function submitContact(formData) {
  // Strapi requires the 'data' wrapper
  const payload = { data: formData };
  
  // ✅ Updated to use request() and the pluralized contact-alerts endpoint
  const json = await request(`/contacts`, {
    method: 'POST',
    body: JSON.stringify(payload),
    // Note: If your request helper doesn't auto-set headers, include them here:
    headers: { 'Content-Type': 'application/json' },
  });

  return json.data; 
}