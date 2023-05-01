import * as React from "react";
import { Admin, Resource } from "react-admin";
import { UserList, UserCreate, UserEdit } from "./components/users";
import dataProvider from "./data-provider";

const App = () => (
	<Admin dataProvider={dataProvider}>
		<Resource
			name="users"
			list={UserList}
			create={UserCreate}
			edit={UserEdit}
		/>
	</Admin>
);

export default App;
