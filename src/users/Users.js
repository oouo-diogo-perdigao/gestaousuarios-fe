import {
	Create,
	Datagrid,
	DeleteButton,
	Edit,
	EditButton,
	EmailField,
	List,
	PasswordInput,
	SimpleForm,
	TextField,
	TextInput,
} from "react-admin";

export const UserList = (data) => {
	return (
		<List>
			<Datagrid data={data.data} rowClick="edit">
				<TextField source="id" />
				<TextField source="name" />
				<EmailField source="email" />
				<TextField source="password" />
				<EditButton basePath="/post" />
				<DeleteButton basePath="/post" />
			</Datagrid>
		</List>
	);
};

export const UserCreate = () => {
	return (
		<Create>
			<SimpleForm>
				<TextInput source="name" />
				<TextInput source="email" />
				<PasswordInput source="password" />
			</SimpleForm>
		</Create>
	);
};

export const UserEdit = () => {
	return (
		<Edit>
			<SimpleForm>
				<TextInput source="name" />
				<TextInput source="email" />
				<PasswordInput source="password" />
			</SimpleForm>
		</Edit>
	);
};
