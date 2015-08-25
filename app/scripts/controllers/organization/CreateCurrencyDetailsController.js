(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateCurrencyDetailsController : function(scope, resourceFactory,location, $rootScope) {
			
			scope.countryDatas = [];
			scope.currencydatas = [];
			scope.currencystatus = [];

			resourceFactory.currencyTemplateResource.get(function(data) {
				scope.countryDatas = data.countryData;
				scope.currencydatas = data.currencydata.currencyOptions;
				scope.currencystatus = data.statusData;
				scope.formData = {};
			});

			scope.submit = function() {
				this.formData.locale = $rootScope.locale.code;
				resourceFactory.currencyResource.save(this.formData, function(data) {
					location.path('/currencydetails');
				});
			};
		}
	});
	mifosX.ng.application.controller('CreateCurrencyDetailsController',[ '$scope', 'ResourceFactory', '$location', '$rootScope',mifosX.controllers.CreateCurrencyDetailsController ]).run(function($log) {
	$log.info("CreateCurrencyDetailsController initialized");
 });
}(mifosX.controllers || {}));
