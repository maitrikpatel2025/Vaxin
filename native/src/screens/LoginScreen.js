import React, {useState} from 'react';
import {Text, View} from "react-native";
import Input from "../components/Input";
import Button from "../components/Button";
import {POST} from "../lib/request";
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setLoading] = useState(false);
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);

	AsyncStorage.getItem('user').then((v) => {
		if (v) props.navigation.navigate('Profile');
	});

	function setupUser(id) {
		AsyncStorage.setItem('user', ''+id);
		props.navigation.navigate('Profile');
	}

	async function handleLogin() {
		setLoading(true);
		let response = await POST('/auth/user_login', {
			email, password
		});
		setLoading(false);
		let emailError = null;
		let passwordError = null;
		if (response.code === 203) {
			emailError = 'Account not found';
		} else if (response.code === 204) {
			passwordError = 'Wrong password';
		} else if (response.code === 200) {
			setupUser(response.id);
		} else {
			console.log("LoginScreen.js>22", response);
		}
		setEmailError(emailError);
		setPasswordError(passwordError);
	}

	return <View style={{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		flex: 1
	}}>
		<Text style={{
			fontSize: 30,
			marginTop: 50,
		}}>
			Hello
		</Text>
		<View style={{
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
		}}>
			<Input
				error={emailError}
				onChange={e => setEmail(e)}
				style={{minWidth: 250}}
				placeholder={"Email Address"}/>
			<Input
				error={passwordError}
				onChange={e => setPassword(e)}
				style={{
					minWidth: 250,
					marginTop: 20,
				}}
				placeholder={"Password"}/>
			<Button
				loading={isLoading}
				onClick={handleLogin}
				style={{
					marginTop: 20,
				}}>
				Login
			</Button>
		</View>
	</View>
}

export default LoginScreen;