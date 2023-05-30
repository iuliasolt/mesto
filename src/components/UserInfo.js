export default class UserInfo {
  constructor({ nameElement, infoElement }) {
      this._name = nameElement;
      this._info = infoElement;
  }

  getUserInfo() {
      return {
          userName: this._name.textContent,
          userInfo: this._info.textContent,
      };
  }

  setUserInfo(data) {
      this._name.textContent = data.username;
      this._info.textContent = data.description;
  }
}
