(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewAssociationController: function(scope, routeParams, resourceFactory) {
        scope.association = {};   
        scope.clientId=routeParams.clientId;
        resourceFactory.associationResource.getAssociation({clientId: routeParams.clientId,id:routeParams.id} , function(data) {
            scope.association = data;                                                
        });
    }
  });
  mifosX.ng.application.controller('ViewAssociationController', ['$scope', '$routeParams', 'ResourceFactory', mifosX.controllers.ViewAssociationController]).run(function($log) {
    $log.info("ViewAssociationController initialized");
  });
}(mifosX.controllers || {}));