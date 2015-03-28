(function(module) {
	mifosX.controllers = _.extend(module, {				
		CreateVendorAgreementController : function(scope,resourceFactory, 
				location, dateFilter,validator, $rootScope, $upload, API_VERSION) {
			
			scope.priceRegionDatas = [];
			scope.servicesData = [];
			scope.planDatas = [];
			scope.agreementTypes = [];
			
			scope.formData = {};
			scope.json = {};
			scope.attributesFormData={};
			 scope.mediaassetAttributes=[];
			 scope.start ={};
			 var datetime = new Date();
			 scope.start.date = datetime;
			 scope.minDate = new Date();
						
			resourceFactory.VendorAgreementTemplateResource.getTemplateDetails(function(data) {
				scope.priceRegionDatas = data.priceRegionData;
				scope.servicesData = data.servicesData;
				scope.planDatas = data.planDatas;
				scope.agreementTypes = data.agreementTypes;
			});
			
			scope.addMedia = function () {
	        	if (scope.attributesFormData.contentCode && scope.attributesFormData.loyaltyType 
	        			&& scope.attributesFormData.loyaltyShare && scope.attributesFormData.priceRegion) {
	        		
										              scope.mediaassetAttributes
												.push({
													loyaltyType : scope.attributesFormData.loyaltyType,
													contentCode : scope.attributesFormData.contentCode,
													loyaltyShare : scope.attributesFormData.loyaltyShare,
													priceRegion : scope.attributesFormData.priceRegion
												});
	          
	              scope.attributesFormData.loyaltyShare = undefined;
	        	}
	        };
	        scope.deleteMedia = function (index) {
	              scope.mediaassetAttributes.splice(index,1);
	        };
	          
			scope.onFileSelect = function($files) {
	            scope.file = $files[0];
	        };
				
			scope.submit = function() {			
				this.formData.locale = $rootScope.locale.code;
				this.formData.dateFormat = 'dd MMMM yyyy';
				
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	        	var reqEndDate = dateFilter(scope.end.date,'dd MMMM yyyy');
	        	
	            this.formData.startDate = reqDate;
	            this.formData.endDate = reqEndDate;
				
				scope.formData.vendorDetails =new Array();
				
				if (scope.mediaassetAttributes.length > 0) {
		              
	                 for (var i in scope.mediaassetAttributes) {
						                   scope.formData.vendorDetails
													.push({
														contentCode : scope.mediaassetAttributes[i].contentCode,
														loyaltyType : scope.mediaassetAttributes[i].loyaltyType,
														loyaltyShare : scope.mediaassetAttributes[i].loyaltyShare,
														priceRegion : scope.mediaassetAttributes[i].priceRegion,
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
	mifosX.controllers.CreateVendorAgreementController 
	]).run(function($log) {
		$log.info("CreateVendorAgreementController initialized");	
	});
}(mifosX.controllers || {}));
