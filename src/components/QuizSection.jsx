import { useEffect, useState } from 'react';
import useAnswer from '../hooks/useAnswer';
import AnswerOption from './AnswerOption';
import style from './QuizSection.module.css';
import Spinner from './Spinner';

const QuizSection = ({ countryCodes, incrementPoints, stopPointsCounter }) => {
	const [selectedChoice, setSelectedChoice] = useState(null);
	const [next, setNext] = useState(false);
	const {
		correctAnswer,
		isFlagQuestion,
		answers,
		loadingAnswer,
		setLoadingAnswer,
	} = useAnswer(countryCodes);

	useEffect(() => {
		if (selectedChoice === null) return;
		if (selectedChoice === correctAnswer) return setNext(true);
		const timeoutID = setTimeout(() => {
			stopPointsCounter();
		}, 3000);
		return () => clearTimeout(timeoutID);
	}, [selectedChoice, correctAnswer, stopPointsCounter]);

	if (loadingAnswer) return <Spinner />;

	const renderChoices = getChoicesToRender(
		answers.list,
		selectedChoice,
		correctAnswer,
		setSelectedChoice
	);

	return (
		<div className={style.quizContainer}>
			<img
				className={style.icon}
				src='assets/images/undraw_adventure_4hum 1.svg'
				alt=''
			/>
			{isFlagQuestion && (
				<div className={style.question}>
					<div className={style.flagContainer}>
						<img
							className={style.countryFlag}
							src={answers.list[correctAnswer].flag}
							alt='country flag'
						/>
					</div>
					<p>Which country does this flag belong to?</p>
				</div>
			)}
			{!isFlagQuestion && (
				<p className={style.question}>
					{answers.list[correctAnswer].capital} is the capital of
				</p>
			)}
			<ul className={style.answerOptions}>{renderChoices}</ul>
			{next && (
				<button
					className={style.nextButton}
					onClick={() => {
						setNext(false);
						setSelectedChoice(null);
						incrementPoints();
						setLoadingAnswer(true);
					}}
				>
					next
				</button>
			)}
		</div>
	);
};

const getChoicesToRender = (
	options,
	selectedChoice,
	correctAnswer,
	setSelectedChoice
) => {
	if (!options.length) return;
	const rendered = options.map((option, index) => (
		<AnswerOption
			key={index}
			index={index}
			name={option.name}
			selectedChoice={selectedChoice}
			correctAnswer={correctAnswer}
			setter={setSelectedChoice}
		/>
	));
	return rendered;
};

export default QuizSection;
