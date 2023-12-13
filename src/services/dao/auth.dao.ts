import {UserDto} from "../../models/dto/user.dto";

export interface AuthDao{
    login(email: string, password: string): Promise<any>;
    register(userDto: UserDto): Promise<any>;
    verifyOtpCode(otpCode: string, email: string): Promise<any>;
    forgotPassword(email: string, hostName: string): Promise<any>;
    resetPassword(newPassword: string, token: string): Promise<any>;
    resendOtpCode(email: string): Promise<any>;
}