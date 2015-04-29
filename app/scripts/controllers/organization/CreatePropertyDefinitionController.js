(function(module) {
	  mifosX.controllers = _.extend(module, {
		  CreatePropertyDefinitionController: function(scope, resourceFactory, location, dateFilter, $rootScope) {
			  
	        resourceFactory.propertyTemplateResource.query(function(data) {
	        	scope.propertyCodeTypes = data;
	            scope.formData = {};
	        });
	     
	        scope.submit = function() {  
	            resourceFactory.propertyResource.save(scope.formData, function(data){
	            		location.path('/propertydefinition');
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
	      mifosX.controllers.CreatePropertyDefinitionController
	      ]).run(function($log) {
	    	  $log.info("CreatePropertyDefinitionController initialized");
	  });
	}(mifosX.controllers || {}));