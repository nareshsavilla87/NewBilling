(function(module) {
	mifosX.controllers = _.extend(module, {				
		CreateVendorAgreementController : function(scope,resourceFactory, 
				location, dateFilter,validator, $rootScope) {
			
			scope.priceRegionDatas = [];
			scope.servicesData = [];
			scope.planDatas = [];
			scope.agreementTypes = [];
			
			scope.formData = {};
						
			resourceFactory.VendorAgreementTemplateResource.getTemplateDetails(function(data) {
				scope.priceRegionDatas = data.priceRegionData;
				scope.servicesData = data.servicesData;
				scope.planDatas = data.planDatas;
				scope.agreementTypes = data.agreementTypes;
			});
				
			scope.submit = function() {			
				this.formData.locale = $rootScope.locale.code;
								
				resourceFactory.VendorLemplateResource.save(this.formData, function(data) {
					location.path('/viewvendormanagement/' + data.resourceId);										
				});							
			};						
		}			
	});
	mifosX.ng.application.controller('CreateVendorAgreementController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'dateFilter',
	'HTValidationService', 
	'$rootScope',
	mifosX.controllers.CreateVendorAgreementController 
	]).run(function($log) {
		$log.info("CreateVendorAgreementController initialized");	
	});
}(mifosX.controllers || {}));
