(function(module) {
  mifosX.controllers = _.extend(module, {
	  EventController: function(scope, resourceFactory, location, PermissionService, route, $modal) {
        scope.eventss = [];
        scope.PermissionService = PermissionService;
        resourceFactory.eventResource.get(function(data) {      	
            scope.events = data;         
        });
        scope.routeTo = function(id){
        		location.path('/viewEvent/'+ id);
        };
        
        /**
       	 * Delete Event
       	 * */
         scope.deleteEvent = function (id){
         	scope.eventId=id;
          	 $modal.open({
  	                templateUrl: 'deletePopupForEvent.html',
  	                controller: approve,
  	                resolve:{}
  	        });
         };
          
      	function  approve($scope, $modalInstance) {
      		$scope.approve = function () {
              	resourceFactory.eventEditResource.remove({eventId: scope.eventId} , {} , function(data) {
                    route.reload();
              	});
              	$modalInstance.dismiss('delete');
      		};
            $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
            };
        }
        
    }
  });
  mifosX.ng.application.controller('EventController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     'PermissionService',
     '$route',
     '$modal',
     mifosX.controllers.EventController
     ]).run(function($log) {
    	 $log.info("EventController initialized");
  });
}(mifosX.controllers || {}));