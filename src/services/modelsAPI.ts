export interface ResponseUser {
    id: number;
    first_name:	string;
    second_name: string;
    display_name: string;
    login: string;
    email:	string;
    phone:	string;
    avatar:	string;
} 

export interface RequestLogin {
    login: string;
    password: string;
}
