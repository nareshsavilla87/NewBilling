(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventPricesController: function(scope, routeParams, location, resourceFactory, $modal, route) {		
        scope.pricing = [];      
        resourceFactory.eventpriceResource.getprice({eventId: routeParams.id} , function(data) {        	   	
            scope.pricing = data; 
            scope.eventId = routeParams.id;
        });
        scope.routeTo = function(id){
    		location.path('/viewEventPrice/'+ id);
        };
     
        /**
       	 * Delete EventPrice
       	 * */
      scope.deleteEventPrice = function (id){
      	scope.eventPriceId = id;
          	 $modal.open({
  	                templateUrl: 'deletePopupForEventPrice.html',
  	                controller: approve,
  	                resolve:{}
  	        });
      };
          
      function  approve($scope, $modalInstance) {
      		$scope.approve = function () {
              	resourceFactory.eventpriceResource.remove({eventId: scope.eventPriceId}, {}, function(data) {
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
  mifosX.ng.application.controller('ViewEventPricesController', [
      '$scope', 
      '$routeParams',
      '$location',
      'ResourceFactory',
      '$modal',
      '$route',
      mifosX.controllers.ViewEventPricesController
      ]).run(function($log) {
    	  $log.info("ViewPriceController initialized");
  });
}(mifosX.controllers || {}));