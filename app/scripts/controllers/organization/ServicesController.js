(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServicesController: function(scope, resourceFactory,location,PermissionService,$modal,route,$rootScope,paginatorService) {
        
          scope.services = [];
          scope.PermissionService = PermissionService; 
          
          scope.serviceFetchFunction = function(offset, limit, callback) {
        	  resourceFactory.serviceResource.get({offset: offset, limit: limit} , callback);
  		  };
  		  scope.services = paginatorService.paginate(scope.serviceFetchFunction, 19);
          /*resourceFactory.serviceResource.query(function(data){
              scope.services = data;
          });*/
          scope.routeTo = function(id){
              location.path('/viewservice/'+ id);
           };
           
	      scope.deleteservice = function (serviceId){
	    	  scope.serviceId = serviceId;
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
        			  route.reload();
	             });
	           };
	           $scope.cancel = function () {
	               $modalInstance.dismiss('cancel');
	           };
	       };
	            
     }
  });
  mifosX.ng.application.controller('ServicesController', [
                                                          '$scope',
                                                          'ResourceFactory',
                                                          '$location',
                                                          'PermissionService',
                                                          '$modal',
                                                          '$route',
                                                          '$rootScope',
                                                          'PaginatorService',
                                                          mifosX.controllers.ServicesController]).run(function($log) {
    $log.info("ServicesController initialized");
  });
}(mifosX.controllers || {}));
