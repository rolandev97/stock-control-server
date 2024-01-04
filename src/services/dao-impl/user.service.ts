import {UserDao} from "../dao/user.dao";
import {UserDto} from "../../models/dto/user.dto";
import {BadRequestException, Injectable, UnauthorizedException} from "@nestjs/common";
import * as bcrypt from 'bcrypt';

import {UserRepository} from "../../repositories/user.repository";
import {RoleService} from "./role.service";
import {MailDto} from "../../models/dto/mail.dto";
import {MailService} from "./mail.service";

@Injectable()
export class UserService implements UserDao{

    constructor(private userRepository: UserRepository, private roleService: RoleService, private mailService: MailService) {}

    async createUser(user: UserDto): Promise<UserDto> {
        //Encrypt password
        const salt = await bcrypt.genSalt();
        const encryptPass = await bcrypt.hash(user.password, salt);

        const mailDto = new MailDto();
        mailDto.to = user.email;
        mailDto.subject = "Stock Control Registration";
        mailDto.content = `Hi, ${user.name} your <strong>Stock Control</strong> account has been successfully created.<br>Your defaut password is ${user.password}, please change it.`;
        user.password = encryptPass;
        user.isActive = true;
        user.role = await this.roleService.findRoleByName("ROLE_USER");
        const result = await this.userRepository.save(user);
        if(result != null){
            const sendMailResult = await this.mailService.sendMail(mailDto);
            if(sendMailResult.accepted.length > 0){
                return result;
            }
            else {
                throw new BadRequestException("Oops!, Email not send");
            }
        }else{
            throw new BadRequestException("An unexpected error occurred");
        }
    }

    deleteUser(userId: number): Promise<boolean> {
        return this.userRepository.delete(userId)
            .then(() => Promise.resolve(true))
            .catch(() => Promise.resolve(false));
    }

    getUser(userId: number): Promise<UserDto> {
        return this.userRepository.findOne({ where: {id: userId}, relations: ["role"] })
            .then( entity => UserDto.fromEntity(entity));
    }

    updateUser(userId: number, updateUserData: UserDto): Promise<UserDto> {
        return this.userRepository.update(userId, updateUserData)
            .then(() => this.userRepository.findOne({where: {id: userId}, relations: ["role"]}))
            .then(updatedUser => UserDto.fromEntity(updatedUser));
    }

    findAllUsers(): Promise<UserDto[]> {
        return this.userRepository.find({relations: ["role"]}).
        then( userEntity => userEntity.map( user => UserDto.fromEntity(user) ));
    }

    findByEmail(email:string): Promise<UserDto| undefined> {
        return this.userRepository.findOne({ where: {email: email}, relations: ["role"] })
            .then( entity => {
                if(entity != null){
                    return UserDto.fromEntity(entity);
                }
            })
    }

    async changePassword(oldPassword: string, newPassword: string, userId: string): Promise<any> {

        /**
         * Check if pass are the same
         * Then if true change it else
         * @Return an error
         */
        const user = await this.getUser(Number.parseInt(userId));
        const comparePass = await bcrypt.compare(oldPassword, user.password);
        if(comparePass){
            const salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(newPassword, salt);
            const result = await this.userRepository.update(user.id, user);
            if(result.affected! > 0){
                return { message: "Your password are successful changed"}
            }else{
                throw new BadRequestException("An unexpected error occurred");
            }
        }else{
            throw new UnauthorizedException("Old Password and New Password are not the same!")
        }
    }

}
