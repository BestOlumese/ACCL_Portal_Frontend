import api from "@/api";
import { active, notActive } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAuth() {
  const isAuthorized = useSelector((state) => state.auth.value);
  const dispatch = useDispatch()
  const getToken = localStorage.getItem("access_token");
  let decodedToken = {};
  if(getToken) {
    decodedToken = jwtDecode(getToken);
  }

  useEffect(() => {
    auth().catch(() => dispatch(notActive()));
  }, []);

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      const res = await api.post("auth/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status == 200) {
        localStorage.setItem("access_token", res.data.access);
        dispatch(active())
      } else {
        dispatch(notActive())
      }
    } catch (error) {
      dispatch(notActive())
    }
  };

  const auth = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      dispatch(notActive())
      return;
    }

    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
      await refreshToken();
    } else {
      dispatch(active())
    }
  };

  return { isAuthorized, decodedToken }
}
