(function(module) {
	mifosX.controllers = _.extend(module, {
		EditRadServiceController : function(scope, location,  $modal, route,$http, webStorage,resourceFactory,routeParams) {
			
			scope.radiusVersion = routeParams.radiusVersion;
			scope.radServiceId = routeParams.serviceId;
	    	scope.formData = {};
			  
			 scope.reset123 = function(){
	        	   webStorage.add("callingTab", {someString: "radService" });
	           };
	           
	           if(scope.radiusVersion == 'version-2'){
	        	   resourceFactory.radServiceResource.get({radServiceId : routeParams.serviceId,template : 'true'	},	function(data) {
	        		  scope.serviceCodes=JSON.parse(data.radServiceTemplateData);
	        		  scope.formData = {
	        				  srvname : data.serviceName,
	        				  downrate : parseInt(data.downRate),
	        				  uprate : parseInt(data.upRate),
	        				  trafficunitdl : data.trafficUnitdl,
	        				  islimitcomb : data.limitComb,
	        				  limitexpiration : data.limitExpiration,
	        				  renew :data.renew,	  
	        		  }; 
	        		  for(var i in scope.serviceCodes){	  
	        			  if(scope.serviceCodes[i].id == data.nextServicId){
	        				 scope.formData.nextsrvid = scope.serviceCodes[i].id;
	        				 break;
	        			}
	        		  }
	               });
	           }
			
			scope.submit = function() {
				if(scope.radiusVersion == 'version-1'){
			
				}else if(scope.radiusVersion == 'version-2'){
					
			    resourceFactory.radServiceResource.update({radServiceId : routeParams.serviceId},scope.formData,function(data){
			        		  location.path('/radius/' );
			          });
			    webStorage.add("callingTab", {someString: "radService" });
			}
				
		  };
		}
	});
	mifosX.ng.application.controller('EditRadServiceController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    '$http',
	    'webStorage',
	    'ResourceFactory',
	    '$routeParams',
	    mifosX.controllers.EditRadServiceController 
	    ]).run(function($log) {
	    	$log.info("EditRadServiceController initialized");
	    });
}(mifosX.controllers || {}));
