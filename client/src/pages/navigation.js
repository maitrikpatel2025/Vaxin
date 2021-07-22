import React  from "react";
import {Link, NavLink, withRouter} from "react-router-dom";
import {Cookies} from "react-cookie";
import {pages, server} from "../main/urls";
import {POST} from "../assets/js/request";
class Navbar extends React.Component{

	constructor(props){
		super(props);

		this.state = {
			active: false,
		}
	}
	handleToggle = () => {
		this.setState({
			active: !this.state.active
		})
	};
	logout = async ()=>{
		let response = await POST(server.admin_logout);
		if (response.isSuccess){
			this.props.history.push(pages.login);
		}
	}

	render() {
		let loggedIn = !!new Cookies().get('admin')
		return (
			<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
				<div className="container">
					<Link className="navbar-brand" to={pages.about}>
						Covid Vaccination Center
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						onClick={this.handleToggle}
					>
						<span className="navbar-toggle-icon"/>
					</button>

					<div className={this.state.active ? "collapse navbar-collapse " : "collapse navbar-collapse show"}>
						<ul className="navbar-nav mr-auto">
							{
								loggedIn?
									<li className="nav-item">
										<NavLink className="nav-link" exact to={pages.home}>
											vaccinated people List
										</NavLink>
									</li>:<div/>
							}
							{
								loggedIn?
									<li className="nav-item">
										<NavLink className="nav-link" exact to={pages.viewers}>
											vaccinated people Viewer
										</NavLink>
									</li>:<div/>
							}
							<li className="nav-item">
								<NavLink className="nav-link" exact to={pages.about}>
									About
								</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" exact to={pages.login}>
								</NavLink>
							</li>
						</ul>
						{
							loggedIn?
								<div>
									<button className="btn btn-outline-light" onClick={()=>this.props.history.push(pages.add_user())} >Add people </button>
									&nbsp;
									<button className="btn btn-outline-light" onClick={this.logout}>Logout </button>
								</div>
								:<Link className="btn btn-outline-light" to={pages.login}>login</Link>
						}
					</div>
				</div>
			</nav>
		);
	}
};

export default withRouter(Navbar);