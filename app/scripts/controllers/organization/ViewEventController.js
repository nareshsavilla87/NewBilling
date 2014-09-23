(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewEventController: function(scope, routeParams , location,resourceFactory,PermissionService ) {		
        scope.event = [];
        scope.status = [];
        scope.PermissionService = PermissionService;
        resourceFactory.eventEditResource.get({eventId: routeParams.id} , function(data) {
            scope.event = data;
            scope.status=data.statusData;
           
        });

        scope.deleteEvent = function (){
            resourceFactory.eventEditResource.delete({eventId: routeParams.id} , {} , function(data) {
                  location.path('/event');
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    
    }
  });
  mifosX.ng.application.controller('ViewEventController', ['$scope', '$routeParams', '$location','ResourceFactory','PermissionService', mifosX.controllers.ViewEventController]).run(function($log) {
    $log.info("ViewEventController initialized");
  });
}(mifosX.controllers || {}));