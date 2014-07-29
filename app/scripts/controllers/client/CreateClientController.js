(function(module) {
  mifosX.controllers = _.extend(module, {
    CreateClientController: function(scope, resourceFactory, location, http, dateFilter,API_VERSION,$rootScope,PermissionService) {
        scope.offices = [];
        scope.staffs = [];
        scope.first = {};
        scope.first.date = new Date();
        scope.formData = {};
       
        scope.clientCategoryDatas=[];
        scope.configurationProperty=[];
       scope.formData.entryType ='ORP';
        
        resourceFactory.clientTemplateResource.get(function(data) {
            scope.offices = data.officeOptions;
            scope.staffs = data.staffOptions;
            scope.formData.officeId = scope.offices[0].id;
            scope.clientCategoryDatas=data.clientCategoryDatas;
            scope.groupNameDatas = data.groupNameDatas;
            scope.cities=data.addressTemplateData.cityData;
            scope.configurationProperty=data.configurationProperty.enabled;
            scope.formData.clientCategory=scope.clientCategoryDatas[0].id;
            scope.groupNameDatas = data.groupNameDatas;
            
        });
        
       
        scope.changeOffice =function(officeId) {
          resourceFactory.clientTemplateResource.get({staffInSelectedOfficeOnly : false, officeId : officeId
              }, function(data) {
            scope.staffs = data.staffOptions;
           
          });
        };

       /* $("#city").change(function(){
        	
        	resourceFactory.AddressTemplateResource.get({city : scope.formData.city}, function(data) {
        		scope.formData.state = data.state;
        		scope.formData.country = data.country;
         
        });
        });*/
        /*scope.getStateAndCountry=function(city){
        	alert(1);
        };*/
      scope.getStateAndCountry=function(city){
    	  
      	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
          		scope.formData.state = data.state;
          		scope.formData.country = data.country;
      	  });
        };
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
            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
            this.formData.locale = 'en';
            this.formData.active = true;
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.activationDate = reqDate;
            this.formData.flag=scope.configurationProperty;
            	resourceFactory.clientResource.save(this.formData,function(data){

                    if (scope.file) {
                      http.uploadFile({
                        url: $rootScope.hostUrl+ API_VERSION +'/clients/'+data.clientId+'/images', 
                        data: {},
                        file: scope.file
                      }).then(function(imageData) {
                        // to fix IE not refreshing the model
                        if (!scope.$$phase) {
                          scope.$apply();
                        }
                        if(PermissionService.showMenu('READ_CLIENT'))
                      	  location.path('/viewclient/'+data.resourceId);
                        else
                      	  location.path('/clients');
                      });
                    } else{
                  	  if(PermissionService.showMenu('READ_CLIENT'))
                  		  location.path('/viewclient/' + data.resourceId);
                  	  else
                  		  location.path('/clients');
                    }
                  },function(errData){
                	  scope.flag = false;
                  });
            
          };
    }
  });
  mifosX.ng.application.controller('CreateClientController', ['$scope', 'ResourceFactory', '$location', '$http', 'dateFilter','API_VERSION','$rootScope','PermissionService', mifosX.controllers.CreateClientController]).run(function($log) {
    $log.info("CreateClientController initialized");
  });
}(mifosX.controllers || {}));
