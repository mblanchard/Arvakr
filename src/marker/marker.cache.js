export default class MarkerCache {
  
  constructor(cacheservice) {
    cacheservice.addKey('datasets', false);
    cacheservice.addKey('markerIcons', false);
    this._cacheservice = cacheservice;
    this._markers = {};
    this._markerdata = {};
  }
  
  
  get markers() {
    return this._markers;
  }
  
  set markers(value) {
    this._markers = value;
  }
    
  get markerdata() {
    return this._markerdata;
  }
  
  set markerdata(value) {
    this._markerdata = value;
  }
  
  get datasets() {
    return this._cacheservice.get('datasets');
  }
  
  set datasets(value) {
    this._cacheservice.set('datasets',value);
  }
  
  get markerIcons() {
    return this._cacheservice('markerIcons');
  }
  set markerIcons(value) {
    this._cacheservice.set('markerIcons',value);
  }
}