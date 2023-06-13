export default class UserInfo {
  constructor({ changeNameSelector, changeJobSelector, changeAvatarSelector  }) {
      this._name = document.querySelector(changeNameSelector);
      this._info = document.querySelector(changeJobSelector);
      this._avatar = document.querySelector(changeAvatarSelector);
  }

  getUserInfo() {
      return {
          name: this._name.textContent,
          about: this._info.textContent,
          avatar: this._avatar.src
      };
  }

  setUserInfo({name, about, avatar}) {
      this._name.textContent = name;
      this._info.textContent = about;
      this._avatar.src = avatar;
  }
}
