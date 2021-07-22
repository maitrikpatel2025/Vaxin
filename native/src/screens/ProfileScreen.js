import React, {useState} from 'react';
import {Text, View} from "react-native";
import {POST} from "../lib/request";
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import {PROD_WEB_URL,DEV_WEB_URL} from '@env';

let appUrl;
if (process.env.NODE_ENV === 'production'){
	appUrl = PROD_WEB_URL
}else{
	appUrl = DEV_WEB_URL
}

const DataRow = (props)=>{
	return <View style={{
		margin: 10
	}}>
		<Text style={{
			color: '#707070'
		}}>
			{props.title}
		</Text>
		<Text>{props.value}</Text>
		<View style={{
			marginTop: 5,
			height: 2,
			backgroundColor: '#d0d0d0',
		}}/>
	</View>
}
const ProfileScreen = (props)=>{
	const [data,setData] = useState({});

	async function fetchData(user_id) {
		let response = await POST('/users/get_details',{user_id});
		console.log(response);

		if (response.code !== 200){
			AsyncStorage.removeItem('user');
			props.navigation.navigate('Login');
		}else{
			setData(response.data);
		}
	}
	AsyncStorage.getItem('user').then(async v=>{
		await fetchData(v);
	});

	return <View>
		<View style={{
			paddingTop: 50,
			paddingBottom: 50,
			display:'flex',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#2396ed',
		}}>
			<QRCode value={appUrl +'/user-status/'+ data.created_at}/>
		</View>
		<DataRow title={"Name"} value={data.first_name+' '+data.last_name}/>
		<DataRow title={"Email"} value={data.email}/>
		<DataRow title={"Vaccine"} value={data.vaccine}/>
		<DataRow title={"Lot Number"} value={data.lot_number}/>
		<DataRow title={"Manufacturer"} value={data.manufacturer}/>
	</View>
}

export default ProfileScreen;