export class UserModel {
    _id: string;
    name: string;
    email: string;
    phone: string;
    password?: string;
    newPassword?: string;
    confirmPassword?: string;
    role: string;

    constructor(_id: string, name: string, email: string, phone: string, role: string, password?: string, newPassword?: string, confirmPassword?: string) {
        this._id = _id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
        this.role = role;
    }

}