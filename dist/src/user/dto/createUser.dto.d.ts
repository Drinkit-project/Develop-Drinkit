import AddressDto from './address.dto';
export declare class CreateUserDto {
    address: AddressDto;
    phoneNumber: string;
    nickname: string;
    name: string;
    email: string;
    password: string;
    confirm: string;
    isAdmin: boolean;
    isPersonal: boolean;
}
export default CreateUserDto;
