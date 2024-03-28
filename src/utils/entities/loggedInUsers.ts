import { ILoginResponse } from "types/user/user.types";

interface ILoggedInUser {
  username: string;
  token: string;
}

export class LoggedInUsers {
  private users: ILoggedInUser[] = [];

  private static instance: LoggedInUsers;

  constructor() {
    if (LoggedInUsers.instance) {
      return LoggedInUsers.instance;
    }
    LoggedInUsers.instance = this;
  }

  setToken(loginResponse: ILoginResponse, username?: string) {
    username ? (this.findUserByUsername(username).token = this.createTokenFromResponse(loginResponse)) : (this.users[this.users.length - 1].token = this.createTokenFromResponse(loginResponse));
  }

  setUser(username: string, loginResponse: ILoginResponse) {
    this.users.push({ username, token: this.createTokenFromResponse(loginResponse) });
  }

  getToken(username?: string) {
    return username ? this.findUserByUsername(username).token : this.users[this.users.length - 1].token;
  }

  removeToken(username?: string) {
    username ? (this.findUserByUsername(username).token = "") : (this.users[this.users.length - 1].token = "");
  }

  createTokenFromResponse(loginResponse: ILoginResponse) {
    return loginResponse.token;
  }

  private findUserByUsername(username: string) {
    return this.users[this.findUserIndex(username)];
  }

  private findUserIndex(username: string) {
    return this.users.findIndex((user) => user.username === username);
  }
}
