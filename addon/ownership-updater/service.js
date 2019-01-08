import Service, { inject as service } from '@ember/service';
import Ember from 'ember';
import { pluralize } from 'ember-inflector';

const {
  String
} = Ember;

export default Service.extend({
  ajax: service(),

  update(model, modelId, ownedBy) {
    let payload = {};
    payload[`${model}`] = { owned_by: ownedBy };

    return this.get('ajax').request(
      `/${pluralize(model)}/${modelId}`,
      {
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(payload)
      }
    );
  }
});
