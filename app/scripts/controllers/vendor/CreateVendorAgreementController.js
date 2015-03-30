(function(module) {
	mifosX.controllers = _.extend(module, {				
		CreateVendorAgreementController : function(scope,resourceFactory, 
				location, dateFilter,validator, $rootScope, $upload, API_VERSION, routeParams) {
			
			scope.priceRegionDatas = [];
			scope.servicesData = [];
			scope.planDatas = [];
			scope.agreementTypes = [];
			
			scope.formData = {};
			scope.json = {};
			scope.detailsFormData={};
			 scope.vendorDetailsDatas=[];
			 scope.start ={};
			 var datetime = new Date();
			 scope.start.date = datetime;
			 scope.minDate = new Date();
			 scope.vendorId = routeParams.vendorId;
						
			resourceFactory.VendorAgreementTemplateResource.getTemplateDetails(function(data) {
				scope.priceRegionDatas = data.priceRegionData;
				scope.servicesData = data.servicesData;
				scope.planDatas = data.planDatas;
				scope.agreementTypes = data.agreementTypes;
			});
			
			scope.addVendorDetails = function () {
	        	if (scope.detailsFormData.contentCode && scope.detailsFormData.loyaltyType 
	        			&& scope.detailsFormData.loyaltyShare && scope.detailsFormData.priceRegion) {
	        		
										              scope.vendorDetailsDatas
												.push({
													loyaltyType : scope.detailsFormData.loyaltyType,
													contentCode : scope.detailsFormData.contentCode,
													loyaltyShare : scope.detailsFormData.loyaltyShare,
													priceRegion : scope.detailsFormData.priceRegion
												});
	          
	              scope.detailsFormData.loyaltyShare = undefined;
	        	}
	        };
	        scope.deleteVendorDetails = function (index) {
	              scope.vendorDetailsDatas.splice(index,1);
	        };
	          
			scope.onFileSelect = function($files) {
	            scope.file = $files[0];
	        };
				
			scope.submit = function() {			
				this.formData.locale = $rootScope.locale.code;
				this.formData.dateFormat = 'dd MMMM yyyy';
				this.formData.vendorId = routeParams.vendorId;
				
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	        	var reqEndDate = dateFilter(scope.end.date,'dd MMMM yyyy');
	        	
	            this.formData.startDate = reqDate;
	            this.formData.endDate = reqEndDate;
				
				scope.formData.vendorDetails =new Array();
				
				if (scope.vendorDetailsDatas.length > 0) {
		              
	                 for (var i in scope.vendorDetailsDatas) {
						                   scope.formData.vendorDetails
													.push({
														contentCode : scope.vendorDetailsDatas[i].contentCode,
														loyaltyType : scope.vendorDetailsDatas[i].loyaltyType,
														loyaltyShare : scope.vendorDetailsDatas[i].loyaltyShare,
														priceRegion : scope.vendorDetailsDatas[i].priceRegion,
														locale : $rootScope.locale.code});
	                 };
	               }
					scope.json.jsonData = scope.formData;
					console.log(scope.json);			
				/*resourceFactory.VendorLemplateResource.save(this.formData, function(data) {
					location.path('/viewvendormanagement/' + data.resourceId);										
				});	*/	
				$upload.upload({
	                url: $rootScope.hostUrl+ API_VERSION +'/vendoragreement', 
	                data: scope.json,
	                file: scope.file
	              }).then(function(data) {
	                // to fix IE not refreshing the model
	                if (!scope.$$phase) {
	                  scope.$apply();
	                }
	                location.path('/vendoragreement');
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
	'$upload',
	'API_VERSION',
	'$routeParams',
	mifosX.controllers.CreateVendorAgreementController 
	]).run(function($log) {
		$log.info("CreateVendorAgreementController initialized");	
	});
}(mifosX.controllers || {}));
