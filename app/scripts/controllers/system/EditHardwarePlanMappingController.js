(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditHardwarePlanMappingController: function(scope, resourceFactory, location, routeParams, webStorage) {
        
        scope.planDatas = [];
        scope.itemDatas = [];
        scope.hardwareId = routeParams.id;

        resourceFactory.hardwareMappingResource.getDetails({hardwaremapId: routeParams.id, template : 'true'}, function(data) {
            scope.planDatas = data.planDatas;
            scope.itemDatas = data.itemDatas;
            scope.formData =  data; 
        });
        scope.reset123 = function(){
	       	   webStorage.add("callingTab", {someString: "hardwarePlanMapping" });
	          };
        
        scope.submit = function() {
        	delete this.formData.itemDatas;
        	delete this.formData.planDatas;
        	delete this.formData.id;
        		
        	resourceFactory.hardwareMappingResource.update({hardwaremapId: routeParams.id}, this.formData, function(data){
        		location.path('/viewhardwareplanmapping/'+ data.resourceId);
        	});
        
        };
    }
  });
  mifosX.ng.application.controller('EditHardwarePlanMappingController', [
     '$scope', 
     'ResourceFactory',
     '$location',
     '$routeParams',
     'webStorage',
     mifosX.controllers.EditHardwarePlanMappingController
     ]).run(function($log) {
    	 $log.info("EditHardwarePlanMappingController initialized");
  });
}(mifosX.controllers || {}));