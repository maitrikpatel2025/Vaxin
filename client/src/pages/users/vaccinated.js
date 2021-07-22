import {Component} from "react";
import {withRouter} from "react-router-dom";
import {POST} from "../../assets/js/request";

class Vaccinated extends Component{
	constructor(props) {
		super(props);

		this.state = {
			id: this.props.match.params.user_id,
			data: {},
		}
	}
	fetchStatus = async ()=>{
		let response = await POST('users/status',{
			user_id: this.state.id
		});
		if (response.code === 200){
			this.setState({
				data: response.data,
			})
		}
	}
	componentDidMount() {
		this.fetchStatus();
	}
	render() {
		return (
			<div>
				{this.state.data.vaccine}
			</div>
		);
	}
}
export default withRouter(Vaccinated);