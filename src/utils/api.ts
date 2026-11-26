export async function fetchApi<T>(path: string, signal?: AbortSignal, options?: RequestInit): Promise<T> {
  const response = await fetch(`/api/${path}`, { ...options, signal });
  if (response.status === 204) return undefined as T;
  if (!response.headers.get('content-type')?.includes('application/json')) {
    throw new Error('El backend no respondió. Inicia AgroSmart con npm run dev.');
  }
  const payload = await response.json();
  if (!response.ok) throw new Error(payload.message ?? 'No se pudo completar la consulta.');
  return payload;
}
