import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('layout/two-columns/panel-content-left/listing/item', 'Integration | Component | layout/two columns/panel content left/listing/item', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{layout/two-columns/panel-content-left/listing/item}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#layout/two-columns/panel-content-left/listing/item}}
      template block text
    {{/layout/two-columns/panel-content-left/listing/item}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});