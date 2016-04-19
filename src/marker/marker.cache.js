export default class MarkerCache {
  
  constructor(cacheservice) {
    cacheservice.addKey('datasets', false);
    cacheservice.addKey('markerIcons', false);
    cacheservice.addKey('weatherMarkers', true);
    cacheservice.addKey('inverterMarkers', true);
    this._cacheservice = cacheservice;
    this._markerdata = {};
  }
  
  get weatherMarkers() {
    return this._cacheservice.get('weatherMarkers');
  }
  
  set weatherMarkers(value) {
    this._cacheservice.set('weatherMarkers', value, Date.now() + 7200000); //2 hours
  }
  
  get inverterMarkers() {
    return this._cacheservice.get('inverterMarkers');
  }
  
  set inverterMarkers(value) {
    this._cacheservice.set('inverterMarkers', value, Date.now() + 7200000); //2 hours
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