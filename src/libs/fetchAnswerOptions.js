const fetchAnswerOptions = async (countryCode, signal) => {
	const COUNTRY_URL = `https://restcountries.com/v3.1/alpha/${countryCode}`;

	try {
		const response = await fetch(COUNTRY_URL, { signal });

		if (!response.ok) throw new Error('Server Error');
		const data = await response.json();

		const capital = data[0].capital ? data[0].capital[0] : null;

		const countryData = {
			code: data[0].cca2,
			name: data[0].name.common,
			capital,
			flag: data[0].flags.svg,
		};

		return { error: null, data: countryData };
	} catch (err) {
		if (err.name === 'AbortError') return { error: 'abort' };
	}
};

export default fetchAnswerOptions;
