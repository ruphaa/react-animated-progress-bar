import React, { Component} from 'react';
import PropTypes from 'prop-types';
import './CircularProgressBar.css';

const MIN_PERCENTAGE = 0;
const MAX_PERCENTAGE = 100;
const MAX_X = 100;
const MAX_Y = 100;
const FULL_RADIUS = 45;
const CENTER_X = 50;
const CENTER_Y = 50;
const ORIGIN_X = 0;
const ORIGIN_Y = 0;

class CircularProgressBar extends Component{
    constructor(props) {
        super(props);
    
        this.state = {
          percentage: props.initialAnimation ? 0 : props.percentage,
        };
      }

      componentDidMount() {
        if (this.props.initialAnimation) {
            console.log(`Initial animation ${this.props.initialAnimation}`);
          this.initialTimeout = setTimeout(() => {
            this.requestAnimationFrame = window.requestAnimationFrame(() => {
              this.setState({
                percentage: this.props.percentage,
              });
            });
          }, 30);
        }
      }
      
      componentWillUnmount() {
        clearTimeout(this.initialTimeout);
        window.cancelAnimationFrame(this.requestAnimationFrame);
      }

    getStrokeStyles(percentage, speed){
        const circumference = 2 * Math.PI * FULL_RADIUS;
        const progress = Math.min(Math.max(this.state.percentage, MIN_PERCENTAGE), MAX_PERCENTAGE) / 100;
        const dashoffset = circumference * (1-progress);
        const dasharray = circumference;
        return {
            strokeDasharray: `${dasharray}px`,
            strokeDashoffset: `${dashoffset}px`,
            transition: `stroke-dashoffset ${speed}s ease 0s`,
        };
    }

    render(){
        const {
            percentage,
            backgroundColor,
            strokeWidth,
            innerStroke,
            textColor,
            outerStroke,
            styles,
            textForPercentage,
            classes,
            animationSpeed,
          } = this.props;
          const text = textForPercentage ? textForPercentage(percentage) : null;
        return(
            <svg className={classes.root}  viewBox={`0 0 ${MAX_X} ${MAX_Y}`}>
                <circle className={classes.outer} cx={CENTER_X} cy={CENTER_Y} r={FULL_RADIUS} stroke={outerStroke} fill="none" strokeWidth={strokeWidth}/>
                <circle className={classes.inner} cx={CENTER_X} cy={CENTER_Y} r={FULL_RADIUS} stroke={innerStroke} fill="none" strokeWidth={strokeWidth} style={Object.assign({}, styles.path, this.getStrokeStyles(percentage, animationSpeed))}/>
                {
                    text ? (
                        <text
                        className={classes.text}
                        x={CENTER_X}
                        y={CENTER_Y}
                        transform={`rotate(90, ${CENTER_X},${CENTER_Y})`}
                        fill={`${textColor}`}
                        >
                        {text}
                        </text>
                    ) : null
                }
            </svg>
        );
    }
}

CircularProgressBar.propTypes = {
    outerStroke: PropTypes.string,
    innerStroke: PropTypes.string,
    textColor: PropTypes.string,
    percentage: PropTypes.number.isRequired,
    className: PropTypes.string,
    classes: PropTypes.objectOf(PropTypes.string),
    styles: PropTypes.objectOf(PropTypes.object),
    strokeWidth: PropTypes.number,
    background: PropTypes.bool,
    backgroundPadding: PropTypes.number,
    initialAnimation: PropTypes.bool,
    counterClockwise: PropTypes.bool,
    animationSpeed: PropTypes.number,
    textForPercentage: PropTypes.func,
  };
CircularProgressBar.defaultProps = {
    strokeWidth: 10,
    outerStroke:'#e6e6e6' ,
    innerStroke: '#f77a52',
    textColor: '#3e98c7',
    className: '',
    classes: {
      root: 'bar',
      outer: 'progress__meter',
      inner: 'progress__value',
      text: 'text',
      background: 'CircularProgressbar-background',
    },
    styles: {
      root: {},
      trail: {},
      path: {},
      text: {},
      background: {},
    },
    background: false,
    backgroundPadding: null,
    initialAnimation: false,
    counterClockwise: false,
    animationSpeed: 2,
    textForPercentage: (percentage) => `${percentage}%`,
  };

export default CircularProgressBar;