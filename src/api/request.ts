export const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(url, { method: 'get', ...options });

  if (!response.ok) {
    console.error('Request failed: ', response);

    throw new Error(response.statusText);
  }
  return (response.json() as any) as T;
};
