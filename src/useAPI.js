import axios from "axios";
import { useCallback, useContext } from "react";
import { authContext } from "./AuthContext";

export function useAuthAPI(route) {
  const { accessToken } = useContext(authContext);

  const requester = axios.create({
    baseURL: BASE_URL,
    headers: { auth: accessToken },
  });

  const get = useCallback(async () => {
    try {
      const response = await requester.get(route);
      return [null, response.data];
    } catch (error) {
      return [error, null];
    }
  }, [route, requester]);

  const post = useCallback(
    async (body) => {
      try {
        const response = await requester.post(route, body);
        return [null, response.data];
      } catch (error) {
        return [error, null];
      }
    },
    [requester, route]
  );

  return {
    get,
    post,
  };
}

export function useAPI(route) {
  const requester = axios.create({
    baseURL: BASE_URL,
  });

  const get = async () => {
    try {
      const response = await requester.get(route);
      return [null, response.data];
    } catch (error) {
      return [error, null];
    }
  };

  const post = async (body) => {
    try {
      const response = await requester.post(route, body);
      return [null, response.data];
    } catch (error) {
      return [error, null];
    }
  };

  return {
    get,
    post,
  };
}

export const BASE_URL = "http://localhost:8080/api";
