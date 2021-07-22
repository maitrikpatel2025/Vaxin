import React, {useState} from "react";
import {POST} from "../../assets/js/request";
import {pages, server} from "../../main/urls";
import toast, {Toaster} from "react-hot-toast";

const Login = (props) => {
	const [email,setEmail] = useState('');
	const [password,setPassword] = useState('');

	function validate() {
		let valid = true;
		if (email===''){
			toast.error('Please enter email');
			valid = false;
		}
		if (password===''){
			toast.error('Please enter password');
			valid = false;
		}
		return valid;
	}

	async function handleLogin(){
		if (!validate())return;
		let response = await POST(server.admin_login,{
			email,
			password
		});
		if (response.isSuccess){
			props.history.push(pages.home);
		}else if (response.code === 103){
			toast.error('account not found!');
		}else if (response.code === 104){
			toast.error('wrong password!');
		}
	}

	return (
		<div className="container ">
			<div className="py-4">
				<Toaster/>
				<h1>Login </h1>
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
						<label htmlFor="exampleInputPassword1">Password</label>
						<input
							onChange={e=>setPassword(e.target.value)}
							type="password"
							className="form-control"
							id="exampleInputPassword1"
						/>
					</div>
					<button type="button" className="btn btn-primary mt-4" onClick={handleLogin}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;