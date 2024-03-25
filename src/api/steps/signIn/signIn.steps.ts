import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../../config/environment";
import signInService from "../../services/signIn.service";

class SignInApiSteps {
  async signInAsAdmin() {
    let resp = await signInService.login({ data: { username: ADMIN_USERNAME, password: ADMIN_PASSWORD } });
    return resp.data.token;
  }
}

export default new SignInApiSteps();
