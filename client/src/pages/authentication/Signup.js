import React, {useState} from "react";
import {POST} from "../../assets/js/request";
import {pages, server} from "../../main/urls";
import toast, {Toaster} from "react-hot-toast";
import {useCookies} from "react-cookie";

const Signup = (props) => {
	const [email,setEmail] = useState('');
	const [name,setName] = useState('');
	const [username,setUsername] = useState('');
	const [password,setPassword] = useState('');

	const [cookies,,] = useCookies();
	if (cookies.admin){
		props.history.push(pages.home);
	}

	async function validate() {
		let valid = true;
		if (email===''){
			toast.error('Please enter email');
			valid = false;
		}
		if (name===''){
			toast.error('Please enter full name');
			valid = false;
		}
		if (username===''){
			toast.error('Please enter username');
			valid = false;
		}
		if (password===''){
			toast.error('Please enter password');
			valid = false;
		}
		let response = await POST(server.admin_check_unique,{email});
		if (response.code === 101){
			toast.error('Email already used');
			valid = false;
		}else{
			response = await POST(server.admin_check_unique,{username});
			if (response.code === 101){
				toast.error('Username already used');
				valid = false;
			}
		}

		return valid;
	}

	async function handleSignup(){
		if (!await validate())return;
		let response = await POST(server.admin_signup,{
			email,
			name,
			username,
			password
		});
		if (response.isSuccess){
			props.history.push(pages.home);
		}
	}

	return (
		<div className="container">
			<div className="py-4">
				<Toaster/>
				<h1>Signup </h1>
				<form>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">Email address</label>
						<input
							onChange={e=>setEmail(e.target.value)}
							type="email"
							className="form-control"
							id="exampleInputEmail1"
							aria-describedby="emailHelp"
						/>
						<small id="emailHelp" className="form-text text-muted">
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">Full Name</label>
						<input onChange={e=>setName(e.target.value)}
							   type="text"
							   className="form-control"
							   id="exampleInputEmail1"
							   aria-describedby="emailHelp"
						/>
						<small id="emailHelp" className="form-text text-muted">
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputEmail1">User Name</label>
						<input onChange={e=>setUsername(e.target.value)}
							   type="text"
							   className="form-control"
							   id="exampleInputEmail1"
							   aria-describedby="emailHelp"
						/>
						<small id="emailHelp" className="form-text text-muted">
							We'll never share your email with anyone else.
						</small>
					</div>
					<div className="form-group">
						<label htmlFor="exampleInputPassword1">Password</label>
						<input
							onChange={e=>setPassword(e.target.value)}
							type="password"
							className="form-control"
							id="exampleInputPassword1"
						/>
					</div>
					<div className="form-group form-check">
						<input
							type="checkbox"
							className="form-check-input"
							id="exampleCheck1"
						/>
						<label className="form-check-label" htmlFor="exampleCheck1">
							Check me out
						</label>
					</div>
					<button type="button" className="btn btn-primary" onClick={handleSignup}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;