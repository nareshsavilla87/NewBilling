(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewTaxMappingController: function(scope, routeParams, resourceFactory, PermissionService ) {
        scope.taxmapping = {};
        scope.PermissionService = PermissionService;
        scope.chargeCodeId = routeParams.chargeCodeId;
        
        resourceFactory.getTaxmappingResource.get({taxId: routeParams.id}, function(data) {
            scope.taxmapping = data;
        });
    }
  });
  mifosX.ng.application.controller('ViewTaxMappingController', [
       '$scope', 
       '$routeParams',
       'ResourceFactory',
       'PermissionService',
       mifosX.controllers.ViewTaxMappingController
       ]).run(function($log) {
    	   $log.info("ViewTaxMappingController initialized");
       });
}(mifosX.controllers || {}));
