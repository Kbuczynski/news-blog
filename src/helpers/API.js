const fetch = require('node-fetch');

class API {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // TODO: handle params
  async get(ENDPOINT) {
    try {
      const response = await fetch(`${this.baseURL}/${ENDPOINT}`);
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  async post(ENDPOINT, data) {
    try {
      const response = await fetch(
        `${this.baseURL}/${ENDPOINT}`,
        this._getConfig('POST', data),
      );
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  async put(ENDPOINT, data) {
    try {
      const response = await fetch(
        `${this.baseURL}/${ENDPOINT}`,
        this._getConfig('PUT', data),
      );
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  async delete(ENDPOINT, data) {
    try {
      const response = await fetch(
        `${this.baseURL}/${ENDPOINT}`,
        this._getConfig('DELETE', data),
      );
      return response.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  _getConfig(method, data) {
    return {
      method,
      headers: { 'Content-Type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    };
  }
}

module.exports = API;
