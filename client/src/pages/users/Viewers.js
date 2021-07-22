import React,{useEffect, useState} from 'react';
import {POST} from "../../assets/js/request";
import {pages, server} from "../../main/urls";
import {isEmptyObject} from "../../assets/js/commons";
import {useCookies} from "react-cookie";
import dateFormat from 'dateformat';

const Viewers = (props)=>{
	const [cookies,,] = useCookies();
	if (!cookies.admin){
		props.history.push(pages.login);
	}

	const [users,setUsers] = useState([]);
	async function fetchUsers(){
		let response = await POST(server.viewer_list);

		if(response.isSuccess){
			setUsers(response.list);
		}
	}

	useEffect(()=>{
		if (isEmptyObject(users)){
			fetchUsers();
		}
	},[users])

	// async function handleDelete(_id) {
	// 	let response = await POST(server.delete_user,{_id});
	// 	if (response.isSuccess){
	// 		setUsers(users.filter(o=>o._id!==_id));
	// 	}
	// }

	return (
		<div className="container">
			<div className="py-4">
				<h1>Viewers Page</h1>
				<table className="border shadow">
					<thead className="thead-dark">
					<tr>
						<th scope="col">#</th>
						<th scope="col">Time</th>
						<th scope="col">IP</th>
						<th scope="col">Name</th>
					</tr>
					</thead>
					<tbody>
					{
						users.map((user, index) => {
							let userData = user.User && user.User.length > 0 ? user.User[0] : {}
							return <tr key={index}>
								<th scope="row">{index + 1}</th>
								<td>{dateFormat(user.timestamp, 'dd mmm yyyy hh:MM TT')}</td>
								<td>{user.ip}</td>
								<td>{userData.first_name}</td>
							</tr>
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Viewers;