(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventController: function(scope, routeParams , location, resourceFactory, PermissionService, $modal) {		
        scope.event = [];
        scope.status = [];
        scope.PermissionService = PermissionService;
        resourceFactory.eventEditResource.get({eventId: routeParams.id} , function(data) {
            scope.event = data;
            scope.status = data.statusData;
        });
          
          /**
         	 * Delete Event
         	 * */
           scope.deleteEvent = function (){
           
            	 $modal.open({
    	                templateUrl: 'deletePopupForEvent.html',
    	                controller: approve,
    	                resolve:{}
    	        });
           };
            
        	function  approve($scope, $modalInstance) {
        		$scope.approve = function () {
                	resourceFactory.eventEditResource.remove({eventId: routeParams.id} , {} , function(data) {
                		location.path('/event');
                	});
                	$modalInstance.dismiss('delete');
        		};
              $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
              };
          }
    
    }
  });
  mifosX.ng.application.controller('ViewEventController', [
      '$scope', 
      '$routeParams', 
      '$location',
      'ResourceFactory',
      'PermissionService',
      '$modal',
      mifosX.controllers.ViewEventController
      ]).run(function($log) {
    	  $log.info("ViewEventController initialized");
  });
}(mifosX.controllers || {}));