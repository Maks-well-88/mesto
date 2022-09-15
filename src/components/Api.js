class Api {
  constructor(config) {
    this._url = config.url;
    this._contentType = config.contentType;
    this._token = 'b0180cd6-e00d-4c46-af25-2755ea60dd90';
  }

  _getResponce(apiResult) {
    return apiResult.then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(`Ошибка: ${response.status}`);
      }
    });
  }

  getInfo() {
    return this._getResponce(
      fetch(this._url, {
        headers: {
          authorization: this._token,
          'content-type': this._contentType,
        },
      })
    );
  }

  editProfile(body) {
    return this._getResponce(
      fetch(this._url, {
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
      fetch(this._url, {
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
      fetch(`${this._url}/${cartId}`, {
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
        fetch(`${this._url}/${cartId}/likes`, {
          method: 'DELETE',
          headers: {
            authorization: this._token,
            'content-type': this._contentType,
          },
        })
      );
    }
    return this._getResponce(
      fetch(`${this._url}/${cartId}/likes`, {
        method: 'PUT',
        headers: {
          authorization: this._token,
          'content-type': this._contentType,
        },
      })
    );
  }
}

export default Api;
