(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewMessageController: function(scope, routeParams , route, location, resourceFactory, http,PermissionService) {
        scope.messaging = [];
        scope.PermissionService = PermissionService;
        resourceFactory.messageSaveResource.get({messageId: routeParams.id} , function(data) {
            scope.messaging = data;                                                
        });
        scope.deletemessage = function (){
            resourceFactory.messageSaveResource.remove({messageId: routeParams.id} , {} , function(data) {
                  location.path('/message');      
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewMessageController', ['$scope', '$routeParams', '$route', '$location', 'ResourceFactory', '$http','PermissionService', mifosX.controllers.ViewMessageController]).run(function($log) {
    $log.info("ViewMessageController initialized");
  });
}(mifosX.controllers || {}));
