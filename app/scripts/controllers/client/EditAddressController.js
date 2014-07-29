(function(module) {
	mifosX.controllers = _.extend(module,{
		EditAddressController : function(scope,webStorage,routeParams,resourceFactory,dateFilter, location) {
							
							scope.formData = {};
							scope.addressTypeData=[];
							 var clientData = webStorage.get('clientData');
					            scope.displayName=clientData.displayName;
					            scope.hwSerialNumber=clientData.hwSerialNumber;
					            scope.statusActive=clientData.statusActive;
					            scope.accountNo=clientData.accountNo;
					            scope.officeName=clientData.officeName;
					            scope.balanceAmount=clientData.balanceAmount;
					            scope.currency=clientData.currency;
					            scope.imagePresent=clientData.imagePresent;
					            scope.categoryType=clientData.categoryType;
						        scope.email=clientData.email;
						        scope.phone=clientData.phone;
							resourceFactory.addressEditResource.getAll({clientId: routeParams.id} , function(data) {	
                                scope.formData=data; 
                                scope.addressTypeData=data.addressOptionsData;
                                scope.cityDatas=data.cityData;
                                /*$("#city").change(function(){               
                                	scope.formData.state = '';
            	            		scope.formData.country = '';
                	            	resourceFactory.AddressTemplateResource.get({city : scope.formData.city}, function(data) {           	            		
                	            		scope.formData.state = data.state;
                	            		scope.formData.country = data.country;
                	             
                	            });
                	            });*/
							});		
							
							scope.getStateAndCountry=function(city){
								scope.formData.state = '';
        	            		scope.formData.country = '';
						      	  resourceFactory.AddressTemplateResource.get({city : scope.formData.city}, function(data) {
						          		scope.formData.state = data.state;
						          		scope.formData.country = data.country;
						      	  });
						        };
							/*resourceFactory.clientTemplateResource.get(function(data) {
						           
					            scope.cities=data.addressTemplateData.cityData;
					            
					        });*/
							scope.submit = function() {
								
								/*if(this.formData.addressTypeId=='1'){
									this.formData.addressType='PRIMARY';								
								}else{
									this.formData.addressType='BILLING';
								}*/
								this.formData.entityName='EnterName';
								this.formData.parentEntityId='-1';
								this.formData.entityCode='EnterCode';
								this.formData.zipCode=this.formData.zip;
								delete this.formData.addressOptionsData;
								delete this.formData.cityData;
								delete this.formData.datas;
								delete this.formData.addressKey;
								delete this.formData.zip;
								delete this.formData.id;
								delete this.formData.addressKey;
								delete this.formData.addressTypeId;
								
								resourceFactory.addressResource.update({clientId: routeParams.id},
										this.formData, function(data) {
											location.path('/viewclient/'
													+ routeParams.id);
										});
							};
						}
					});
	mifosX.ng.application.controller('EditAddressController', ['$scope','webStorage', '$routeParams', 'ResourceFactory','dateFilter', '$location', mifosX.controllers.EditAddressController]).run(function($log) {
	    $log.info("EditAddressController initialized");
	  });
	
}(mifosX.controllers || {}));