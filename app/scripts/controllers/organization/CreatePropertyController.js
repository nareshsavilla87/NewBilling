(function(module) {
	mifosX.controllers = _.extend(module, {
		CreatePropertyController : function(scope, location,  $modal, route, webStorage,resourceFactory,PermissionService) {
	
			scope.propertyTypes = [];
			scope.formData = {};
			scope.PermissionService = PermissionService;
			resourceFactory.propertyCodeTemplateResource.get(function(data) {
				scope.propertyTypes = data.propertyTypes;
				scope.citiesData = data.citiesData;
			});
			
			scope.checkProperty =function(propertyCode){
				
		    	if(propertyCode!=undefined){
				    var str=propertyCode;
				    scope.precinct=str.substring(0,2);
				    for(var i in scope.citiesData){
				    	if(angular.lowercase(scope.citiesData[i].cityCode).contains(angular.lowercase(scope.precinct))){
					  	scope.formData.precinct = scope.citiesData[i].cityName;
					    scope.formData.unitCode=str.substring(str.length-4);
				     	scope.formData.floor=str.substring(7,9);
					    scope.formData.parcel="Parcel "+str.substring(2,4);
					    scope.formData.buildingCode = str.substring(4,7);
						resourceFactory.AddressTemplateResource.get({city :scope.formData.precinct}, function(data) {
			          		scope.formData.state = data.state;
			          		scope.formData.country = data.country;
			      	  });
						break;
					}else{
						delete scope.formData.unitCode;
			    		delete scope.formData.floor;
			    		delete scope.formData.parcel;
			    		delete scope.formData.buildingCode;
			    		delete scope.formData.precinct;
			    		delete scope.formData.state;
			    		delete scope.formData.country;
					}
				  }
				   // console.log(scope.formData.precinct);
				    if(scope.formData.precinct == undefined){
				          scope.errorDetails = [];
			              scope.errorDetails.push({code: 'error.msg.invalid.property.code'});
			              $("#propertyCode").addClass("validationerror");
			          
				    }else{
				    	 delete scope.errorDetails;
				    	 $("#propertyCode").removeClass("validationerror");
				    	 
				    }
		    	}else{
		    		delete scope.formData.unitCode;
		    		delete scope.formData.floor;
		    		delete scope.formData.parcel;
		    		delete scope.formData.buildingCode;
		    		delete scope.formData.precinct;
		    		delete scope.formData.state;
		    		delete scope.formData.country;
		    	}
			};
			  
			scope.submit = function() { 
				
				resourceFactory.propertyCodeResource.save(scope.formData,function(data){
				location.path('/viewproperty/'+data.resourceId);
				});
			}; 
		}
	});
	mifosX.ng.application.controller('CreatePropertyController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    'webStorage',
	    'ResourceFactory',
	    'PermissionService',
	    mifosX.controllers.CreatePropertyController 
	    ]).run(function($log) {
	    	$log.info("CreatePropertyController initialized");
	    });
}(mifosX.controllers || {}));








































