import { ResponseUser } from "./modelsAPI";
import HTTPClient from "./sender";

export async function fetchUserID(httpClient: HTTPClient) {
  try {
    const response = await httpClient.get<ResponseUser>("/auth/user");
    console.log("Ответ сервера user:", response);
    return response.id; // Возвращаем UserID
  } catch (error) {
    console.error("Ошибка user:", error);
    throw error; // Пробрасываем ошибку
  }
}

export interface UserProfile {
    id: number,
    first_name: string,
    second_name: string,
    display_name: string,
    phone: string,
    login: string,
    avatar: string,
    email: string
}

export async function fetchUserProfile(httpClient: HTTPClient): Promise<UserProfile> {
  try {
    const response = await httpClient.get<ResponseUser>("/auth/user");
    console.log("Ответ сервера user:", response);
    return response; // Возвращаем Профиль пользователя
  } catch (error) {
    console.error("Ошибка user:", error);
    throw error; // Пробрасываем ошибку
  }
}

export async function uploadAvatar(fileInput: HTMLInputElement) {

  if (!fileInput.files || fileInput.files.length === 0) {
    console.warn("Файл не выбран");
    return;
  }

  const formData = new FormData();
  formData.append("avatar", fileInput.files[0]); // 'avatar' — это имя поля на сервере

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/user/profile/avatar`, {
      method: "PUT",
      body: formData,
      credentials: "include"
    });

    if (!response.ok) {
      throw new Error(`Ошибка при обновлении аватара: ${response.statusText}`);
    }
    const result = await response.json();
    console.log("Аватар успешно обновлён:", result);
    return result;
  } catch (error) {
    console.error("Ошибка при отправке аватара:", error);
  }
}
