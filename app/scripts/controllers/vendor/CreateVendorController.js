(function(module) {
	mifosX.controllers = _.extend(module, {				
		CreateVendorController : function(scope,resourceFactory, 
				location, dateFilter,validator, $rootScope) {
			
			scope.planDatas = [];
			scope.serviceDatas = [];
			scope.countryDatas = [];
			scope.statusDatas = [];
			scope.currencyDatas = [];
			scope.priceregionDatas = [];
			
			scope.first = {};
			var datetime = new Date();
			scope.first.date = datetime;
			
			scope.formData = {};
			scope.minDate = new Date();
						
			resourceFactory.VendorTemplateResource.getTemplateDetails(function(data) {
					
				scope.planDatas = data.planDatas;
				scope.serviceDatas = data.servicesData;
				scope.countryDatas = data.countryData;
				scope.statusDatas = data.statusData;
				scope.currencyDatas = data.currencyOptions;
				scope.priceregionDatas = data.priceRegionData;
			});
				
			scope.submit = function() {			
				this.formData.locale = $rootScope.locale.code;
								
				resourceFactory.VendorLemplateResource.save(this.formData, function(data) {
					location.path('/viewvendor/' + data.resourceId);										
				});							
			};						
		}			
	});
	mifosX.ng.application.controller('CreateVendorController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'dateFilter',
	'HTValidationService', 
	'$rootScope',
	mifosX.controllers.CreateVendorController 
	]).run(function($log) {
		$log.info("CreateVendorController initialized");	
	});
}(mifosX.controllers || {}));
