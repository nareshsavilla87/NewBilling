(function(module) {
	mifosX.controllers = _.extend(module, {
		EditCurrencyDetailsController : function(scope, resourceFactory,location, routeParams, $rootScope) {

			scope.countryDatas = [];
			scope.currencydatas = [];
			scope.currencystatus = [];

			resourceFactory.currencyResource.get({id : routeParams.id,template : 'true'}, function(data) {
				scope.countryDatas = data.countryData;
				scope.currencydatas = data.currencydata.currencyOptions;
				scope.currencystatus = data.statusData;
				scope.formData = data;
				
			});

			scope.submit = function() {
				this.formData.locale = $rootScope.locale.code;
				delete this.formData.countryData;
				delete this.formData.currencydata;
				delete this.formData.statusData;
				delete this.formData.id;
				resourceFactory.currencyResource.update({id : routeParams.id}, this.formData, function(data) {
			      location.path('/viewcurrencydetails/' + data.resourceId);
				});
			};
		}
	});
	mifosX.ng.application.controller('EditCurrencyDetailsController',[ '$scope', 'ResourceFactory', '$location', '$routeParams','$rootScope',mifosX.controllers.EditCurrencyDetailsController ]).run(function($log) {
				$log.info("EditCurrencyDetailsController initialized");
			});
}(mifosX.controllers || {}));


