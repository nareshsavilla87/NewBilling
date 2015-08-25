(function(module) {
	  mifosX.controllers = _.extend(module, {
		  RedemptionController: function(scope, resourceFactory, location,route) {

	        
			  scope.formData = {};
	        scope.submit = function() {  
	        	
	            resourceFactory.redemptionResource.save(scope.formData,function(data){
	            	location.path("/viewclient/"+scope.formData.clientId);
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('RedemptionController', ['$scope', 'ResourceFactory', '$location','$route', mifosX.controllers.RedemptionController]).run(function($log) {
	    $log.info("RedemptionController initialized");
	  });
	}(mifosX.controllers || {}));

