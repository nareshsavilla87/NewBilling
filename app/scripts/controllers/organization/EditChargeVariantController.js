(function(module) {
	mifosX.controllers = _.extend(module, {
		EditChargeVariantController : function(scope, routeParams,resourceFactory, location, $rootScope) {
				scope.formData = {};
			    resourceFactory.chargevariantResource.get({chargeVariantId : routeParams.id, template : 'true'}, function(data) {
				scope.formData.status = data.status;
				scope.formData.startDate = data.startDate;
				scope.formData.endDate = data.endDate;
				scope.formData.chargeVariantCode = data.chargeVariantCode;
				scope.statuses = data.statusData;
				scope.noofConnectionses = data.chargeVariantTypeData;
				scope.types = data.amountTypeData;
				scope.chargeVariantDetailsDatas = data.chargeVariantDetailsDatas;
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
