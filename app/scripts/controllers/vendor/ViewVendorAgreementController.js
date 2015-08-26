(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewVendorAgreementController: function(scope, routeParams , resourceFactory ,location,$modal,PermissionService,route) {
        scope.vendorData = [];
        scope.PermissionService = PermissionService;
        scope.vendorAgreeRouteParamId = routeParams.agreementId;
        scope.vendorId = routeParams.vendorId;
        
       
        resourceFactory.VendorAgreementResource.getTemplateDetails({vendorAgreementId:scope.vendorAgreeRouteParamId,resourceType:'details'}, function(data) {
			scope.vendorAgreeData = data;
			scope.agreements = data.vendorAgreementDetailsData;
		});
        
    }
  });
  mifosX.ng.application.controller('ViewVendorAgreementController', ['$scope', '$routeParams','ResourceFactory', '$location','$modal','PermissionService','$route',mifosX.controllers.ViewVendorAgreementController]).run(function($log) {
    $log.info("ViewVendorAgreementController initialized");
  });
}(mifosX.controllers || {}));
