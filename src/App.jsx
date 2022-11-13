import { useState, useEffect } from 'react';
import QuizSection from './components/QuizSection';
import ResultSection from './components/ResultSection';
import INITIAL_POINTS_COUTNER from './constants/initialPointsCounter';
import { getCountryCodes } from './functions/getCountryCodes';
import style from './App.module.css';

const App = () => {
	const [pointsCounter, setPoinstCounter] = useState(INITIAL_POINTS_COUTNER);
	const [countryCodes, setCountryCodes] = useState([]);

	const incrementPoints = () =>
		setPoinstCounter({ ...pointsCounter, value: pointsCounter.value + 1 });
	const stopPointsCounter = () =>
		setPoinstCounter({ ...pointsCounter, running: false });
	const resetPointsCounter = () =>
		setPoinstCounter({ value: 0, running: true });

	useEffect(() => {
		const controller = new AbortController();
		getCountryCodes(setCountryCodes, controller.signal);
		return () => controller.abort();
	}, []);

	if (!countryCodes.length) return <p>Loading App</p>;

	return (
		<div>
			<h2 className={style.title}>country quiz</h2>
			{pointsCounter.running && (
				<QuizSection
					countryCodes={countryCodes}
					incrementPoints={incrementPoints}
					stopPointsCounter={stopPointsCounter}
				/>
			)}
			{!pointsCounter.running && (
				<ResultSection
					points={pointsCounter.value}
					resetPointsCounter={resetPointsCounter}
				/>
			)}
		</div>
	);
};

export default App;
