import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const TimerButtons = ({play, pause, reset, running}) => {

	//Prints the buttons
	if (running === true) {
		return (
			<View style={styles.container}>
				<TouchableOpacity style={styles.buttonStyle} onPress={pause}>
					<Text style={styles.buttonText}>Pause</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.buttonStyle} onPress={reset}>
					<Text style={styles.buttonText}>Reset</Text>
				</TouchableOpacity>
			</View>
		)
	} else {
		return(
			<View  style={styles.container}>
				<TouchableOpacity style={styles.buttonStyle} onPress={play}>
					<Text style={styles.buttonText}>Start</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles=StyleSheet.create({
	container:{
		flex: 1,
		flexDirection: "row" ,
		marginLeft: 20,
		justifyContent: 'space-evenly',
		marginBottom: 20
	},
	buttonStyle:{
		alignItems: "center",
		backgroundColor: "black",
		padding: 30,
		flexDirection: "row" ,
		borderRadius: "100%",
	},
	buttonText: {
		color: "white",
	    fontSize: 25,
	    fontWeight: "300",
  	}
})

export default TimerButtons
