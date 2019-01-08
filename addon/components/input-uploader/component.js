import { isEmpty } from '@ember/utils';
import EmberUploader from 'ember-uploader';
import layout from './template';

export default EmberUploader.FileField.extend({
  layout,

  filesDidChange(files) {
    if (!isEmpty(files)) {
      this.sendAction('onFile', files[0]);
    }
  }
});
