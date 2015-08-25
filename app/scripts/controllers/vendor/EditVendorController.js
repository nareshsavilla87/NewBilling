(function(module) {
	mifosX.controllers = _.extend(module, {				
		EditVendorController : function(scope,resourceFactory, 
				location, dateFilter,validator, $rootScope, routeParams) {
			
			scope.countryDatas = [];
			scope.currencyDatas = [];
			scope.edit = {};
			scope.vendorId = routeParams.id;		
			resourceFactory.VendorLemplateResource.getTemplateDetails({vendorId:routeParams.id, template:true}, function(data) {
				scope.edit = {
						vendorCode:data.vendorCode,
						vendormobileNo:data.vendormobileNo,
						vendorName:data.vendorName,
						vendorLandlineNo:data.vendorLandlineNo,
						contactName:data.contactName,
						vendorAddress:data.vendorAddress,
						vendorEmailId:data.vendorEmailId,
						vendorCountry:data.vendorCountryId,
						vendorCurrency:data.vendorCurrency
				};
				scope.countryDatas = data.countryData;
				scope.currencyDatas = data.currencyOptions;
			});
				
			scope.submit = function() {			
				scope.edit.locale = $rootScope.locale.code;
								
				resourceFactory.VendorLemplateResource.update({vendorId:scope.vendorId}, scope.edit, function(data) {
					location.path('/viewvendormanagement/' + data.resourceId);										
				});							
			};						
		}			
	});
	mifosX.ng.application.controller('EditVendorController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'dateFilter',
	'HTValidationService', 
	'$rootScope',
	'$routeParams',
	mifosX.controllers.EditVendorController 
	]).run(function($log) {
		$log.info("EditVendorController initialized");	
	});
}(mifosX.controllers || {}));
