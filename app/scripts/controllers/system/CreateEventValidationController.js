(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateEventValidationController: function(scope, resourceFactory, location,webStorage) {
        scope.actionDatas = [];
        scope.eventDatas = [];
        
        resourceFactory.EventActionMappingTemplateResource.get(function(data) {
            scope.eventDatas=data.eventData;
        });
        
        scope.cancel = function(){
        	webStorage.add("callingTab", {someString: "eventValidationTab" }); 
        };
             
        scope.submit = function() {
            resourceFactory.EventValidationResource.save(this.formData, function(data){
            	location.path('/mappingconfig');
          });
        };
    }
  });
  mifosX.ng.application.controller('CreateEventValidationController', [
      '$scope',
      'ResourceFactory',
      '$location',
      'webStorage',
      mifosX.controllers.CreateEventValidationController
      ]).run(function($log) {
    	  $log.info("CreateEventValidationController initialized");
  });
}(mifosX.controllers || {}));
