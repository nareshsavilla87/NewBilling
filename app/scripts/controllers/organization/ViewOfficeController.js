(function(module) {
  mifosX.controllers = _.extend(module, {

	  ViewOfficeController: function(scope, routeParams , rootScope,resourceFactory,webStorage) {
        scope.charges = [];

        //scope.PermissionService = PermissionService;

    	scope.officeFinanceTrans=[];

        resourceFactory.officeResource.get({officeId: routeParams.id} , function(data) {
            scope.office = data;
            webStorage.add("officeName",scope.office.name);
        });
        
      //for office finance Transactions
        resourceFactory.officeFinancialTransactionResource.get({officeId:routeParams.id},function(data){
      	  scope.officeFinanceTrans = data;
        });
    }
  });
  mifosX.ng.application.controller('ViewOfficeController', ['$scope', '$routeParams','$rootScope','ResourceFactory','webStorage', mifosX.controllers.ViewOfficeController]).run(function($log) {
    $log.info("ViewOfficeController initialized");
  });
}(mifosX.controllers || {}));
