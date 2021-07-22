import React from "react";
import {View,Text,TextInput} from "react-native";
import {clone} from "../lib/commons";

const Input = (props) => {
	let newProps = clone(props);

	let style = newProps.style;
	let onChange = newProps.onChange;
	let error = props.error;

	delete newProps.style;
	delete newProps.onChange;
	delete newProps.error;

	return <View>
		<TextInput
			{...newProps}
			style={{
				backgroundColor: '#e0e0e0',
				paddingLeft: 20,
				paddingRight: 20,
				paddingTop: 5,
				paddingBottom: 5,
				borderRadius: 10,
				...style,
			}}
			onChangeText={onChange}
		/>
		{!error ? null :
			<Text style={{
				color: 'red',
				marginLeft: 10,
			}}>
				{error}
			</Text>
		}
	</View>
}

export default Input;