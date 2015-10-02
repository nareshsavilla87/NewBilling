(function(module) {
	mifosX.controllers = _.extend(module, {				
		CreateVendorAgreementController : function(scope,routeParams,resourceFactory, 
				location, dateFilter,validator, $rootScope, $upload, API_VERSION, routeParams,$modal) {
			
			scope.formData = {};
			scope.detailsFormData={};
			
			 
			 scope.start ={date:new Date()};
			 scope.end ={date:new Date()};
			 scope.minDate = new Date();
			 scope.vendorId = routeParams.vendorId;
			 
			 scope.formData.contentType = "Service";
						
			resourceFactory.VendorAgreementTemplateResource.get({'vendorId':scope.vendorId},function(data) {
				scope.priceRegionDatas = data.priceRegionData;
				scope.servicesData = data.servicesData;
				scope.planDatas = data.planDatas;
				scope.agreementTypes = data.agreementTypes;
			});
			
			
			scope.durationSelect = function(id,param,index){
				scope.durationDatas = [];
				for(var i in scope.planDatas){
					if(scope.planDatas[i].id == id && scope.planDatas[i].isPrepaid == "Y"){
						
						resourceFactory.VendorAgreementTDurationemplateResource.getTemplateData({'planId':id},function(data) {
							if(param == 'false'){
								scope.durationDatas = data;
								if(scope.durationDatas.length > 0){
									scope.detailsFormData.durationId = scope.durationDatas[0].id;
								}else scope.detailsFormData.durationId = 0;
								
								scope.detailsFormData.planType = "Y";
							}else{
								scope.isExistedDurationEnable = true;
								scope.vendorDetailsDatas[index].durationDatas = data;
								if(data.length > 0){
									scope.vendorDetailsDatas[index].durationId = data[0].id;
								}else scope.vendorDetailsDatas[index].durationId = 0;
								
								scope.vendorDetailsDatas[index].planType = "Y";
							}
						});
						break;
					}else{
						if(param == 'false') {
							scope.detailsFormData.planType = "N";
						}
						else{
								delete scope.vendorDetailsDatas[index].durationId;
								scope.vendorDetailsDatas[index].planType = "N";
							
								scope.isExistedDurationEnable = false;
				            	angular.forEach(scope.vendorDetailsDatas,function(value,key){
									
									if(value.planType=="Y"){
											scope.isExistedDurationEnable = true;
									}
								});
						}
					}
				}
				
			};
			
			 scope.vendorDetailsDatas=[];
			scope.addVendorDetails = function () {
	        	if (scope.detailsFormData.contentCode && scope.detailsFormData.loyaltyType 
	        			&& scope.detailsFormData.loyaltyShare && scope.detailsFormData.priceRegion) {
	        				
	        				var data = {};
	        				data.contentCode 		= scope.detailsFormData.contentCode;
							data.loyaltyType 		= scope.detailsFormData.loyaltyType;
							data.loyaltyShare 		= scope.detailsFormData.loyaltyShare;
							data.contentCost 		= scope.detailsFormData.contentCost;
							data.contentSellPrice 	= scope.detailsFormData.contentSellPrice;
							data.priceRegion 		= scope.detailsFormData.priceRegion;
							
						if(scope.detailsFormData.planType == "Y" && scope.detailsFormData.durationId){
							data.durationId 	= scope.detailsFormData.durationId;
							data.durationDatas 	= scope.durationDatas;
							data.planType 		= "Y";
							scope.isExistedDurationEnable = true;
							
	        				scope.vendorDetailsDatas.push(data);
	        				scope.detailsFormData={};
	        				
						}else if(scope.detailsFormData.planType != "Y"){
							data.planType 		= "N";
							scope.vendorDetailsDatas.push(data);
	        				scope.detailsFormData={};
						}
	        				
	         
	        	}
	        };
	        
	        scope.deleteVendorDetails = function (index) {
	            
	        	var modalInstance = $modal.open({
	                templateUrl: 'approvepopup.html',
	                controller: ApprovePopupController,
	                resolve:{}
	            });
	        	
	            modalInstance.result.then(function(){
	            	
	            	scope.vendorDetailsDatas.splice(index,1);
	            	
	            	scope.isExistedDurationEnable = false;
	            	angular.forEach(scope.vendorDetailsDatas,function(value,key){
						
						if(value.planType=="Y"){
								scope.isExistedDurationEnable = true;
						}
					});
	            	
	            }); 
	        };
	        
	        function ApprovePopupController($scope, $modalInstance) {
	            $scope.approve = function () { $modalInstance.close('delete'); };
	            $scope.cancel = function () { $modalInstance.dismiss('cancel');};
	        };
	        
	        scope.resetOptions = function(){
	        	scope.vendorDetailsDatas  = [];
	        	scope.detailsFormData={};
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
	            scope.formData.endDate =  dateFilter(scope.end.date,'dd MMMM yyyy');
				
				scope.formData.vendorDetails =[];
				
				for (var i in scope.vendorDetailsDatas) {
               	 
						var data = {};
    					data.contentCode 		= scope.vendorDetailsDatas[i].contentCode;
						data.loyaltyType 		= scope.vendorDetailsDatas[i].loyaltyType;
						data.loyaltyShare 		= scope.vendorDetailsDatas[i].loyaltyShare;
						data.contentCost 		= scope.vendorDetailsDatas[i].contentCost;
						data.contentSellPrice 	= scope.vendorDetailsDatas[i].contentSellPrice;
						data.priceRegion 		= scope.vendorDetailsDatas[i].priceRegion;
						data.locale 			= $rootScope.locale.code;
						if(scope.vendorDetailsDatas[i].planType == "Y"){
							data.durationId 	= scope.vendorDetailsDatas[i].durationId || 0;
						} 
						
						scope.formData.vendorDetails.push(data);
                };
				
				scope.json = {};
				scope.json.jsonData = scope.formData;
				
				for(var i in scope.vendorDetailsDatas){
					if(scope.vendorDetailsDatas[i].planType == "Y" && !scope.vendorDetailsDatas[i].durationId){
						$modal.open({
			                templateUrl: 'nopricesnotifypopup.html',
			                controller: NoPricesNotifyPopupController,
			                resolve:{
			                	contentCodeId : function(){
			                		return scope.vendorDetailsDatas[i].contentCode;
			                	}
			                }
			            });
						scope.noPricesFound = true;
						break;
					}else{
						scope.noPricesFound = false;
					}
				}
				
				function NoPricesNotifyPopupController($scope, $modalInstance,contentCodeId) {
					for(var index in scope.planDatas){
						if(scope.planDatas[index].id == contentCodeId){
							$scope.planCode = scope.planDatas[index].planCode;
							break;
						}
					}
		            $scope.close = function () { $modalInstance.dismiss('cancel');};
		        };
				
				if(!scope.noPricesFound){
					$upload.upload({
		                url: $rootScope.hostUrl+ API_VERSION +'/vendoragreement', 
		                data: scope.json,
		                file: scope.file
		              }).then(function(data) {
		                // to fix IE not refreshing the model
		                if (!scope.$$phase) {
		                  scope.$apply();
		                }
		                location.path('/viewvendormanagement/'+routeParams.vendorId);
		              });
				}
			};						
		}			
	});
	mifosX.ng.application.controller('CreateVendorAgreementController', [ 
	'$scope', 
	'$routeParams',
	'ResourceFactory', 
	'$location', 
	'dateFilter',
	'HTValidationService', 
	'$rootScope',
	'$upload',
	'API_VERSION',
	'$routeParams',
	'$modal',
	mifosX.controllers.CreateVendorAgreementController 
	]).run(function($log) {
		$log.info("CreateVendorAgreementController initialized");	
	});
}(mifosX.controllers || {}));
