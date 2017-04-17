import Ember from 'ember';

const { getWithDefault } = Ember;

const DEFAULTS = {
  storeDomain: 'localhost',
  loginUrl: 'http://localhost:4001/login',
  logoutRedirectUrl: 'http://localhost:4000/',
  oauthUrl: 'http://localhost:9000/token',
  meURL: 'http://localhost:9000/me',
  oauthClientId: 'auth_client',
  scope: ['facade_web']
};

export default {
  formattedLoginUrl() {
    let params = Ember.$.param({
      scope: this.scope,
      redirect: window.location.href
    });

    return `${this.loginUrl}?${params}`;
  },

  storeDomain: DEFAULTS.storeDomain,
  loginUrl: DEFAULTS.loginUrl,
  oauthUrl: DEFAULTS.oauthUrl,
  logoutRedirectUrl: DEFAULTS.logoutRedirectUrl,
  oauthClientId: DEFAULTS.oauthClientId,
  meURL: DEFAULTS.meURL,
  scope: DEFAULTS.scope,

  load(config) {
    for (let property in this) {
      if (this.hasOwnProperty(property) && Ember.typeOf(this[property]) !== 'function') {
        this[property] = getWithDefault(config, property, DEFAULTS[property]);
      }
    }
  }
};