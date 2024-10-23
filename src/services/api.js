export const fetchAllData = async () => {
  const baseUrl = import.meta.env.VITE_API_URL;
  const url = `${baseUrl}?page=0&size=500`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
