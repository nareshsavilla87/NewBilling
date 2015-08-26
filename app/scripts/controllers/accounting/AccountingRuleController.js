(function(module) {
  mifosX.controllers = _.extend(module, {
    AccountingRuleController: function(scope, resourceFactory,location,PermissionService) {
    	
    	scope.PermissionService = PermissionService;
    		resourceFactory.accountingRulesResource.get(function(data){
    			scope.rules = data;
    		});	
		scope.routeTo = function(id){
            location.path('/viewaccrule/'+ id);
          };

    }
  });
  mifosX.ng.application.controller('AccountingRuleController', ['$scope', 'ResourceFactory','$location','PermissionService', mifosX.controllers.AccountingRuleController]).run(function($log) {
    $log.info("AccountingRuleController initialized");
  });
}(mifosX.controllers || {}));