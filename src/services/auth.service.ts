import { ProfileModel, User, UserModel } from "../models";
import { getAuthToken, isCorrectPassword } from "../utils/password.util";
import { v4 as uuidV4 } from "uuid";

type AuthResponse = {
  success: boolean;
  msg: string;
  token?: string;
  user?: string;
};

class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await UserModel.findOne({ where: { email } });
    let result: AuthResponse = {
      success: false,
      msg: "",
    };

    if (user === null) {
      return {
        success: false,
        msg: "User not found",
      };
    }

    const passwordMatches = await isCorrectPassword(password, user.password);
    if (!passwordMatches)
      return {
        success: false,
        msg: "Password not matching",
      };

    if (user.blocked) {
      return {
        success: false,
        msg: "User blocked",
      };
    }

    const data = {
      userId: user.id,
      role: user.role,
    };

    const authToken = await getAuthToken(data);

    const profile = await ProfileModel.findOne({ where: { userId: user.id } });
    if (profile !== null) {
      result.user = "";
    }

    result.success = true;
    result.msg = "User logged in successfully";
    result.token = authToken;

    return result;
  }

  async register(email: string, password: string): Promise<AuthResponse> {
    let user = await UserModel.findOne({ where: { email } });
    let result: AuthResponse = {
      success: false,
      msg: "",
    };

    if (user !== null) {
      return {
        success: false,
        msg: "User already exists",
      };
    }

    user = await UserModel.create({ email, password, id: uuidV4() });

    const data = {
      userId: user.id,
      role: user.role,
    };

    const authToken = await getAuthToken(data);

    const profile = await ProfileModel.findOne({ where: { userId: "" } });
    if (profile !== null) {
      result.user = "User";
    }

    result.success = true;
    result.token = authToken;
    result.msg = "User registered successfully";

    return result;
  }

  async createProfile(userId: string, firstName: string, lastName: string) {
    const profile = await ProfileModel.create({
      firstName,
      lastName,
      userId,
      id: uuidV4(),
    });

    return profile;
  }

  async getUserProfile(userId: string) {
    const profile = await ProfileModel.findOne({ where: { userId } });
    return profile;
  }
}

export default new AuthService();
