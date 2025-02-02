import { MakeLogin, MakeProfile, MakeRegister, MakeCharts } from './pages/Maker';
import Router from './router'
import HTTPClient from './utils/sender'
// import { ResponseUser } from './utils/modelsAPI'
// import { MyWebSocketClient } from './utils/webSocket'
import { fetchUserID } from './utils/userHelpers';

const httpClient = new HTTPClient();

const router = new Router(".app");
let currentUserID: number = 0;

fetchUserID(httpClient)
.then(userID => {
    currentUserID = userID
})
.catch(error => {
    console.error('Ошибка при загрузке текущего пользователя:', error);
}).finally(()=>{
    console.log('Current UserID:', currentUserID);
    router
    .use("/", MakeLogin(router))
    .use("/settings", MakeProfile(router))
    .use("/sign-up", MakeRegister(router))
    .use("/messenger", MakeCharts(router, currentUserID))
    .start();
});


