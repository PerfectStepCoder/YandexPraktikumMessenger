import { ResponseUser } from './modelsAPI';
import HTTPClient from './sender'

export async function fetchUserID(httpClient: HTTPClient) {
  try {
      const response = await httpClient.get<ResponseUser>("https://ya-praktikum.tech/api/v2/auth/user");
      console.log('Ответ сервера user:', response);
      return response.id; // Возвращаем UserID
  } catch (error) {
      console.error('Ошибка user:', error);
      throw error; // Пробрасываем ошибку
  }
}
