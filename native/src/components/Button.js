import React from "react";
import {Text,View,ActivityIndicator} from "react-native";

const Input = (props) => {
	let style = {
		backgroundColor: '#2396ed',
		color: 'white',
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 5,
		paddingBottom: 5,
		borderRadius: 10,
		...props.style,
	}
	if (props.loading){
		return <View style={style}>
			<ActivityIndicator color={'#ffffff'}/>
		</View>
	}
	return <Text style={style} onPress={props.onClick}>
		{props.children}
	</Text>
}

export default Input;