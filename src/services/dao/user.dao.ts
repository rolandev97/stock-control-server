import {UserDto} from "../../models/dto/user.dto";

export interface UserDao {
    createUser(user: UserDto): Promise<UserDto>;
    updateUser(userId: number, user: UserDto): Promise<UserDto>;
    deleteUser(userId: number): Promise<boolean>;
    getUser(userId: number): Promise<UserDto>;
    findAllUsers(): Promise<UserDto[]>;
    findByEmail(email: string): Promise<UserDto | undefined>;
    changePassword(oldPassword: string, newPassword: string, userId: string): Promise<any>;
}