(function(module) {
  mifosX.controllers = _.extend(module, {
    ChargeVariantController: function(scope, resourceFactory,location,PermissionService) {
        scope.chargevariantss = [];
        scope.PermissionService = PermissionService;
        resourceFactory.chargevariantResource.query(function(data) {
            scope.chargevariants = data;
        });
    }
  });
  mifosX.ng.application.controller('ChargeVariantController', [
      '$scope', 
      'ResourceFactory',
      '$location',
      'PermissionService',
      mifosX.controllers.ChargeVariantController
      ]).run(function($log) {
    	  $log.info("ChargeVariantController initialized");
      });
}(mifosX.controllers || {}));