(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateEventActionMappingController: function(scope, resourceFactory, location) {
        scope.actionDatas = [];
        scope.eventDatas = [];
        resourceFactory.EventActionMappingTemplateResource.get(function(data) {
           
        	scope.actionDatas = data.actionData;
          //  scope.formData = data;
            scope.eventDatas = data.eventData;
        });
      
        scope.submit = function() {
            resourceFactory.EventActionMappingResource.save(this.formData, function(data){
            		location.path('/vieweventactionmapping/'+ data.resourceId);
            });
        };
    }
  });
  mifosX.ng.application.controller('CreateEventActionMappingController', [
     '$scope', 
     'ResourceFactory', 
     '$location', 
     mifosX.controllers.CreateEventActionMappingController
     ]).run(function($log) {
    	 $log.info("CreateEventActionMappingController initialized");
  });
}(mifosX.controllers || {}));