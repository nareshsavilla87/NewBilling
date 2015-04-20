(function(module) {
	mifosX.controllers = _.extend(module, {
		EditPropertyController : function(scope, location,  $modal, route, webStorage,resourceFactory,PermissionService,routeParams) {
	
			scope.propertyTypes = [];
			scope.formData = {};
			scope.PermissionService = PermissionService;
			scope.propertyId= routeParams.id;
			resourceFactory.propertyCodeResource.get({propertyId: routeParams.id,template:'true'},function(data) {
				scope.formData = data;
				scope.propertyTypes = data.propertyTypes;
				for(var i in scope.propertyTypes){
					if(scope.propertyTypes[i].id==scope.formData.propertyTypeId){
						scope.formData.propertyType=scope.propertyTypes[i].id;
						break;
					}
				}
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
				
				delete this.formData.id;
				delete this.formData.propertyTypes;
				delete this.formData.citiesData;
				delete this.formData.clientId;
				delete this.formData.propertyTypeId;
				resourceFactory.propertyCodeResource.update({propertyId : routeParams.id}, scope.formData,function(data){
				location.path('/viewproperty/'+data.resourceId);
				});
			}; 
		}
	});
	mifosX.ng.application.controller('EditPropertyController',[ 
	    '$scope',
	    '$location',
	    '$modal',
	    '$route',
	    'webStorage',
	    'ResourceFactory',
	    'PermissionService',
	    '$routeParams',
	    mifosX.controllers.EditPropertyController 
	    ]).run(function($log) {
	    	$log.info("EditPropertyController initialized");
	    });
}(mifosX.controllers || {}));








































