(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreatePartnerController: function(scope, resourceFactory, location,$rootScope,webStorage,$upload,API_VERSION) {
        scope.offices = [];
        scope.partnerTypes = [];
        scope.currencydatas = [];
        scope.formData = {};
        
       	 resourceFactory.partnerTemplateResource.get(function(data) {
            scope.offices = data.allowedParents;
          //  scope.partnerTypes = data.partnerTypes;
            scope.currencydatas = data.currencyData.currencyOptions;
            scope.cityDatas = data.citiesData;
            scope.formData = {
      //        partnerType : scope.partnerTypes[0].id,
              officeType : data.officeTypes[1].id,
            };
        });
        
        scope.getStateAndCountry=function(city){
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData.state = data.state;
            		scope.formData.country = data.country;
        	  });
          };
          scope.onFileSelect = function($files) {
            scope.file = $files[0];
           
          };
          
          scope.reset123 = function(){
       	   webStorage.add("callingTab", {someString: "Partners" });
          };
        
        scope.submit = function() {   
          //this.formData.parentId =1;
          this.formData.locale ="en";
          scope.formData.roleName ="Partner";
          
          resourceFactory.partnerResource.save(this.formData,function(data){
        	  
        	  if (scope.file) {
            	  $upload.upload({
                  url: $rootScope.hostUrl+ API_VERSION +'/partners/'+data.resourceId+'/images', 
                  data: {},
                  file: scope.file
                }).then(function(imageData) {
                    // to fix IE not refreshing the model
                    if (!scope.$$phase) {
                      scope.$apply();
                    }
                    location.path('/viewpartner/' +data.resourceId);
                  });
        	  }else{
        		  location.path('/viewpartner/' +data.resourceId);
        	  }	
          });
        };
    }
  });
  mifosX.ng.application.controller('CreatePartnerController', 
  ['$scope', 
   'ResourceFactory', 
   '$location',
   '$rootScope',
   'webStorage', 
   '$upload',
   'API_VERSION',
    mifosX.controllers.CreatePartnerController
    ]).run(function($log) {
    $log.info("CreatePartnerController initialized");
  });
}(mifosX.controllers || {}));