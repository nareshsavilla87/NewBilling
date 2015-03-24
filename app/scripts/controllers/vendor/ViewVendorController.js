(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewVendorController: function(scope, routeParams , resourceFactory ,location,$modal,PermissionService) {
        scope.vendorData = [];
        scope.PermissionService = PermissionService;
       
        resourceFactory.VendorLemplateResource.getTemplateDetails({vendorId: routeParams.id} , function(data) {
        	scope.vendorData = data.singleVendorData[0];
        	scope.vendorDetaildata = data.vendorDetailsData;
        });
        
    }
  });
  mifosX.ng.application.controller('ViewVendorController', ['$scope', '$routeParams','ResourceFactory', '$location','$modal','PermissionService',mifosX.controllers.ViewVendorController]).run(function($log) {
    $log.info("ViewVendorController initialized");
  });
}(mifosX.controllers || {}));
