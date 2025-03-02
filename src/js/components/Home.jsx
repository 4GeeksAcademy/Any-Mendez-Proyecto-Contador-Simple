import React from "react";
import ReactDOM from 'react-dom/client';
import {useState} from "react";

//create your first component
const Home = () => {
	const [props,setProps] = useState({
		digitUno : 0,
		digitDos : 0,
		digitTres : 0,
		digitCuatro : 0,
		digitCinco : 0,
		digitSeis : 0,
	});
	let counter=0;
	
	setInterval(function(){
		setProps({ ...props, digitSeis : Math.floor(counter/1000000)});
		setProps({ ...props, digitCinco : Math.floor(counter/100000)});
		setProps({ ...props, digitCuatro : Math.floor(counter/10000)});
		setProps({ ...props, digitTres : Math.floor(counter/1000)});
		setProps({ ...props, digitDos : Math.floor(counter/100)});
		setProps({ ...props, digitUno : Math.floor(counter/10)});
		counter++;
	}, 100);



		return (
			<div className="bigCounter d-inline-block fs-20">
				<div className="calendar">
					<i className="far fa-clock"></i>
				</div>
				<div className="seis">{props.digitSeis}</div>
				<div className="cinco">{props.digitCinco}</div>
				<div className="cuatro">{props.digitCuatro}</div>
				<div className="tres">{props.digitTres}</div>
				<div className="dos">{props.digitDos}</div>
				<div className="uno">{props.digitUno}</div>
			</div>
		);

};

export default Home;