(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditPartnerController: function(scope, resourceFactory, routeParams,location,$rootScope,webStorage,$upload,API_VERSION) {
        scope.offices = [];
        scope.partnerTypes = [];
        scope.currencydatas = [];
        scope.formData = {};
        scope.partnerId =  routeParams.partnerId;
        
       	 
       	 
       	resourceFactory.partnerResource.get({partnerId: routeParams.partnerId} , function(data) {
            scope.partner = data;
            scope.formData  = data;
            scope.formData.phone = data.phoneNumber;
            scope.officeId = scope.partner.officeId;
            webStorage.add("partnerName",scope.partner.partnerName);
            
           resourceFactory.partnerTemplateResource.get(function(data) {
               scope.offices = data.allowedParents;
             //  scope.partnerTypes = data.partnerTypes;
               scope.currencydatas = data.currencyData.currencyOptions;
               scope.cityDatas = data.citiesData;
         //        partnerType : scope.partnerTypes[0].id,
               scope.formData.officeType  = data.officeTypes[1].id;
           });
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
          this.formData.locale ="en";
          scope.formData.roleName ="Partner";
          
          delete scope.formData.id;
          delete scope.formData.officeId;
          delete scope.formData.parentName;
          delete scope.formData.openingDate;
          delete scope.formData.phoneNumber;
          delete scope.formData.balanceAmount;
          delete scope.formData.creditLimit;
          
          resourceFactory.partnerResource.update({partnerId : scope.partnerId},this.formData,function(data){
        	  
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
  mifosX.ng.application.controller('EditPartnerController', 
  ['$scope', 
   'ResourceFactory', 
   '$routeParams',
   '$location',
   '$rootScope',
   'webStorage', 
   '$upload',
   'API_VERSION',
    mifosX.controllers.EditPartnerController
    ]).run(function($log) {
    $log.info("EditPartnerController initialized");
  });
}(mifosX.controllers || {}));