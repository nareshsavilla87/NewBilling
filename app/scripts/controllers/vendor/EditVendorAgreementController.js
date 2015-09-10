(function(module) {
	mifosX.controllers = _.extend(module, {				
		EditVendorAgreementController : function(scope,resourceFactory, 
				location, dateFilter,validator, $rootScope, $upload, API_VERSION, routeParams,$modal) {
			
			scope.formData = {};
			scope.detailsFormData={};
			 scope.deleteAttributes=[];
			 
			 scope.start ={};
			 scope.end ={};
			 scope.vendorId = routeParams.vendorId;
			 scope.agreementId = routeParams.id;
			
			 scope.vendorDetailsDatas=[];
			resourceFactory.VendorAgreementResource.getTemplateDetails({vendorAgreementId:scope.agreementId,resourceType:'details',template:true}, function(data) {
				scope.start.date = new Date(data.date);
				scope.minDate = new Date(data.date);
				
				scope.priceRegionDatas = data.priceRegionData;
				scope.servicesData = data.servicesData;
				scope.planDatas = data.planDatas;
				scope.agreementTypes = data.agreementTypes;
				scope.start.date = new Date(dateFilter(data.agreementStartDate,'dd MMMM yyyy'));
				scope.end.date = new Date(dateFilter(data.agreementEndDate,'dd MMMM yyyy'));
				scope.vendorDetailsDatas = data.vendorAgreementDetailsData;
				angular.forEach(scope.vendorDetailsDatas,function(value,key){
					
					if(value.durationId){
						resourceFactory.VendorAgreementTDurationemplateResource.getTemplateData({'planId':value.contentCodeId},function(data) {
							scope.isExistedDurationEnable = true;
							scope.vendorDetailsDatas[key].durationDatas = data;
						});
					}
				});
				
				scope.formData .agreementStatus = data.agreementStatus;
				scope.formData .contentType = data.contentType;
			});
			
			scope.durationSelect = function(id,param,index){
				scope.durationDatas = [];
				for(var i in scope.planDatas){
					if(scope.planDatas[i].id == id && scope.planDatas[i].isPrepaid == "Y"){
						
						resourceFactory.VendorAgreementTDurationemplateResource.getTemplateData({'planId':id},function(data) {
							if(param == 'false'){
								scope.durationDatas = data;
								scope.detailsFormData.durationId = scope.durationDatas[0].id;
								scope.isDurationEnable = true;
							}else{
								scope.isExistedDurationEnable = true;
								scope.vendorDetailsDatas[index].durationDatas = data;
								scope.vendorDetailsDatas[index].durationId = data[0].id;
							}
						});
						break;
					}else{
						if(param == 'false') scope.isDurationEnable = false;
						else{
								delete scope.vendorDetailsDatas[index].durationId;
							
								for (var j in scope.vendorDetailsDatas){
									if(scope.vendorDetailsDatas[j].durationId){
										scope.isExistedDurationEnable = true;
										break;
									}else{
										scope.isExistedDurationEnable = false;
									}
								}
						}
					}
				}
				
			};
			
			scope.addVendorDetails = function () {
	        	if (scope.detailsFormData.contentCodeId && scope.detailsFormData.loyaltyType 
	        			&& (scope.detailsFormData.loyaltyShare || scope.detailsFormData.contentCost) && scope.detailsFormData.priceRegion) {
	        				
	        				var data = {};
	        				data.contentCodeId 		= scope.detailsFormData.contentCodeId;
							data.loyaltyType 		= scope.detailsFormData.loyaltyType;
							data.loyaltyShare 		= scope.detailsFormData.loyaltyShare;
							data.contentCost 		= scope.detailsFormData.contentCost;
							data.contentSellPrice 	= scope.detailsFormData.contentSellPrice;
							data.priceRegion 		= scope.detailsFormData.priceRegion;
							data.locale 			= $rootScope.locale.code;
							if(scope.isDurationEnable){
								data.durationId 	= scope.detailsFormData.durationId;
								data.durationDatas 	= scope.durationDatas;
								scope.isExistedDurationEnable = true;
							}
							
	        				scope.vendorDetailsDatas.push(data);
	        				
	        				scope.detailsFormData={};
	        				scope.isDurationEnable = false;
	         
	        	}
	        };
	        
	        scope.deleteVendorDetails = function (index) {
	            
	        	var modalInstance = $modal.open({
	                templateUrl: 'approvepopup.html',
	                controller: ApprovePopupController,
	                resolve:{}
	            });
	        	
	            modalInstance.result.then(function(){
	            	
	            	scope.deleteAttributes.push({
	            							contentCode	: scope.vendorDetailsDatas[index].contentCodeId,
	            							locale		: $rootScope.locale.code, 
	            							id			: scope.vendorDetailsDatas[index].id
	            	});
		            scope.vendorDetailsDatas.splice(index,1);
	            }); 
	        };
	        
	        function ApprovePopupController($scope, $modalInstance) {
	            $scope.approve = function () { $modalInstance.close('delete'); };
	            $scope.cancel = function () { $modalInstance.dismiss('cancel');};
	        };
	        
	        scope.resetOptions = function(){
	        	scope.vendorDetailsDatas  = [];
	        	scope.detailsFormData={};
	        	scope.isDurationEnable = false;
	        	scope.isExistedDurationEnable = false;
	        };
	          
			scope.onFileSelect = function($files) {
	            scope.file = $files[0];
	        };
				
			scope.submit = function() {			
				scope.formData.locale = $rootScope.locale.code;
				scope.formData.dateFormat = 'dd MMMM yyyy';
				scope.formData.vendorId = scope.vendorId;
				
	            scope.formData.startDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            scope.formData.endDate = dateFilter(scope.end.date,'dd MMMM yyyy');
				
				scope.formData.vendorDetails =new Array();
				scope.formData.removeVendorDetails = new Array();
		              
                 for (var i in scope.vendorDetailsDatas) {
                	 
                	 var data = {};
                	 	data.id 				= scope.vendorDetailsDatas[i].id;
     					data.contentCode 		= scope.vendorDetailsDatas[i].contentCodeId;
						data.loyaltyType 		= scope.vendorDetailsDatas[i].loyaltyType;
						data.loyaltyShare 		= scope.vendorDetailsDatas[i].loyaltyShare;
						data.contentCost 		= scope.vendorDetailsDatas[i].contentCost;
						data.contentSellPrice 	= scope.vendorDetailsDatas[i].contentSellPrice;
						data.priceRegion 		= scope.vendorDetailsDatas[i].priceRegion;
						data.locale 			= $rootScope.locale.code;
						if(scope.vendorDetailsDatas[i].durationId){
							data.durationId 	= scope.vendorDetailsDatas[i].durationId;
						} 
						
						scope.formData.vendorDetails.push(data);
                 };
                 
				if(scope.deleteAttributes.length > 0){
	        		 scope.formData.removeVendorDetails = scope.deleteAttributes;
	        	 }
				
				scope.json = {};
				scope.json.jsonData = scope.formData;
				
				$upload.upload({
	                url: $rootScope.hostUrl+ API_VERSION +'/vendoragreement/'+scope.agreementId, 
	                data: scope.json,
	                file: scope.file
	              }).then(function(data) {
	                // to fix IE not refreshing the model
	                if (!scope.$$phase) {
	                  scope.$apply();
	                }
	                location.path('/viewvendormanagement/'+routeParams.vendorId);
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
	'$modal',
	mifosX.controllers.EditVendorAgreementController 
	]).run(function($log) {
		$log.info("EditVendorAgreementController initialized");	
	});
}(mifosX.controllers || {}));
