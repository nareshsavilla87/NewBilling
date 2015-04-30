(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreatePropertyDefinitionController: function(scope, resourceFactory, location, dateFilter, $rootScope,webStorage) {
			  
	        resourceFactory.propertyTemplateResource.query(function(data) {
	        	scope.propertyCodeTypes = data;
	            scope.formData = {};
	        });
	     
	        scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "PropertyMaster" });
	           };
	           
	        
	        scope.submit = function() {  
	            resourceFactory.propertyResource.save(scope.formData, function(data){
	            	webStorage.add("callingTab", {someString: "PropertyMaster" });
	            		location.path('/property');
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreatePropertyDefinitionController', [
	      '$scope',
	      'ResourceFactory',
	      '$location',
	      'dateFilter',
	      '$rootScope',
	      'webStorage',
	      mifosX.controllers.CreatePropertyDefinitionController
	      ]).run(function($log) {
	    	  $log.info("CreatePropertyDefinitionController initialized");
	  });
	}(mifosX.controllers || {}));