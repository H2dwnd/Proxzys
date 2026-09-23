const API_URL = '/api';

export const api = {
  // Auth
  register: async (name: string, password: string) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  login: async (name: string, password: string) => {
    const res = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  // Projects
  getAllProjectStats: async () => {
    const res = await fetch(`${API_URL}/projects`);
    return res.json();
  },

  getProjectStats: async (id: string, token: string | null) => {
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const res = await fetch(`${API_URL}/projects/${id}`, { headers });
    return res.json();
  },

  viewProject: async (id: string) => {
    await fetch(`${API_URL}/projects/${id}/view`, { method: 'POST' });
  },

  likeProject: async (id: string, token: string) => {
    const res = await fetch(`${API_URL}/projects/${id}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  // Comments
  getComments: async (id: string) => {
    const res = await fetch(`${API_URL}/projects/${id}/comments`);
    return res.json();
  },

  addComment: async (id: string, token: string, text: string) => {
    const res = await fetch(`${API_URL}/projects/${id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ text })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  // Admin
  getDynamicProjects: async () => {
    const res = await fetch(`${API_URL}/admin/projects`);
    return res.json();
  },

  addDynamicProject: async (token: string, formData: FormData) => {
    const res = await fetch(`${API_URL}/admin/projects`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` },
      body: formData
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  },

  deleteDynamicProject: async (token: string, id: string) => {
    const res = await fetch(`${API_URL}/admin/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data;
  }
};
