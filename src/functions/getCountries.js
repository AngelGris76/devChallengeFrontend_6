export const getCountries = async (
	countryCodes,
	setGenerate,
	setter,
	signal
) => {
	const countryCodeList = getCountryCodeList(countryCodes);
	const answerList = [];

	for (let index = 0; index < 4; index++) {
		const { error, countryData } = await fetchCountry(
			countryCodeList[index],
			signal
		);
		if (error) {
			if (error === 'abort') return;
			setter({
				error,
				options: [],
			});
			setGenerate(false);
			return;
		}

		answerList.push(countryData);
	}

	setter((prev) => ({ ...prev, options: answerList }));
	setGenerate(false);
};

const fetchCountry = async (countryCode, signal) => {
	const API_URL = `https://restcountries.com/v3.1/alpha/${countryCode}`;

	try {
		const response = await fetch(API_URL, { signal });
		if (!response.ok) throw new Error('Server error');

		const data = await response.json();

		const newCountry = {
			code: countryCode,
			capital: data[0].capital ? data[0].capital[0] : '',
			name: data[0].name.common,
			flag: data[0].flags.svg,
		};

		return { countryData: newCountry };
	} catch (err) {
		if (err.name === 'AbortError') return { error: 'abort' };
		return { error: err.message };
	}
};

const getCountryCodeList = (countryCodes) => {
	const codeList = [];
	let index = 0;
	do {
		const newCode = countryCodes[Math.floor(Math.random() * 250)];
		if (!codeList.includes(newCode)) {
			codeList.push(newCode);
			index++;
		}
	} while (index < 4);
	return codeList;
};
