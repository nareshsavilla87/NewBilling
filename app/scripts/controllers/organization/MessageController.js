(function(module) {
  mifosX.controllers = _.extend(module, {
	  MessageController: function(scope, resourceFactory,location,PermissionService) {
	        scope.message = [];
	        scope.PermissionService = PermissionService;
	        resourceFactory.messageSaveResource.getAllMessages(function(data) {
	            scope.message = data;
	        });
	        scope.routeTo = function(id){
	            location.path('/viewmessage/'+ id);
	          };
	    }
  });
  mifosX.ng.application.controller('MessageController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.MessageController]).run(function($log) {
    $log.info("MessageController initialized");
  });
}(mifosX.controllers || {}));