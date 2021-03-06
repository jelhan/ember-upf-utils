import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  ownershipUpdater: service(),
  toast: service(),

  _toastConfig: {
    timeOut: 0,
    extendedTimeOut: 0,
    closeButton: true,
    tapToDismiss: true
  },

  header: 'Share with',
  cta: 'Share',

  actions: {
    updateOwnership() {
      this.get('ownershipUpdater').update(
        this.get('modelType'),
        this.get('model.id'),
        this.get('model.ownedBy')
      ).then(() => {
        this.sendAction('closeModal');
        this.get('toast').success(
          this.get('successfulSharing'),
          'Sharing Success',
          this._toastConfig
        );
      });
    }
  }
});
