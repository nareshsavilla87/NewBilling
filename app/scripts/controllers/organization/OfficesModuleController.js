(function(module) {
  mifosX.controllers = _.extend(module, {
	  OfficesModuleController: function(scope,PermissionService) {
    	scope.PermissionService = PermissionService;
    }
  });
  mifosX.ng.application.controller('OfficesModuleController', ['$scope','PermissionService', mifosX.controllers.OfficesModuleController]).run(function($log) {
    $log.info("OfficesModuleController initialized");
  });
}(mifosX.controllers || {}));