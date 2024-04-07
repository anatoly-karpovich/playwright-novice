import { IUserCredentials } from "types/user/user.types";
import SignInService from "api/services/signIn.service";
import { Users } from "utils/entities";
import { ADDRCONFIG } from "dns";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "config/environment";
import { logStep } from "utils/reporter/decorators/logStep";

class SignInApiSteps {
  @logStep("Sign In via API")
  async signIn(credentials: IUserCredentials) {
    const signInResponse = await SignInService.login({ data: credentials });
    Users.setToken(signInResponse.data, credentials.username);
    return signInResponse.data.token;
  }

  @logStep("Sign In as admin via API")
  async signInAsAdmin() {
    const token = await this.signIn({ username: ADMIN_USERNAME, password: ADMIN_PASSWORD });
    Users.setToken({ token }, ADMIN_USERNAME);
    return token;
  }
}

export default new SignInApiSteps();
