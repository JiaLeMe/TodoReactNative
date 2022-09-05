import React from 'react';
import {View} from 'react-native';
import TimerDisplay from './TimerDisplay'
import TimerButtons from './TimerButtons'
import {Vibration} from 'react-native'

class Timer extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			running: false,
			time: this.props.period * 60
		}
	}

	//Called when props arrive from parent component
	UNSAFE_componentWillReceiveProps(nextProps) {
    	this.setState({ running: false, time: nextProps.period * 60 });
		if(this.state.running === true && this.state.time == 0) {
			this.handlePlay()
		}
	  }

	//Called after update
	componentDidUpdate() {
		if (this.state.running === true && this.state.time == 0) {
			clearInterval(this.timerId)
			Vibration.vibrate([500, 500, 500])
			this.props.onComplete()
		} else if (this.state.running === false) {
			clearInterval(this.timerId)
		}
	}

	//Play button
 	handlePlay = () => {
		this.setState({
			running: true
		})
		this.timerId = setInterval(() => {
			this.setState({
				time: this.state.time - 1
			})
		}, 1000)
	}

	//Pause button
	handlePause = () => {
		clearInterval(this.timerId)
		this.setState({
			running: false
		})
	}

	//Reset button
	handleReset = () => {
		clearInterval(this.timerId)
		this.setState({
			running: false,
			time: this.props.period * 60
		})
	}

	render() {
		return (
			<View>
				<TimerDisplay
					time={this.state.time}
				/>
				<TimerButtons
					play={this.handlePlay}
					pause={this.handlePause}
					reset={this.handleReset}
					running={this.state.running}
				/>
			</View>
		)
	}
}

export default Timer;
