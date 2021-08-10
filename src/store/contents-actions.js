import { uiActions } from "./ui-slice";
import { contentsActions } from "./contents-slice";
import axios from "../helpers/axiosInstance";

export const getContentsData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      console.log("fetch");
      const response = axios.get("/getContentsData");

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };

    try {
      const data = await fetchData();
      dispatch(
        contentsActions.getContents({
          contents: data.contents || [],
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching content data failed!",
        })
      );
    }
  };
};

export const sendContentData = (content) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const postData = async () => {
      const response = axios.post("/postContentData", content);

      if (!response.ok) {
        throw new Error("Could not fetch cart data!");
      }

      const data = await response.json();

      return data;
    };
  };
};
