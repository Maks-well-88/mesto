class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
    this._profileName = document.querySelector('.profile__name');
    this._profileJob = document.querySelector('.profile__job');
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo(name, job) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}

export default UserInfo;
