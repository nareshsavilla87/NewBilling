(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewProvisioningMappingController: function(scope, routeParams , route, location, resourceFactory, http,PermissionService,$modal,webStorage) {
		  
        scope.provisiongdata = {}; 
        scope.PermissionService =  PermissionService;
        resourceFactory.provisioningMappingResource.get({provisioningId: routeParams.id} , function(data) {
            scope.provisiongdata = data;                                                
        });     
        
        scope.deleteProvisioning = function (){
          	 $modal.open({
  	                templateUrl: 'provision.html',
  	                controller: approve,
  	                resolve:{}
  	        });
          };
          
      	function  approve($scope, $modalInstance) {
      		$scope.approve = function () {
      			 resourceFactory.provisioningMappingResource.remove({provisioningId: routeParams.id} , {} , function() {
      				webStorage.add("callingTab", {someString: "provisioningCommandTab" }); 
      				location.path('/mappingconfig'); 
              });
              	 $modalInstance.dismiss('delete');
           };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
            };
          }   
    }
  
  
  });
  mifosX.ng.application.controller('ViewProvisioningMappingController', [
    '$scope', 
    '$routeParams', 
    '$route', 
    '$location', 
    'ResourceFactory', 
    '$http',
    'PermissionService', 
    '$modal',
    'webStorage',
    mifosX.controllers.ViewProvisioningMappingController]).run(function($log) {
    $log.info("ViewProvisioningMappingController initialized");
  });
}(mifosX.controllers || {}));
