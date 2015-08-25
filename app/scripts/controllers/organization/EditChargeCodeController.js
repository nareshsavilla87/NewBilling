(function(module) {
	mifosX.controllers = _.extend(module, {
		EditChargeCodeController : function(scope, routeParams,resourceFactory, location, $rootScope) {
			scope.chargeTypes = [];
			scope.durationTypes = [];
			scope.billFrequencyCodes = [];

			resourceFactory.chargecodeResource.get({chargeCodeId : routeParams.id,	template : 'true'}, function(data) {
				scope.chargeTypes = data.chargeTypeData;
				scope.durationTypes = data.durationTypeData;
				scope.billFrequencyCodes = data.billFrequencyCodeData;
				scope.formData = data;
				scope.chargeCodeId = routeParams.id;

				if (data.taxInclusive === 1) {
					scope.formData.taxInclusive = true;
				}

			});

			scope.submit = function() {
				delete this.formData.id;
				delete this.formData.chargeTypeData;
				delete this.formData.durationTypeData;
				delete this.formData.billFrequencyCodeData;
				this.formData.locale = $rootScope.locale.code;
				resourceFactory.chargecodeResource.update({'chargeCodeId' : routeParams.id}, this.formData, function(data) {
					location.path('/viewchargecode/' + data.resourceId);
				});
			};
		}
	});
	mifosX.ng.application.controller('EditChargeCodeController',[
	     '$scope',
	     '$routeParams', 
	     'ResourceFactory',
	     '$location',	
	     '$rootScope',
	     mifosX.controllers.EditChargeCodeController 
	     ]).run(function($log) {
	    	 $log.info("EditChargeCodeController initialized");
	     });
}(mifosX.controllers || {}));
