define(['angular', 'webstorage'], function(angular) {
  angular.module('webStorageModule')
  .constant('prefix', 'selfcare')
  .run(function($log, webStorage) {
    if (webStorage.isSupported) {
      if (webStorage.local.isSupported);
      else if (webStorage.session.isSupported);
      else ;
    }
  });
});