const getIndexList = (countryList, maxIndex) => {
	const countryIndexs = [];
	let index = 0;
	do {
		const actualIndex = Math.floor(Math.random() * countryList.length);
		if (!countryIndexs.includes(actualIndex)) {
			countryIndexs.push(actualIndex);
			index++;
		}
	} while (index < maxIndex);

	return countryIndexs;
};

export default getIndexList;
