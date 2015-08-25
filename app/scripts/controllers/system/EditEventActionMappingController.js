(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditEventActionMappingController: function(scope, resourceFactory, location, routeParams) {
        
        scope.actionDatas = [];
        scope.eventDatas = [];
        scope.formData={};
        resourceFactory.EventActionMappingResource.getDetails({id: routeParams.id}, function(data) {
          
        	scope.actionDatas = data.actionData;
            scope.eventDatas=data.eventData;
            scope.formData.event = data.eventName;
            scope.formData.action = data.actionName;
            scope.formData.process = data.process; 		
        });
        
        scope.submit = function() {
       /*  delete this.formData.itemDatas;
         delete this.formData.planDatas;
         delete this.formData.id;*/
          resourceFactory.EventActionMappingResource.update({id: routeParams.id}, this.formData,function(data){
            location.path('/vieweventactionmapping/'+data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditEventActionMappingController', ['$scope', 'ResourceFactory', '$location', '$routeParams', mifosX.controllers.EditEventActionMappingController]).run(function($log) {
    $log.info("EditEventActionMappingController initialized");
  });
}(mifosX.controllers || {}));
