(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewCurrencyDetailsController: function(scope, routeParams , route, location, resourceFactory, http,PermissionService) {
		
        scope.viewcurrencydetails=[];
        scope.PermissionService = PermissionService;
        resourceFactory.currencyResource.getCurrencyDetails({id: routeParams.id} , function(data) {
        
            scope.viewcurrencydetails = data; 
            
        });
        scope.deletemessage = function (){
            resourceFactory.currencyResource.delete({id: routeParams.id} , {} , function(data) {
                  location.path('/currencydetails');
                  // added dummy request param because Content-Type header
					// gets removed
                  // if the request does not contain any data (a request body)
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewCurrencyDetailsController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http','PermissionService', mifosX.controllers.ViewCurrencyDetailsController]).run(function($log) {
    $log.info("ViewCurrencyDetailsController initialized");
  });
}(mifosX.controllers || {}));