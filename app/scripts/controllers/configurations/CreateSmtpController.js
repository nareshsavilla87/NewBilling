(function(module) {
	  mifosX.controllers = _.extend(module, {
	    CreateSmtpController: function(scope, resourceFactory, location,dateFilter) {
	        
	    	scope.formData={};
	    	scope.formData.userName="SMTP";
	        scope.submit = function() {  
	        	
	            resourceFactory.configurationSMTPResource.save(this.formData,function(data){
	            	location.path('/global');
	          });
	        };
	    }
	  });
	  mifosX.ng.application.controller('CreateSmtpController', ['$scope', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.CreateSmtpController]).run(function($log) {
	    $log.info("CreateSmtpController initialized");
	  });
	}(mifosX.controllers || {}));

