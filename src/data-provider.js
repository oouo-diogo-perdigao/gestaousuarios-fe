import { fetchUtils } from "react-admin";
import { stringify } from "query-string";
import { apiUrl } from "./config";

const dataProvider = {
	getList: async (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify(params.filter),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		const { json } = await fetchUtils.fetchJson(url);
		return {
			data: json,
			total: parseInt(json.length, 10),
		};
	},

	// Implemente os demais métodos: getOne, getMany, getManyReference, create, update, updateMany, delete e deleteMany
	getOne: async (resource, params) => {
		const url = `${apiUrl}/${resource}/${params.id}`;
		const { json } = await fetchUtils.fetchJson(url);
		return { data: json };
	},

	getMany: async (resource, params) => {
		const url = `${apiUrl}/${resource}?${stringify({
			filter: JSON.stringify({ id: params.ids }),
		})}`;
		const { json } = await fetchUtils.fetchJson(url);
		return { data: json };
	},

	getManyReference: async (resource, params) => {
		const { page, perPage } = params.pagination;
		const { field, order } = params.sort;
		const query = {
			sort: JSON.stringify([field, order]),
			range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
			filter: JSON.stringify({ ...params.filter, [params.target]: params.id }),
		};
		const url = `${apiUrl}/${resource}?${stringify(query)}`;

		const { json } = await fetchUtils.fetchJson(url);
		return {
			data: json,
			total: parseInt(json.length, 10),
		};
	},

	create: async (resource, params) => {
		const url = `${apiUrl}/${resource}`;
		const { json } = await fetchUtils.fetchJson(url, {
			method: "POST",
			body: JSON.stringify(params.data),
		});
		return { data: json };
	},

	update: async (resource, params) => {
		const url = `${apiUrl}/${resource}/${params.id}`;
		const { json } = await fetchUtils.fetchJson(url, {
			method: "PUT",
			body: JSON.stringify(params.data),
		});
		return { data: json };
	},

	updateMany: async (resource, params) => {
		const promises = params.ids.map((id) =>
			fetchUtils.fetchJson(`${apiUrl}/${resource}/${id}`, {
				method: "PUT",
				body: JSON.stringify(params.data),
			})
		);
		const jsons = await Promise.all(promises);
		return { data: jsons.map((json) => json.id) };
	},

	delete: async (resource, params) => {
		const url = `${apiUrl}/${resource}/${params.id}`;
		const { json } = await fetchUtils.fetchJson(url, {
			method: "DELETE",
		});
		return { data: json };
	},

	deleteMany: async (resource, params) => {
		const promises = params.ids.map((id) =>
			fetchUtils.fetchJson(`${apiUrl}/${resource}/${id}`, {
				method: "DELETE",
			})
		);
		const jsons = await Promise.all(promises);
		return { data: jsons.map((json) => json.id) };
	},
};

export default dataProvider;
