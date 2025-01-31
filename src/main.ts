import { MakeLogin, MakeProfile, MakeRegister, MakeCharts } from './pages/Maker';
import Router from './router'
import HTTPClient from './utils/sender'
import { ResponseUser } from './utils/modelsAPI'
import { MyWebSocketClient } from './utils/webSocket'
import { fetchUserID } from './utils/userHelpers';

// app — это class дива в корне DOM

// Пример использования
const httpClient = new HTTPClient();
const userId = 3306; //3319
const chatId = 1
const token = '9a13aecbcf0412c3169e337bcc62275481d895e9:1738314079';  //'1407d51f9e1f8183b18a9400d44dff15e00ded06:1738311025'
const urlWS = `wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`;
const myWebSocketClient = new MyWebSocketClient(urlWS);
myWebSocketClient.connect();
myWebSocketClient.send('My first msg WebSocket!');


const body = {
  first_name: "Jhon Doe",
  second_name: "Petra",
  login: "Doom",
  email: "test_test@mail.com",
  password: "Wer45Ffguryry4df",
  phone: "89164567879"
};

var user = {id: 3306};

const login = {
    login: "Doom",
    password: "Wer45Ffguryry4df"
}

if (false) {
    httpClient.post<string>("https://ya-praktikum.tech/api/v2/auth/logout", login)
    .then(response => {
        console.log('Ответ сервера:', response);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

if (false) {
    httpClient.post<string>("https://ya-praktikum.tech/api/v2/auth/signin", login)
        .then(response => {
            console.log('Ответ сервера:', response);
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
}


if (false) {
    httpClient.get<ResponseUser>("https://ya-praktikum.tech/api/v2/auth/user", body, new Headers({ 'Content-Type': 'application/json' }))
    .then(response => {
        console.log('Ответ сервера:', response);
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
}

const router = new Router(".app");
var currentUserID: number = 0;

fetchUserID(httpClient)
.then(userID => {
    currentUserID = userID
})
.catch(error => {
    console.error('Ошибка при загрузке текущего пользователя:', error);
}).finally(()=>{
    console.log('Current UserID:', currentUserID);
});

router
  .use("/", MakeLogin(router))
  .use("/settings", MakeProfile(router))
  .use("/sign-up", MakeRegister(router))
  .use("/messenger", MakeCharts(router, currentUserID))
  .start();
