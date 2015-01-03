(function(module) {
  mifosX.controllers = _.extend(module, {
	  TaxMappingController: function(scope,routeParams, resourceFactory) {
        scope.taxmappings = [];
        
        resourceFactory.taxmappingResource.query({chargeCode: routeParams.chargeCode}, function(data) {
            scope.taxmappings = data;
            scope.chargeId = routeParams.chargeId;
        });
    }
  });
  mifosX.ng.application.controller('TaxMappingController', [
       '$scope', 
       '$routeParams',
       'ResourceFactory',
       mifosX.controllers.TaxMappingController
       ]).run(function($log) {
    	   $log.info("TaxMappingController initialized");
       });
}(mifosX.controllers || {}));
