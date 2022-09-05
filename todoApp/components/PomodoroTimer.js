import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput } from 'react-native';
import Timer from './Timer'

const PomodoroTimer = () => {

	const [workTime, setWorkTime] = useState(20);
	const [breakTime, setBreakTime] = useState(5);
	const [intervalType, setIntervalType] = useState("Working");

	//Timer finish counting down
	const handleTimerCompleted = () => {
		if (intervalType === "Working") {
			setIntervalType("Break")
		} else if(intervalType == "Break"){
			setIntervalType("Working")
		}
	}

	//User change work time
	const handleWorkTime = (text) => {
		if (text >= 0) {
			setWorkTime(text)
		} else {
			alert("Please enter a valid time")
			setWorkTime(20)
		}
	}

	//User change break time
	const handleBreakTime = (text) =>{
		if (text >= 0) {
			setBreakTime(text)
		} else {
			alert("Please enter valid time")
			setBreakTime(5)
		}
	}

	//set the timer time
	const handleTime = () => {
		if(intervalType === "Working") {
			return workTime
		} else if(intervalType === "Break") {
			return breakTime
		}
	}

	let time= handleTime();

	return (
		<View>
			<View style={styles.row}>
				<View style={styles.inputWrap}>
					<Text style={styles.textStyle}>Work (mins)</Text>
					<Text style={styles.textStyle}>Break (mins)</Text>
				</View>
				<View style={styles.inputWrap}>
					<TextInput  
						style={styles.textStyle}  
						keyboardType={"numeric"} 
						defaultValue={''+workTime} 
						placeholder = "enter time" 
						onChangeText={handleWorkTime} />
					<TextInput  
						style={styles.textStyle}  
						keyboardType={"numeric"} 
						defaultValue={''+breakTime} 
						placeholder = "enter time" 
						onChangeText={handleBreakTime} />
				</View>
			</View>
			<Timer
				intervalType={intervalType}
				onComplete={handleTimerCompleted}
				period={time}
			/>
		</View>
	)
	
}

export default PomodoroTimer;

const styles = StyleSheet.create({
   row: {
    flex: 1,
    flexDirection: "row",
  },
  inputWrap: {
    flex: 1,
    borderColor: "#cccccc",
    borderBottomWidth: 1,
    marginBottom: 10
  },
  textStyle: {
    fontSize: 25,
    fontWeight: "500",
    letterSpacing: 1.5,
    marginTop: 40,
    padding: 20
  }
});
