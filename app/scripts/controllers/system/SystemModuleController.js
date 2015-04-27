(function(module) {
    mifosX.controllers = _.extend(module, {
    	SystemModuleController: function(scope,PermissionService) {
        	scope.PermissionService = PermissionService;
        }
    });
    mifosX.ng.application.controller('SystemModuleController', ['$scope','PermissionService', mifosX.controllers.SystemModuleController]).run(function($log) {
        $log.info("SystemModuleController initialized");
    });
}(mifosX.controllers || {}));