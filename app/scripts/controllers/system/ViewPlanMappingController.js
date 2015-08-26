(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewPlanMappingController: function(scope, routeParams , resourceFactory,PermissionService ) {
        scope.planMappingData = [];
        scope.id =  routeParams.id;
        scope.PermissionService =  PermissionService; 
        
        resourceFactory.planMappingResource.getPlanMapping({planMappingId: routeParams.id} , function(data) {
            scope.planMappingData = data;
        });
    }
  });
  mifosX.ng.application.controller('ViewPlanMappingController', [
     '$scope', 
     '$routeParams',
     'ResourceFactory',
     'PermissionService', 
    mifosX.controllers.ViewPlanMappingController]).run(function($log) {
    $log.info("ViewPlanMappingController initialized");
  });
}(mifosX.controllers || {}));
