import axios from "axios";
import { useCallback, useContext } from "react";
import { authContext } from "./AuthContext";

export function useAuthAPI(route) {
  const { accessToken } = useContext(authContext);

  const get = useCallback(async () => {
    const requester = axios.create({
      baseURL: BASE_URL,
      headers: { auth: accessToken },
    });
    try {
      const response = await requester.get(route);
      return [null, response.data];
    } catch (error) {
      return [error, null];
    }
  }, [route, accessToken]);

  const post = useCallback(
    async (body) => {
      const requester = axios.create({
        baseURL: BASE_URL,
        headers: { auth: accessToken },
      });
      try {
        const response = await requester.post(route, body);
        return [null, response.data];
      } catch (error) {
        return [error, null];
      }
    },
    [accessToken, route]
  );

  return {
    get,
    post,
  };
}

export function useAPI(route) {
  const get = useCallback(async () => {
    const requester = axios.create({
      baseURL: BASE_URL,
    });
    try {
      const response = await requester.get(route);
      return [null, response.data];
    } catch (error) {
      return [error, null];
    }
  }, [route]);

  const post = useCallback(
    async (body) => {
      const requester = axios.create({
        baseURL: BASE_URL,
      });
      try {
        const response = await requester.post(route, body);
        return [null, response.data];
      } catch (error) {
        return [error, null];
      }
    },
    [route]
  );

  return {
    get,
    post,
  };
}

export const BASE_URL = "http://localhost:8080/api";
