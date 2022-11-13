import { useEffect, useMemo, useState } from 'react';
import INITIAL_ANSWERS from '../constants/initialAnswers';
import getAnswers from '../libs/getAnswers';

const useAnswer = (countryCodes) => {
	const [answers, setAnswers] = useState(INITIAL_ANSWERS);
	const [loadingAnswer, setLoadingAnswer] = useState(true);

	useEffect(() => {
		if (!loadingAnswer) return;
		const controller = new AbortController();
		getAnswers(countryCodes, setAnswers, setLoadingAnswer, controller.signal);

		return () => controller.abort();
	}, [countryCodes, loadingAnswer]);

	const correctAnswer = useMemo(() => {
		return Math.floor(Math.random() * answers.list.length);
	}, [answers]);

	const isFlagQuestion = useMemo(() => {
		if (!answers.list.length) return;
		if (!answers.list[correctAnswer].capital) return true;
		return Math.random() > 0.5;
	}, [answers, correctAnswer]);

	return {
		correctAnswer,
		isFlagQuestion,
		answers,
		loadingAnswer,
		setLoadingAnswer,
	};
};

export default useAnswer;
