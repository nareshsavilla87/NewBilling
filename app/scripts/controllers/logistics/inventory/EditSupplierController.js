(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditSupplierController: function(scope,webStorage,resourceFactory, location,routeParams) {
      
    	scope.formData = {};
    	resourceFactory.supplierResource.get({'id': routeParams.id},function(data) {
            scope.formData= data[0];
           
        });
    	
        scope.submit = function() {   
        	delete scope.formData.id;
            resourceFactory.supplierResource.update({'id': routeParams.id},this.formData,function(data){
            		location.path('/inventory');
            		webStorage.add("callingTab", {someString: "supplier" });
          });
        };
    }
  });
  mifosX.ng.application.controller('EditSupplierController', ['$scope','webStorage','ResourceFactory', '$location','$routeParams', mifosX.controllers.EditSupplierController]).run(function($log) {
    $log.info("EditSupplierController initialized");
  });
}(mifosX.controllers || {}));
