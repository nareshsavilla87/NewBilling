(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewContractController: function(scope, routeParams , location,resourceFactory ,PermissionService) {
        scope.contractperiod = [];
        scope.PermissionService = PermissionService;
        resourceFactory.contractResource.get({subscriptionId: routeParams.id} , function(data) {
            scope.contractperiod = data;
           
        });

        scope.deletecontract = function (){
            resourceFactory.contractResource.remove({subscriptionId: routeParams.id} , {} , function(data) {
                  location.path('/contract');
            });
          };
    
    }
  });
  mifosX.ng.application.controller('ViewContractController', ['$scope', '$routeParams', '$location','ResourceFactory','PermissionService', mifosX.controllers.ViewContractController]).run(function($log) {
    $log.info("ViewContractController initialized");
  });
}(mifosX.controllers || {}));
