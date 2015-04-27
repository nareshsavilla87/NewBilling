(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewServiceController: function(scope, routeParams, location, resourceFactory,PermissionService,$modal) {
        scope.service = [];
        scope.PermissionService = PermissionService; 
        scope.serviceId = routeParams.id;
    
        resourceFactory.serviceResource.get({serviceId: routeParams.id} , function(data) {
            scope.service = data;
        });
        
        scope.deleteservice = function (){
        	 $modal.open({
				 templateUrl: 'deleteservice.html',
				 controller: deleteServiceController,
				 resolve:{}
			 });
          };
          
         function deleteServiceController($scope, $modalInstance) {
      	  	
        	  $scope.approveDeleteService = function () {
        		  
        		  resourceFactory.serviceResource.remove({serviceId: scope.serviceId} , {} , function() {
        			  $modalInstance.close('delete');
                      location.path('/services');
                });
              };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
              };
          };
    }
  });
  mifosX.ng.application.controller('ViewServiceController', [
                                                             '$scope', 
                                                             '$routeParams', 
                                                             '$location', 
                                                             'ResourceFactory',
                                                             'PermissionService',
                                                             '$modal',
                                                             mifosX.controllers.ViewServiceController]).run(function($log) {
    $log.info("ViewServiceController initialized");
  });
}(mifosX.controllers || {}));
