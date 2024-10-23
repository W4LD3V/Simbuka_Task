export const fetchData = async () => {
  const CACHE_KEY = 'fetchedData';
  const CACHE_EXPIRATION_KEY = 'fetchedDataExpiration';
  const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  const currentTime = new Date().getTime();

  // Check if data exists in localStorage
  const cachedData = localStorage.getItem(CACHE_KEY);
  const cachedExpiration = localStorage.getItem(CACHE_EXPIRATION_KEY);

  // If cached data exists and is not expired, return the cached data
  if (cachedData && cachedExpiration && currentTime < Number(cachedExpiration)) {
    return JSON.parse(cachedData);
  }

  // If no valid cached data exists, fetch new data
  try {
    const response = await fetch('https://hiring-api.simbuka.workers.dev/');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();

    // Store the fetched data in localStorage including expiration time
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_EXPIRATION_KEY, (currentTime + CACHE_DURATION).toString());

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
