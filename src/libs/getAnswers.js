import fetchAnswerOptions from './fetchAnswerOptions';
import getIndexList from './getIndexList';

const ANSWER_QUANTITY = 4;

const getAnswers = async (countryCodes, setter, setLoading, signal) => {
	const indexList = getIndexList(countryCodes, ANSWER_QUANTITY);
	const answersCode = indexList.map((index) => countryCodes[index]);

	const answers = [];

	for (let index = 0; index < ANSWER_QUANTITY; index++) {
		const { error, data } = await fetchAnswerOptions(
			answersCode[index],
			signal
		);

		if (error) {
			if (error === 'abort') return;
			setter({ list: [], error });
			setLoading(false);
			return;
		}
		answers.push({ ...data });
	}

	setter({ list: answers, error: null });
	setLoading(false);
};

export default getAnswers;
