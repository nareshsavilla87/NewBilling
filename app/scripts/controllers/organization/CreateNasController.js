(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateNasController : function(scope, location,  $modal, route,$http, webStorage,resourceFactory) {
			
			scope.formData = {};
			
			
			scope.submit = function() {  		
		
		    resourceFactory.nasResource.save(scope.formData,function(data){
		        		  location.path('/radius/' );
		          });
		   
		  };
		}
	});
	mifosX.ng.application.controller('CreateNasController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    '$http',
	    'webStorage',
	    'ResourceFactory',
	    mifosX.controllers.CreateNasController 
	    ]).run(function($log) {
	    	$log.info("CreateNasController initialized");
	    });
}(mifosX.controllers || {}));