window.SVGGradientFillStyleData = function(elem, data, styleOb) {
  this.initGradientData(elem, data, styleOb);
};

SVGGradientFillStyleData.prototype.initGradientData = function(elem, data, styleOb) {
  this.o = PropertyFactory.getProp(elem, data.o, 0, 0.01, elem);
  this.s = PropertyFactory.getProp(elem, data.s, 1, null, elem);
  this.e = PropertyFactory.getProp(elem, data.e, 1, null, elem);
  this.h = PropertyFactory.getProp(elem, data.h || {k: 0}, 0, 0.01, elem);
  this.a = PropertyFactory.getProp(elem, data.a || {k: 0}, 0, degToRads, elem);
  this.g = new GradientProperty(elem, data.g, elem);
  this.style = styleOb;
  this.stops = [];
  this.setGradientData(styleOb.pElem, data);
  this.setGradientOpacity(data, styleOb);

};

SVGGradientFillStyleData.prototype.setGradientData = function(pathElement, data) {

  var gradientId = 'gr_' + randomString(10);
  var gfill = createNS(data.t === 1 ? 'linearGradient' : 'radialGradient');
  gfill.setAttribute('id', gradientId);
  gfill.setAttribute('spreadMethod', 'pad');
  gfill.setAttribute('gradientUnits', 'userSpaceOnUse');
  var stops = [];
  var stop, j, jLen;
  jLen = data.g.p * 4;
  for (j = 0; j < jLen; j += 4) {
    stop = createNS('stop');
    gfill.appendChild(stop);
    stops.push(stop);
  }
  pathElement.setAttribute( data.ty === 'gf' ? 'fill' : 'stroke', 'url(#' + gradientId + ')');
    
  this.gf = gfill;
  this.cst = stops;
};

SVGGradientFillStyleData.prototype.setGradientOpacity = function(data, styleOb) {
  if (this.g._hasOpacity && !this.g._collapsable) {
    var stop, j, jLen;
    var mask = createNS('mask');
    var maskElement = createNS( 'path');
    mask.appendChild(maskElement);
    var opacityId = 'op_' + randomString(10);
    var maskId = 'mk_' + randomString(10);
    mask.setAttribute('id', maskId);
    var opFill = createNS(data.t === 1 ? 'linearGradient' : 'radialGradient');
    opFill.setAttribute('id', opacityId);
    opFill.setAttribute('spreadMethod', 'pad');
    opFill.setAttribute('gradientUnits', 'userSpaceOnUse');
    jLen = data.g.k.k[0].s ? data.g.k.k[0].s.length : data.g.k.k.length;
    var stops = this.stops;
    for (j = data.g.p * 4; j < jLen; j += 2) {
      stop = createNS('stop');
      stop.setAttribute('stop-color', 'rgb(255,255,255)');
      opFill.appendChild(stop);
      stops.push(stop);
    }
    maskElement.setAttribute( data.ty === 'gf' ? 'fill' : 'stroke', 'url(#' + opacityId + ')');
    this.of = opFill;
    this.ms = mask;
    this.ost = stops;
    this.maskId = maskId;
    styleOb.msElem = maskElement;
  }
};