import Signup from "../pages/authentication/Signup";
import Login from "../pages/authentication/Login";
import Home from "../pages/home/Home";
import AddUser from "../pages/users/AddUser";
import About from "../pages/About";
import Vaccinated from "../pages/users/vaccinated";
import Viewers from "../pages/users/Viewers";

let routes = {
	'/about':About,
	'/login': Login,
	'/signup': Signup,
	'/home': Home,
	'/users/add/:user_id': AddUser,
	'/users/add': AddUser,
	'/user-status/:user_id': Vaccinated,
	'/viewers': Viewers,
}
export default routes;