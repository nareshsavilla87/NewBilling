(function(module) {
  mifosX.controllers = _.extend(module, {

	  ViewPartnerController: function(scope, routeParams , rootScope,resourceFactory,webStorage) {
		  
		  scope.agreements = [];

        resourceFactory.partnerResource.get({partnerId: routeParams.id} , function(data) {
            scope.partner = data;
            webStorage.add("partnerName",scope.partner.partnerName);
        });
        
        
		  scope.partnersTab=function(){
	        	webStorage.add("callingTab", {someString: "Partners" });
	        };
	        
	        scope.getAgreement = function(){
	        	
	        	 resourceFactory.agreementResource.get({partnerId: routeParams.id} , function(data) {
	        	  scope.agreements = data;
	        	 });
	        };
    
    }
  });
  mifosX.ng.application.controller('ViewPartnerController', 
		  ['$scope', 
		   '$routeParams',
		   '$rootScope',
		   'ResourceFactory',
		   'webStorage', mifosX.controllers.ViewPartnerController]
  ).run(function($log) {
    $log.info("ViewPartnerController initialized");
  });
}(mifosX.controllers || {}));