(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventPriceController: function(scope, routeParams, location, resourceFactory, PermissionService, $modal) {		
        scope.pricedata = [];     
        scope.PermissionService = PermissionService;
        resourceFactory.eventPriceEditResource.geteventpricedetail({id: routeParams.id} , function(data) {
        	scope.eventId = data.eventId;
            scope.pricedata = data;  
           // scope.clientTypes=data.clientTypes;
            for(var i = 0; i < scope.pricedata.clientTypes.length; i++){
            	if(scope.pricedata.clientTypes[i].id == scope.pricedata.clientTypeId){
            		scope.clientTypeValue = scope.pricedata.clientTypes[i].type;
            	}
            }
        });

          /**
         	 * Delete EventPrice
         	 * */
        scope.deleteEventPrice = function (id){
        	scope.eventId = id;
            	 $modal.open({
    	                templateUrl: 'deletePopupForEventPrice.html',
    	                controller: approve,
    	                resolve:{}
    	        });
        };
            
        function  approve($scope, $modalInstance) {
        		$scope.approve = function () {
                	resourceFactory.eventpriceResource.remove({eventId: routeParams.id} , {} , function(data) {
                		location.path('/viewEventPrices/'+ scope.eventId); 
                	});
                	$modalInstance.dismiss('delete');
        		};
              $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
              };
          }
    
    }
  });
  mifosX.ng.application.controller('ViewEventPriceController', [
      '$scope', 
      '$routeParams',
      '$location',
      'ResourceFactory',
      'PermissionService', 
      '$modal',
      mifosX.controllers.ViewEventPriceController
      ]).run(function($log) {
    	  $log.info("ViewEventPriceController initialized");
  });
}(mifosX.controllers || {}));