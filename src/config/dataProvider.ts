import { DataProvider } from "@refinedev/core";
import { api } from "./api";
import { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = api;

export const dataProvider = (apiUrl: string): DataProvider => ({
  getList: async ({ resource, pagination, filters, sorters }) => {
    // Special handling for carts - use /carts/products endpoint
    const endpoint = resource === "carts" ? "carts/products" : resource;
    const url = `${apiUrl}/${endpoint}`;

    // Check if API supports pagination for this resource
    const paginationSupported = [
      "products",
      "users",
      "payment",
    ].includes(resource);

    let query: Record<string, string | number> = {};

    if (paginationSupported && pagination) {
      const page =
        "current" in pagination ? (pagination.current as number) - 1 : 0;
      const size =
        "pageSize" in pagination ? (pagination.pageSize as number) : 10;

      query = {
        page,
        size,
      };
    }

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

    const { data } = await axiosInstance.get(url, {
      params: Object.keys(query).length > 0 ? query : undefined,
    });

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
    // Special handling for users - use /users/register endpoint
    const endpoint = resource === "users" ? "users/register" : resource;
    const url = `${apiUrl}/${endpoint}`;
    const { data } = await axiosInstance.post(url, variables);

    return {
      data,
    };
  },

  update: async ({ resource, id, variables }) => {
    let url = `${apiUrl}/${resource}`;
    let updateData = variables;

    // Special handling for different resources
    if (resource === "categories") {
      // For categories, Spring Boot expects PUT /categories with full object in body
      updateData = { ...variables, categoryId: id };
    } else if (resource === "products") {
      // For products, use standard REST pattern
      url = `${apiUrl}/${resource}/${id}`;
    } else if (resource === "users") {
      // For users, use /users/{id}
      url = `${apiUrl}/${resource}/${id}`;
    } else if (resource === "orders") {
      // For orders, use /orders/{id}
      url = `${apiUrl}/${resource}/${id}`;
    } else if (resource === "payment") {
      // For payment, PUT expects the object in body
      updateData = { ...variables, paymentId: id };
    } else {
      // Default behavior
      url = `${apiUrl}/${resource}/${id}`;
    }

    const { data } = await axiosInstance.put(url, updateData);

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
