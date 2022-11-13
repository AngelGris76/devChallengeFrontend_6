import style from './Spinner.module.css';

const Spinner = () => {
	return (
		<div className={style.spinnerContainer}>
			<img
				className={style.icon}
				src='assets/images/undraw_adventure_4hum 1.svg'
				alt=''
			/>
			<div className={style.spinner}></div>
		</div>
	);
};

export default Spinner;
