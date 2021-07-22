import React, {Component} from 'react';
import Navbar from "../pages/navigation";

class AppContainer extends Component {
	render() {
		return (
			<div>
				<Navbar/>
				{this.props.children}
			</div>
		);
	}
}

export default AppContainer;