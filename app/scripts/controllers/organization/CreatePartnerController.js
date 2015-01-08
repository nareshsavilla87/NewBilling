(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreatePartnerController: function(scope, resourceFactory, location,$rootScope,webStorage) {
        scope.offices = [];
        scope.partnerTypes = [];
        scope.currencydatas = [];
        scope.formData = {};
        
       	 resourceFactory.partnerTemplateResource.get(function(data) {
            scope.offices = data.allowedParents;
            scope.partnerTypes = data.partnerTypes;
            scope.currencydatas = data.currencyData.currencyOptions;
            scope.formData = {
              parentId : scope.offices[0].id,
              partnerType : scope.partnerTypes[0].id,
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
        	//this.formData.locale = $rootScope.locale.code;
        	scope.formData.roleName ="Partner";
        	
    
          resourceFactory.partnerResource.save(this.formData,function(data){
        		 location.path('/offices');
        		webStorage.add("callingTab", {someString: "Partners" });
          });
        };
    }
  });
  mifosX.ng.application.controller('CreatePartnerController', 
  ['$scope', 
   'ResourceFactory', 
   '$location','$rootScope','webStorage', 
    mifosX.controllers.CreatePartnerController
    ]).run(function($log) {
    $log.info("CreatePartnerController initialized");
  });
}(mifosX.controllers || {}));