import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import CircularProgressBar from './components/CircularProgressBar';

var destination = document.querySelector('#root');
ReactDOM.render(
    <div>
        <div className="bar-container">
            <CircularProgressBar animationSpeed = {5} textColor= {'#008B8B'} innerStroke= {'#008B8B'} outerStroke = {'#F0F8FF'} initialAnimation = {true} percentage={60}/>
        </div>
    </div>,
     destination);

