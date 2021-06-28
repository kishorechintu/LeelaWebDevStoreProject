export class User {
  constructor(
    private email: string,
    private expirationDate: Date,
    private localId: string,
    private token: string
  ) {}

  getExpirationDate() {
    return this.expirationDate;
  }

  getToken() {
    return this.token;
  }
}
