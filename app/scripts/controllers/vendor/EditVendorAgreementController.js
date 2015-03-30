(function(module) {
	mifosX.controllers = _.extend(module, {				
		EditVendorAgreementController : function(scope,resourceFactory, 
				location, dateFilter,validator, $rootScope, $upload, API_VERSION, routeParams) {
			
			scope.priceRegionDatas = [];
			scope.servicesData = [];
			scope.planDatas = [];
			scope.agreementTypes = [];
			
			scope.formData = {};
			scope.json = {};
			scope.attributesFormData={};
			 scope.mediaassetAttributes=[];
			 scope.deleteAttributes=[];
			 scope.start ={};
			 scope.end ={};
			 var datetime = new Date();
			 scope.start.date = datetime;
			 scope.minDate = new Date();
			 scope.vendorId = routeParams.vendorId;
			 scope.agreementId = routeParams.id;
						
			resourceFactory.VendorAgreementResource.getTemplateDetails({vendorAgreementId:scope.agreementId,resourceType:'details',template:true}, function(data) {
				scope.priceRegionDatas = data.priceRegionData;
				scope.servicesData = data.servicesData;
				scope.planDatas = data.planDatas;
				scope.agreementTypes = data.agreementTypes;
				scope.start.date = new Date(dateFilter(data.agreementStartDate,'dd MMMM yyyy'));
				scope.end.date = new Date(dateFilter(data.agreementEndDate,'dd MMMM yyyy'));
				scope.mediaassetAttributes = data.vendorAgreementDetailsData;
				scope.formData = {
						agreementStatus : data.agreementStatus,
						contentType : data.contentType
				};
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
	        	 
	        	  scope.deleteAttributes.push({contentCode:scope.mediaassetAttributes[index].contentCode,
	        		  locale:$rootScope.locale.code, id:scope.mediaassetAttributes[index].id});
	        	  console.log(scope.deleteAttributes);
	              scope.mediaassetAttributes.splice(index,1);
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
				scope.formData.removeVendorDetails = new Array();
				
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
				if(scope.deleteAttributes.length > 0){
	        		 scope.formData.removeVendorDetails = scope.deleteAttributes;
	        	 }
					scope.json.jsonData = scope.formData;
					console.log(scope.json);			
				
				$upload.upload({
	                url: $rootScope.hostUrl+ API_VERSION +'/vendoragreement/'+scope.agreementId, 
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
	mifosX.ng.application.controller('EditVendorAgreementController', [ 
	'$scope', 
	'ResourceFactory', 
	'$location', 
	'dateFilter',
	'HTValidationService', 
	'$rootScope',
	'$upload',
	'API_VERSION',
	'$routeParams',
	mifosX.controllers.EditVendorAgreementController 
	]).run(function($log) {
		$log.info("EditVendorAgreementController initialized");	
	});
}(mifosX.controllers || {}));
