(function(module) {
  mifosX.controllers = _.extend(module, {
	  VendorController: function(scope, resourceFactory,PermissionService,location,route,$modal) {
    	
    	scope.PermissionService = PermissionService;
        resourceFactory.VendorLemplateResource.get(function(data) {
            scope.vendorDatas = data;
        });
        
        scope.routeTo=function(id){
        	location.path('/viewvendor/' +id);
        };
        
    }
  });
  mifosX.ng.application.controller('VendorController', [
    '$scope', 
    'ResourceFactory',
    'PermissionService',
    '$location',
    '$route','$modal',
    mifosX.controllers.VendorController
    ]).run(function($log) {
    $log.info("VendorController initialized");
  });
}(mifosX.controllers || {}));
