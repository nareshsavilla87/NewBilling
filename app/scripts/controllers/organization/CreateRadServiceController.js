(function(module) {
	mifosX.controllers = _.extend(module, {
		CreateRadServiceController : function(scope, location,  $modal, route,$http, webStorage,resourceFactory) {
			
			scope.formData = {};
			scope.types =[{value:"KB"},{value:"MB"}];
			
			
			 scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "radService" });
	           };
			
			scope.submit = function() {  		
			scope.formData.value=scope.formData.downRate + scope.formData.downType +"/"+ scope.formData.upRate + scope.formData.upType;
			delete scope.formData.downRate ;
			delete scope.formData.upRate;
			//console.log(scope.formData.value);
		    resourceFactory.radServiceResource.save(scope.formData,function(data){
		        		  location.path('/radius/' );
		          });
		    webStorage.add("callingTab", {someString: "radService" });
		  };
		}
	});
	mifosX.ng.application.controller('CreateRadServiceController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    '$http',
	    'webStorage',
	    'ResourceFactory',
	    mifosX.controllers.CreateRadServiceController 
	    ]).run(function($log) {
	    	$log.info("CreateRadServiceController initialized");
	    });
}(mifosX.controllers || {}));
