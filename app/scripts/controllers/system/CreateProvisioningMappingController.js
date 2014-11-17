(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreateProvisioningMappingController: function(scope, resourceFactory, location,webStorage) {
	        scope.commands = [];
	        scope.provisioning = [];
	        scope.parameterFormData = {};
	        scope.commandParameters = [];
	        
	        resourceFactory.provisioningtemplateMappingResource.get(function(data) {
	            scope.commands = data.commands;
	            scope.provisioning = data.provisioning;
	            scope.formData = {
	            		
	            };
	        });
	        
	        scope.reset123 = function(){
	        	webStorage.add("callingTab", {someString: "provisioningCommandTab" }); 
	        };
	        
	        scope.addParameters = function () {
	        	if (scope.parameterFormData.commandParam && scope.parameterFormData.paramType) {
	              scope.commandParameters.push({commandParam:scope.parameterFormData.commandParam,
	            	  paramType:scope.parameterFormData.paramType}); 
	                 scope.parameterFormData.commandParam = undefined;
	                  scope.parameterFormData.paramType = undefined;
	        	 } 
	        };
	          
	        scope.deleteParameter = function (index) {
	        	  scope.commandParameters.splice(index, 1);
	        };
	          
	        scope.submit = function() {  
	        	scope.formData.commandParameters =new Array();
	            if (scope.commandParameters.length > 0) {
	              
	            	for (var i in scope.commandParameters) {
	                   scope.formData.commandParameters.push({commandParam:scope.commandParameters[i].commandParam,
	 	               paramType:scope.commandParameters[i].paramType});
	                };
	            }
	             
	            resourceFactory.provisioningMappingResource.save(this.formData, function(data){
	            	location.path('/mappingconfig');
	            });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateProvisioningMappingController', [
	     '$scope', 
	     'ResourceFactory',
	     '$location',
	     'webStorage',
	     mifosX.controllers.CreateProvisioningMappingController
	     ]).run(function($log) {
	    	 $log.info("CreateProvisioningMappingController initialized");
	  });
	}(mifosX.controllers || {}));