import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);

    }

    async createAccouunt({ email, password, name }) {
        try {
            const userAccouunt = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccouunt) {
                // call another function for login
                return this.login({ email, password })
            }
            else {
                alert(" Account Created Successfully ")
                return userAccouunt;
            }
        } catch (error) {
            console.log(" Create Account ::: ", error)
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(
                email,
                password
            )
        } catch (error) {
            console.log(" Login Failed :::", error)
        }
    }

    async getCurrentUser() {
        try {
            await this.account.get();
        } catch (error) {
            console.log(" Get USer Error :::", error);
        }
        // no accouunt fouund then return null  
        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log(" Logout Errror ::", error)
        }

    }
}
// object of Class AuthService 
const authService = new AuthService();
export default authService;