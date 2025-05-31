import {
  MakeLogin,
  MakeProfile,
  MakeRegister,
  MakeCharts,
} from "./pages/MainMaker";
import Router from "./router";
import HTTPClient from "./services/sender";
import { fetchUserProfile, UserProfile } from "./services/userHelpers";

const apiUrl = import.meta.env.VITE_API_URL;

const httpClient = new HTTPClient(apiUrl);

const router = new Router("#app");

let currentUserID: number = -1;

let userProfile: UserProfile = {
  id: -1,
  first_name: '',
  second_name: '',
  display_name: '',
  phone: '',
  login: '',
  avatar: '',
  email: ''
};

fetchUserProfile(httpClient)
  .then((userDataProfile) => {
    currentUserID = userDataProfile.id;
    userProfile = userDataProfile;
    console.log('userDataProfile', userDataProfile);
  })
  .catch((error) => {
    console.error("Ошибка при загрузке текущего пользователя:", error);
  })
  .finally(() => {
    console.log("Current UserID:", currentUserID);
    router
      .use("/", MakeLogin(router, currentUserID))
      .use("/settings", MakeProfile(router, currentUserID, userProfile))
      .use("/sign-up", MakeRegister(router))
      .use("/messenger", MakeCharts(router, currentUserID))
      .start();
  });
