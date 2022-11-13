export const getCountryCodes = async (setter, signal) => {
	const { error, list } = await fetchCountryCodes(signal);
	if (error) return setter({ list: [], error });
	setter([...list]);
};

const fetchCountryCodes = async (signal) => {
	const API_URL = 'https://restcountries.com/v3.1/all';
	try {
		const response = await fetch(API_URL, { signal });
		if (!response.ok) throw new Error('Server error');
		const data = await response.json();

		return { list: data.map((item) => item.cca2) };
	} catch (err) {
		if (err.name === 'AbortError') {
			console.error(err);
			return { list: [] };
		}
		return { error: err.message, list: [] };
	}
};
