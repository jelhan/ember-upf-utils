import Ember from 'ember';
import EmberUploader from 'ember-uploader';
import layout from './template';

export default Ember.Component.extend({
  layout,
  classNames: ['file-uploader'],
  store: Ember.inject.service(),
  session: Ember.inject.service(),

  method: 'PUT',
  attribute: 'file',

  text: 'Add an file',

  allowedExtensions: null,
  isValid: false,
  twoStep: false,

  // Since this doesn't work well, this is disable by defaut.
  useProgress: false,

  // Actions
  didUpload: '',
  onProgress: '',
  didError: '',

  _onUpload: false,
  _percent: 0,
  _file: null,

  url: Ember.computed('model.id', function() {
    return this.get(
      'store'
    ).adapterFor(this.get('model.constructor.modelName')).buildURL(
      this.get('model.constructor.modelName'),
      this.get('model.id')
    );
  }),

  hasFile: Ember.computed('_file', function () {
    return !Ember.isEmpty(this.get('_file.name'));
  }),

  isValid: Ember.computed('hasFile', function () {
    if (!this.get('hasFile')) {
      return false;
    }

    let exts = this.get('_allowedExtensions');

    return Ember.isBlank(exts) ||
      exts.includes(this._getExtension(this.get('_file.name')));
  }),

  actions: {
    clear() {
      this._clear();
    },
    onFile(file) {
      this.set('_file', file);

      if (!this.get('twoStep') && this.get('isValid')) {
        this._upload();
      }
    },
    upload() {
      this._upload();
    }
  },

  _upload() {
    let uploader = EmberUploader.Uploader.create({
      url: this.get('url'),
      method: this.get('method'),
      paramName: this.get('attribute').underscore(),
      paramNamespace: this.get('model.constructor.modelName').underscore(),
      ajaxSettings: {
        headers: {
          'Authorization':
            `Bearer ${this.get('session.data.authenticated.access_token')}`
        }
      }
    });

    uploader
      .on('didUpload', (e) => {
        this.sendAction('didUpload', e);
        this._clear();
      })
      .on('progress', (e) => {
        if (!this.get('useProgress')) {
          return;
        }

        this.set('_percent', e.percent);
        this.sendAction('onProgress', e);
      })
      .on('didError', (jqXHR, textStatus, errorThrown) => {
        let payload = null;

        if (jqXHR.responseText) {
          try {
            payload = JSON.parse(jqXHR.responseText);
          } catch (e) {
            // silent
          }
        }

        this.set('_onUpload', false);
        // dispatch payload from backend
        this.sendAction('didError', payload, errorThrown);
      })
    ;

    if (!Ember.isEmpty(this.get('_file'))) {
      this.set('_onUpload', true);
      uploader.upload(this.get('_file'));
    }
  },

  _getExtension(filename) {
    let extension_matchers = [
      new RegExp(/^(.+)\.(tar\.([glx]?z|bz2))$/),
      new RegExp(/^(.+)\.([^\.]+)$/)
    ];

    for (let i = 0; i < extension_matchers.length; i++) {
      let match = extension_matchers[i].exec(filename);
      if (match) {
        return match[2];
      }
    }

    return null;
  },

  _allowedExtensions: Ember.computed('allowedExtensions', function() {
    if (Ember.isBlank(this.get('allowedExtensions'))) {
      return [];
    }

    return this.get('allowedExtensions').split(',');
  }),

  _clear() {
    this.set('_onUpload', false);
    this.set('_file', null);
    this.set('_percent', 0);
  },
});
