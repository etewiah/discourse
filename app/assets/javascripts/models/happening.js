Discourse.Happening = DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  startSlot: DS.attr('string'),
  when: DS.attr('date'),
  endSlot: DS.attr('string'),
  address: DS.attr('string'),
  coordinates: DS.attr('array'),
  meta: DS.attr('array'),
  jsonDetails: DS.attr('string'),
  source: DS.attr('string')
});