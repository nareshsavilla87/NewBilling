(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServicesController: function(scope, resourceFactory,location,PermissionService,$modal,route,$rootScope) {
        
          scope.services = [];
          scope.PermissionService = PermissionService; 
          resourceFactory.serviceResource.query(function(data){
              scope.services = data;
          });
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
	       
	       scope.editSortservice = function (serviceId){
		    	 scope.serviceId = serviceId;
		     	 $modal.open({
					 templateUrl: 'sortby.html',
					 controller: editSortByController,
					 resolve:{}
				 });
		   }; 
		       
		   function editSortByController($scope, $modalInstance) {
			   $scope.formData = {};
			   $scope.formData.sortBy = "";
		     	  $scope.approveDeleteService = function () {
		     		  this.formData.locale = $rootScope.locale.code;
		     		  resourceFactory.serviceResource.update({serviceId: scope.serviceId}, $scope.formData, function() {
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
                                                          mifosX.controllers.ServicesController]).run(function($log) {
    $log.info("ServicesController initialized");
  });
}(mifosX.controllers || {}));
