(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewMessageController: function(scope, routeParams , route, location, resourceFactory, http,PermissionService, $modal) {
        scope.messaging = [];
        scope.PermissionService = PermissionService;
        
        resourceFactory.messageSaveResource.get({messageId: routeParams.id} , function(data) {
            scope.messaging = data;                                                
        });
        
        /**
         * Delete message template 
        * */
       scope.deletemessage = function (){
          	 $modal.open({
  	                templateUrl: 'messagetemplate.html',
  	                controller: messagetemplate,
  	                resolve:{}
  	        });
          };
          
      	function  messagetemplate($scope, $modalInstance) {
      		$scope.messagetemplate = function () {
      			resourceFactory.messageSaveResource.remove({messageId: routeParams.id} , {} , function() {
      				 location.path('/message');      
              });
              	 $modalInstance.dismiss('delete');
           };
            $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
            };
          }                          
    }
  });
  mifosX.ng.application.controller('ViewMessageController', [
     '$scope', 
     '$routeParams', 
     '$route', 
     '$location', 
     'ResourceFactory', 
     '$http',
     'PermissionService',
     '$modal',
     mifosX.controllers.ViewMessageController]).run(function($log) {
    $log.info("ViewMessageController initialized");
  });
}(mifosX.controllers || {}));
