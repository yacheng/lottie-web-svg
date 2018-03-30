window.SliderEffect = function(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
};
window.AngleEffect = function(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
};
window.ColorEffect = function(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 1, 0, container);
};
window.PointEffect = function(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 1, 0, container);
};
window.LayerIndexEffect = function(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
};
window.MaskIndexEffect = function(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
};
window.CheckboxEffect = function(data, elem, container) {
  this.p = PropertyFactory.getProp(elem, data.v, 0, 0, container);
};
window.NoValueEffect = function() {
  this.p = {};
};