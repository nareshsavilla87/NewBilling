(function(module) {
  mifosX.controllers = _.extend(module, {
	  AccountModuleController: function(scope,PermissionService) {
    	scope.PermissionService = PermissionService;
    	
    }
  });
  mifosX.ng.application.controller('AccountModuleController', ['$scope','PermissionService', mifosX.controllers.AccountModuleController]).run(function($log) {
    $log.info("AccountModuleController initialized");
  });
}(mifosX.controllers || {}));