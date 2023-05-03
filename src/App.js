import jsonServerProvider from "ra-data-json-server";
import { Admin, Resource } from "react-admin";
import { UserCreate, UserEdit, UserList } from "./users/Users";

const dataProvider = jsonServerProvider("http://localhost:8001");

const App = () => (
	<Admin dataProvider={dataProvider}>
		<Resource name="users" list={UserList} create={UserCreate} />
	</Admin>
);

export default App;
