export default class UserInfo {
  constructor({ changeNameSelector, changeJobSelector }) {
      this._name = document.querySelector(changeNameSelector);
      this._info = document.querySelector(changeJobSelector);
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
