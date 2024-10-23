export const fetchData = async () => {
    try {
      const response = await fetch('https://hiring-api.simbuka.workers.dev/');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  