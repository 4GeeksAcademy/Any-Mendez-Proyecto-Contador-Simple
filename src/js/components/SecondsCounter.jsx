import React, { useState, useEffect, useRef } from 'react';

const SecondsCounter = () => {
	const [time, setTime] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	const [isCountdown, setIsCountdown] = useState(false);
	const [initialTime, setInitialTime] = useState(0);
	const [alertTime, setAlertTime] = useState('');
	const intervalRef = useRef(null);

	useEffect(() => {
		if (isRunning && isCountdown) {
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => prevTime > 0 ? prevTime - 1 : 0);
			}, 1000);
		} else if (isRunning && !isCountdown) {
			intervalRef.current = setInterval(() => {
				setTime((prevTime) => prevTime + 1);
			}, 1000);
		} else {
			clearInterval(intervalRef.current);
		}

		return () => clearInterval(intervalRef.current);
	}, [isRunning, isCountdown]);

	useEffect(() => {
		if (isCountdown && time === 0 && isRunning) {
			setIsRunning(false);
			alert('¡La cuenta regresiva ha terminado!');
		}
	}, [isCountdown, time, isRunning]);

	useEffect(() => {
		if (alertTime !== '' && !isCountdown && String(time) === alertTime && isRunning) {
			alert(`¡Has alcanzado el tiempo de alerta: ${alertTime} segundos!`);
		}
	}, [alertTime, time, isRunning, isCountdown]);

	const handleStart = () => {
		setIsRunning(true);
	};

	const handlePause = () => {
		setIsRunning(false);
	};

	const handleReset = () => {
		setIsRunning(false);
		setTime(isCountdown ? initialTime : 0);
	};

	const handleSetCountdown = () => {
		const inputTime = parseInt(prompt('Ingresa el tiempo de cuenta regresiva en segundos:', initialTime), 10);
		if (!isNaN(inputTime) && inputTime >= 0) {
			setIsCountdown(true);
			setInitialTime(inputTime);
			setTime(inputTime);
			setIsRunning(false);
		} else {
			alert('Por favor, ingresa un número válido para la cuenta regresiva.');
		}
	};

	const handleSetTimer = () => {
		setIsCountdown(false);
		setTime(0);
		setInitialTime(0);
		setIsRunning(false);
	};

	const handleSetAlertTime = () => {
		const inputAlertTime = prompt('Ingresa el tiempo en segundos para la alerta:', alertTime);
		setAlertTime(inputAlertTime === null ? '' : inputAlertTime);
	};

	const displayTime = String(time).padStart(6, '0');
	const digits = displayTime.split('');

	return (
		<div className="">
			<div className="d-flex align-items-center bg-dark rounded p-5 m-5">
				<div className="bg-info align-items-center rounded-sm text-white px-3 py-3 me-2">
					<i className="far fa-clock fa-lg"></i>
				</div>
				{digits.map((digit, index) => (
					<div key={index} className="bg-info align-items-center rounded-sm text-white px-3 py-3 me-1">
						<span className="fw-bold">{digit}</span>
					</div>
				))}
				<div className="d-flex ms-5">
					<button className="btn btn-info me-2" onClick={isRunning ? handlePause : handleStart}>
						<i className={isRunning ? "fas fa-pause-circle" : "fas fa-play-circle"}>{isRunning ? 'Pausar' : 'Iniciar'}</i>
					</button>
					<button className="btn btn-info me-2" onClick={handleReset}>
						<i className="fas fa-undo">Reiniciar</i>
					</button>
					<button className="btn btn-info" onClick={handlePause} disabled={!isRunning}>
						<i className="fas fa-stop-circle">Parar</i>
					</button>
				</div>
			</div>
			<div className="d-flex justify-content-center mt-3">
				<button className="btn btn-info me-2" onClick={handleSetTimer}>
					Usar como Contador
				</button>
				<button className="btn btn-info me-2" onClick={handleSetCountdown}>
					Usar como Cuenta Regresiva
				</button>
				{!isCountdown && (
					<button className="btn btn-info" onClick={handleSetAlertTime}>
						Establecer Alerta ({alertTime || 'Ninguna'})
					</button>
				)}
			</div>
		</div>
	);
};

export default SecondsCounter;