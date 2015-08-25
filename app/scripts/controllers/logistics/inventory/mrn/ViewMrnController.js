(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewMrnController: function(scope, routeParams , resourceFactory ,location,webStorage) {
        scope.mrn = [];
        
        scope.selectedMRN=function(){
        	webStorage.add("callingTab", {someString: "mrn" });
        };
        resourceFactory.mrnResource.get({mrnId: routeParams.id} , function(data) {
        	scope.mrn = data;
        });
        
/*        	scope.deleteItem = function(){
            resourceFactory.itemResource.delete({itemId: routeParams.id},{},function(data){
                location.path('/inventory');

        });
        }*/
    }
  });
  mifosX.ng.application.controller('ViewMrnController', ['$scope', '$routeParams','ResourceFactory', '$location','webStorage',mifosX.controllers.ViewMrnController]).run(function($log) {
    $log.info("ViewMrnController initialized");
  });
}(mifosX.controllers || {}));
