import { DataProvider } from "@refinedev/core";
import { api } from "./api";
import { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = api;

export const dataProvider = (apiUrl: string): DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters }) => {
    const url = `${apiUrl}/${resource}`;

    const page =
      pagination && "current" in pagination
        ? (pagination.current as number) - 1
        : 0;
    const size =
      pagination && "pageSize" in pagination
        ? (pagination.pageSize as number)
        : 10;

    const query: Record<string, string | number> = {
      page,
      size,
    };

    // Add filters if provided
    if (filters) {
      for (const filter of filters) {
        if ("field" in filter) {
          query[filter.field] = filter.value;
        }
      }
    }

    // Add sorting if provided
    if (sorters && sorters.length > 0) {
      const sort = sorters.map((item) => {
        return `${item.field},${item.order}`;
      });
      query.sort = sort.join("&");
    }

    const { data } = await axiosInstance.get(url, { params: query });

    // Handle both array responses and paginated responses
    const list = Array.isArray(data) ? data : data.content || data.data || [];
    const total = Array.isArray(data)
      ? data.length
      : data.totalElements || data.total || list.length;

    return {
      data: list,
      total,
    };
  },

  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await axiosInstance.get(url);

    return {
      data,
    };
  },

  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`;
    const { data } = await axiosInstance.post(url, variables);

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await axiosInstance.put(url, variables);

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    const { data } = await axiosInstance.delete(url);

    return {
      data,
    };
  },

  getApiUrl: () => apiUrl,

  custom: async ({ url, method, payload, query, headers }) => {
    let requestUrl = `${url}`;

    if (query) {
      const queryString = new URLSearchParams(
        query as Record<string, string>
      ).toString();
      requestUrl = `${requestUrl}?${queryString}`;
    }

    const { data } = await axiosInstance({
      url: requestUrl,
      method,
      data: payload,
      headers,
    });

    return { data };
  },
});
