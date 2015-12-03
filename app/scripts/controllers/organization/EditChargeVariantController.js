(function(module) {
	mifosX.controllers = _.extend(module, {
		EditChargeVariantController : function(scope, routeParams,resourceFactory, location, $rootScope) {
alert(routeParams.id);
			    resourceFactory.chargevariantResource.get({chargeVariantId : routeParams.id, template : 'true'}, function(data) {
				scope.formData = data;
				scope.chargeVarintId = routeParams.id;

			});
		}
	});
	mifosX.ng.application.controller('EditChargeVariantController',[
	     '$scope',
	     '$routeParams', 
	     'ResourceFactory',
	     '$location',	
	     '$rootScope',
	     mifosX.controllers.EditChargeVariantController 
	     ]).run(function($log) {
	    	 $log.info("EditChargeVariantController initialized");
	     });
}(mifosX.controllers || {}));
