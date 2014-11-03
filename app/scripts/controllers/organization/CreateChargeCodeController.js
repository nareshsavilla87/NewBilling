(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateChargeCodeController : function(scope, resourceFactory, location,	$rootScope) {
			scope.chargeTypes = [];
			scope.durationTypes = [];
			scope.billFrequencyCodes = [];
			resourceFactory.chargecodetemplateResource.getAllchargecode(function(data) {
				scope.chargeTypes = data.chargeTypeData;
				scope.durationTypes = data.durationTypeData;
				scope.billFrequencyCodes = data.billFrequencyCodeData;
				scope.formData = data;
				scope.formData = {
					taxInclusive : false,
				};
			});

			scope.submit = function() {

				if (!(this.formData.taxInclusive) == true) {
					this.formData.taxInclusive = false;
				}

				this.formData.locale = $rootScope.locale.code;
				resourceFactory.chargecodeResource.save(this.formData,function(data) {
		    	location.path('/viewchargecode/'+ data.resourceId);
								});
			};
		}
	});
	mifosX.ng.application.controller('CreateChargeCodeController',[ '$scope', 'ResourceFactory', '$location', '$rootScope',mifosX.controllers.CreateChargeCodeController ]).run(function($log) {
	$log.info("CreateChargeCodeController initialized");
});
}(mifosX.controllers || {}));
