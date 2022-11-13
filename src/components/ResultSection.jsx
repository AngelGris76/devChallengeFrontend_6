import style from './ResultSection.module.css';

const ResultSection = ({ points, resetPointsCounter }) => {
	return (
		<div className={style.resultContainer}>
			<img src='assets/images/undraw_winners_ao2o 2.svg' alt='' />
			<div className={style.infoContainer}>
				<h2 className={style.title}>Results</h2>
				<p>
					you got
					<span className={style.points}> {points} </span>
					correct answers
				</p>
			</div>
			<button className={style.tryAgainButton} onClick={resetPointsCounter}>
				Try again
			</button>
		</div>
	);
};

export default ResultSection;
