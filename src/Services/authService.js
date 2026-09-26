import bcrypt from "bcrypt";

export class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async login(email, password) {
        let isValidPassword

        const user = await this.userRepository.findUserByEmail(email);
        console.log(user)
        if (user !== undefined && user !== null) {
            isValidPassword = await bcrypt.compare(password, user?.password);
        }

        if (!user || !isValidPassword) {
            console.error("Invalid email or password");
        }

        await this.userRepository.updateLastAccess(email);
        return user ? user : null
    }

    async register(data) {
        const encryptedPassword = await bcrypt.hash(data.password, 10);

        return await this.userRepository.createUser({
            ...data, password: encryptedPassword, last_access: new Date(), sing_up_date: new Date(),

        });
    }

    async editUser(data, id) {
        const encryptedPassword = data.password? await bcrypt.hash(data.password, 10) : null

        return await this.userRepository.updateUser({
            ...data, password: encryptedPassword
        }, id)
    }
}