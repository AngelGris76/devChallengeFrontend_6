import { useState } from 'react';
import CorrectIcon from './icons/CorrectIcon';
import FailIcon from './icons/FailIcon';
import style from './AnswerOption.module.css';

const INITIAL_CODE = 65;

const AnswerOption = ({
	name,
	index,
	selectedChoice,
	correctAnswer,
	setter,
}) => {
	const [pressed, setPressed] = useState(false);

	let pressedClass = '';
	let Icon = null;

	if (selectedChoice !== null) {
		if (pressed) {
			if (selectedChoice === correctAnswer) {
				pressedClass = style.correctAnswer;
				Icon = CorrectIcon;
			} else {
				pressedClass = style.wrongAnswer;
				Icon = FailIcon;
			}
		} else {
			if (index === correctAnswer) {
				pressedClass = style.correctAnswer;
				Icon = CorrectIcon;
			}
		}
	}

	const option = String.fromCharCode(INITIAL_CODE + index);

	return (
		<li className={`${style.answerItem}`}>
			<button
				className={`${style.button} ${pressedClass}`}
				aria-pressed={pressed}
				onClick={() => {
					setPressed(true);
					setter(index);
				}}
			>
				<span>{option}</span>
				<span className={style.answerText}>{name}</span>
				{Icon && <Icon className={style.answerIcon} width='1.5rem' />}
			</button>
		</li>
	);
};

export default AnswerOption;
