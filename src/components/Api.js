class Api {
  constructor(config) {
    this._url = config.url;
    this._contentType = config.contentType;
    this._token = 'b0180cd6-e00d-4c46-af25-2755ea60dd90';
  }

  getUserInfo() {
    return fetch(this._url, {
      headers: {
        authorization: this._token,
        'content-type': this._contentType,
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }
}

export default Api;
