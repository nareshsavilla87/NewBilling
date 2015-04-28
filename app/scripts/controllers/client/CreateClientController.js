(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateClientController: function(scope, resourceFactory, location, http, dateFilter,API_VERSION,$rootScope,PermissionService,$upload,filter,webStorage,$modal) {

    	scope.formData = {};
       
        scope.offices = [];
        scope.cities = [];
        scope.clientCategoryDatas=[];
        scope.groupNameDatas=[];

        
        scope.propertyCodes = [];

        scope.nationalityDatas = [];
        scope.genderDatas = [];
        scope.customeridentificationDatas = [];
        scope.cummunitcationDatas = [];
        scope.languagesDatas = [];
        scope.ageGroupDatas = [];
        scope.date = {};

       // var IsClientIndividual = filter('ConfigLookup')('IsClientIndividual');
        var IsClientIndividual =  webStorage.get("client_configuration").IsClientIndividual;
        if(IsClientIndividual == 'true'){
        	scope.formData.entryType ='IND';
        }else{
        	scope.formData.entryType ='ORP';
        }
        


        scope.propertyMaster = webStorage.get("is-propertycode-enabled");
        scope.clientAddInfo = webStorage.get("client-additional-data");

        resourceFactory.clientTemplateResource.get(function(data) {
            scope.offices = data.officeOptions;
            scope.formData.officeId = data.officeId;
            scope.cities=data.addressTemplateData.cityData;
            scope.clientCategoryDatas=data.clientCategoryDatas;
            scope.groupNameDatas = data.groupNameDatas;
            scope.formData.clientCategory=scope.clientCategoryDatas[0].id;
            scope.configurationProperty=data.loginConfigurationProperty.enabled;
            
            if(data.clientAdditionalData){
            scope.nationalityDatas= data.clientAdditionalData.nationalityDatas;
            scope.genderDatas= data.clientAdditionalData.genderDatas;
            scope.ageGroupDatas = data.clientAdditionalData.ageGroupDatas;
            scope.customeridentificationDatas= data.clientAdditionalData.customeridentificationDatas;
            scope.cummunitcationDatas= data.clientAdditionalData.cummunitcationDatas;
            scope.languagesDatas= data.clientAdditionalData.languagesDatas;
            }
            
            
        });
      scope.getStateAndCountry=function(city){
    	  
      	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
          		scope.formData.state = data.state;
          		scope.formData.country = data.country;
      	  });
        };
        
      
	     scope.generatePropertyPopup = function (){
	    	 $modal.open({
	    		 templateUrl: 'generateProperty.html',
	  	         controller: generatePropertyController,
	  	         resolve:{}
	  	     });
	     };
	          
	     function  generatePropertyController($scope, $modalInstance) {
	    	 console.log("generatePropertyController");
	    	 $scope.propertyTypes = [];
	    	 $scope.precinctData = [];
	    	 $scope.formData = {};
			  resourceFactory.propertyCodeTemplateResource.get(function(data) {
				  $scope.propertyTypes = data.propertyTypes;
				});
			  
			  //precinct auto complete 
				$scope.getPrecinct = function(query){
					return http.get($rootScope.hostUrl+API_VERSION+'/address/city/', {
		        	      params: {
		        	    	  		query: query
		        	      		   }
		        	    }).then(function(res){   
		        	    	 $scope.precinctData=res.data;	
		        	      return $scope.precinctData;
		        	    });
	             };   
				
				$scope.getPrecinctDetails = function(precinct){
					if(precinct!=undefined){
					    for(var i in $scope.precinctData){
					    	if(precinct==$scope.precinctData[i].cityName){
					    		$scope.precinct = $scope.precinctData[i].cityCode.substr(0,2);
				          		$scope.formData.state =  $scope.precinctData[i].state;
				          		$scope.formData.country = $scope.precinctData[i].country;
				          		break;
				          }else{
				        	  
								delete $scope.formData.state;
					    		delete $scope.formData.country;
							}
						}
					  }else{
						    
							delete $scope.formData.state;
				    		delete $scope.formData.country; 
					  }
				};
				
				$scope.getPropertyCode=function(unitCode){
					if($scope.precinct !=undefined&&$scope.formData.parcel!=undefined&&$scope.formData.buildingCode!=undefined && $scope.formData.floor!=undefined){
				    $scope.formData.propertyCode=$scope.precinct.concat($scope.formData.parcel,$scope.formData.buildingCode,$scope.formData.floor,unitCode);
					}
				}; 
	
	    	 
	    	 $scope.accept = function () {
	    		 scope.formData.addressNo = $scope.formData.propertyCode;
    			 scope.formData.street = $scope.formData.street;
    			 scope.formData.city  =  $scope.formData.precinct; 
    			 scope.formData.state =  $scope.formData.state;
    			 scope.formData.country = $scope.formData.country;
    			 scope.formData.zipCode = $scope.formData.poBox;
    			 $modalInstance.dismiss('delete');
	    		/* resourceFactory.propertyCodeResource.save({},$scope.formData,function(data){
	    			 scope.formData.addressNo = $scope.formData.propertyCode;
	    			 scope.formData.street = $scope.formData.street;
        			 scope.formData.city  =  $scope.formData.precinct; 
        			 scope.formData.state =  $scope.formData.state;
        			 scope.formData.country = $scope.formData.country;
        			 scope.formData.zipCode = $scope.formData.poBox;
	    			 $modalInstance.dismiss('delete');
	             },function(errorData){
	            	 console.log(errorData);
	             });*/
	      	 };
	         $scope.cancel = function () {
	        	 $modalInstance.dismiss('cancel');
	         };
	     }
        
    /*   // for building code base state
         scope.getPropertyCode = function(query){
	        	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
	        	      params: {
	        	    	  		query: query
	        	      		   }
	        	    }).then(function(res){   
	        	    	 scope.propertyCodes=res.data;				 
	        	      return scope.propertyCodes;
	        	    });
         };   
         
        scope.getPropertyDetails=function(propertyCode){
        	console.log(propertyCode);
        	
        if(propertyCode !=undefined){
        	for(var i in scope.propertyCodes){
        		if($scope.formData.propertyCode == propertyCode){
        			 scope.formData.street = $scope.formData.street;
        			 scope.formData.city  =  $scope.formData.precinct; 
        			 scope.formData.state = $scope.formData.state;
        			 scope.formData.country = $scope.formData.country;
        			 scope.formData.zipCode = $scope.formData.poBox;
        			 break;
        		}
        	}
         }else{
        	 delete scope.formData.street ;
			 delete scope.formData.city ;
			 delete scope.formData.state;
			 delete scope.formData.country;
			 delete scope.formData.zipCode ;
         }
        	
        };*/

        scope.onFileSelect = function($files) {
          scope.file = $files[0];
        };
        scope.setChoice = function(){
            if(this.formData.active){
                scope.choice = 1;
            }
            else if(!this.formData.active){
                scope.choice = 0;
            }
        };
        scope.dbClick = function(){
        	console.log("dbclick");
        	return false;
        };

        scope.submit = function() {
        	 scope.flag = true;
            var reqDate = dateFilter(new Date(),'dd MMMM yyyy');
            this.formData.locale = $rootScope.locale.code;
            this.formData.active = true;
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.activationDate = reqDate;
            this.formData.flag=scope.configurationProperty;
            this.formData.locale = $rootScope.locale.code;
            this.formData.dateFormat = 'dd MMMM yyyy';
            if(scope.date.dateOfBirth){this.formData.dateOfBirth = dateFilter(scope.date.dateOfBirth,'dd MMMM yyyy');}
            resourceFactory.clientResource.save(this.formData,function(data){
            	
              if (scope.file) {
            	  $upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                  // to fix IE not refreshing the model
                  if (!scope.$$phase) {
                    scope.$apply();
                  }
                  if(scope.clientAddInfo){
            		  location.path('/clientadditionalinfo/' + data.resourceId);
            	  }else if(PermissionService.showMenu('READ_CLIENT')){
                	  location.path('/viewclient/'+data.resourceId);
            	  }else{
                	  location.path('/clients');
            	  }
                });
              } else{
            	  if(scope.clientAddInfo){
            		  location.path('/clientadditionalinfo/' + data.resourceId);
            	  }else if(PermissionService.showMenu('READ_CLIENT')){
            		  location.path('/viewclient/' + data.resourceId);
            	  }else{
            		  location.path('/clients');
            	  }
              }
            },function(errData){
          	  scope.flag = false;
            });
          };
    }
  });
  mifosX.ng.application.controller('CreateClientController', [
                                                              '$scope',
                                                              'ResourceFactory', 
                                                              '$location', 
                                                              '$http', 
                                                              'dateFilter',
                                                              'API_VERSION',
                                                              '$rootScope',
                                                              'PermissionService',
                                                              '$upload',
                                                              '$filter',
                                                              'webStorage',
                                                              '$modal',
                                                              mifosX.controllers.CreateClientController]).run(function($log) {
    $log.info("CreateClientController initialized");
  });
}(mifosX.controllers || {}));
