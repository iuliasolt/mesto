export default class UserInfo {
  constructor({ changeName, changeJob }) {
      this._name = document.querySelector(changeName);
      this._info = document.querySelector(changeJob);
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
