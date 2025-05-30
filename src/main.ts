import {
  MakeLogin,
  MakeProfile,
  MakeRegister,
  MakeCharts,
} from "./pages/MainMaker";
import Router from "./router";
import HTTPClient from "./services/sender";
import { fetchUserID } from "./services/userHelpers";

const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = new HTTPClient(apiUrl);

const router = new Router("#app");

let currentUserID: number = -1;

fetchUserID(httpClient)
  .then((userID) => {
    currentUserID = userID;
  })
  .catch((error) => {
    console.error("Ошибка при загрузке текущего пользователя:", error);
  })
  .finally(() => {
    console.log("Current UserID:", currentUserID);
    router
      .use("/", MakeLogin(router, currentUserID))
      .use("/settings", MakeProfile(router, currentUserID))
      .use("/sign-up", MakeRegister(router))
      .use("/messenger", MakeCharts(router, currentUserID))
      .start();
  });
