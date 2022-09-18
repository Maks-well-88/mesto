class Api {
  constructor(config) {
    this._url = config.url;
    this._contentType = config.contentType;
    this._token = config.token;
  }

  _getResponce(apiResult) {
    return apiResult.then((response) => {
      return response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`);
    });
  }

  getInfo() {
    return this._getResponce(
      fetch(`${this._url}/users/me`, {
        headers: {
          authorization: this._token,
          'content-type': this._contentType,
        },
      })
    );
  }

  renderInitialCards() {
    return this._getResponce(
      fetch(`${this._url}/cards`, {
        headers: {
          authorization: this._token,
          'content-type': this._contentType,
        },
      })
    );
  }

  editProfile(body) {
    return this._getResponce(
      fetch(`${this._url}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'content-type': this._contentType,
        },
        body: JSON.stringify(body),
      })
    );
  }

  addNewCard(body) {
    return this._getResponce(
      fetch(`${this._url}/cards`, {
        method: 'POST',
        headers: {
          authorization: this._token,
          'content-type': this._contentType,
        },
        body: JSON.stringify(body),
      })
    );
  }

  removeCard(cartId) {
    return this._getResponce(
      fetch(`${this._url}/cards/${cartId}`, {
        method: 'DELETE',
        headers: {
          authorization: this._token,
          'content-type': this._contentType,
        },
      })
    );
  }

  changelikeStatusCard(cartId, isLiked) {
    if (isLiked) {
      return this._getResponce(
        fetch(`${this._url}/cards/${cartId}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: this._token,
            'content-type': this._contentType,
          },
        })
      );
    }
    return this._getResponce(
      fetch(`${this._url}/cards/${cartId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'content-type': this._contentType,
        },
      })
    );
  }

  changeAvatarImage(avatarUrl) {
    return this._getResponce(
      fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this._token,
          'content-type': this._contentType,
        },
        body: JSON.stringify({ avatar: avatarUrl }),
      })
    );
  }
}

export default Api;
