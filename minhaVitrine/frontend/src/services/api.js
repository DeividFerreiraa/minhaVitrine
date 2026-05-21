const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://10.0.2.2:8080/api';

async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export const AuthAPI = {
  login: (email, senha) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, senha }) }),
  registro: (dados) => request('/auth/registro', { method: 'POST', body: JSON.stringify(dados) }),
};

export const CategoriasAPI = {
  listar: () => request('/categorias'),
};

export const PrestadoresAPI = {
  listar: (params = '') => request(`/prestadores?${params}`),
  buscar: (id) => request(`/prestadores/${id}`),
  porCategoria: (catId) => request(`/prestadores/categoria/${catId}`),
};

export const SolicitacoesAPI = {
  criar: (dados) => request('/solicitacoes', { method: 'POST', body: JSON.stringify(dados) }),
  minhas: (userId) => request(`/solicitacoes/cliente/${userId}`),
  recebidas: (prestId) => request(`/solicitacoes/prestador/${prestId}`),
  atualizar: (id, status) => request(`/solicitacoes/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};
