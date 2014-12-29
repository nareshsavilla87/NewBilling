(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewServiceMappingController: function(scope, routeParams , resourceFactory,PermissionService,webStorage) {
        scope.sm = [];
        scope.id=[];
        scope.PermissionService =  PermissionService; 
        scope.configIPTV = webStorage.get("client_configuration").IPTV;
        resourceFactory.serviceMappingResource.get({serviceMappingId: routeParams.id} , function(data) {
            scope.sm = data;
            scope.id =  routeParams.id;
        });
    }
  });
  mifosX.ng.application.controller('ViewServiceMappingController', [
     '$scope', 
     '$routeParams',
     'ResourceFactory',
     'PermissionService', 
     'webStorage',
     mifosX.controllers.ViewServiceMappingController]).run(function($log) {
    $log.info("ViewServiceMappingController initialized");
  });
}(mifosX.controllers || {}));
