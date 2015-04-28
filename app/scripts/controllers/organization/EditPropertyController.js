(function(module) {
	mifosX.controllers = _.extend(module, {
		EditPropertyController : function(scope, location,  $modal, route, webStorage,resourceFactory,PermissionService,routeParams,http,dateFilter,API_VERSION,$rootScope,$upload,filter) {
	
			scope.propertyTypes = [];
			scope.formData = {};
			scope.PermissionService = PermissionService;
			scope.propertyId= routeParams.id;
			resourceFactory.propertyCodeResource.get({propertyId: routeParams.id,template:'true'},function(data) {
				scope.formData = data;
				scope.propertyTypes = data.propertyTypes;
				scope.citiesData = data.citiesData;
				if(angular.lowercase(scope.formData.parcel).contains(angular.lowercase("Parcel"))){
					scope.formData.parcel=scope.formData.parcel.replace('Parcel ','');
				}
				for(var i in scope.citiesData){
				if(scope.formData.precinct==scope.citiesData[i].cityName){
					scope.precinct = scope.citiesData[i].cityCode.substr(0,2);
					break;
				  }
				}
				for(var i in scope.propertyTypes){
					if(scope.propertyTypes[i].id==scope.formData.propertyTypeId){
						scope.formData.propertyType=scope.propertyTypes[i].id;
						break;
					}
				}
				
			});
			
			//precinct auto complete 
			scope.getPrecinct = function(query){
				return http.get($rootScope.hostUrl+API_VERSION+'/address/city/', {
	        	      params: {
	        	    	  		query: query
	        	      		   }
	        	    }).then(function(res){   
	        	    	 scope.precinctData=res.data;	
	        	      return scope.precinctData;
	        	    });
             };   
			
			scope.getPrecinctDetails = function(precinct){
				if(precinct!=undefined){
				    for(var i in scope.precinctData){
				    	if(precinct==scope.precinctData[i].cityName){
				    		scope.precinct = scope.precinctData[i].cityCode.substr(0,2);
			          		scope.formData.state =  scope.precinctData[i].state;
			          		scope.formData.country = scope.precinctData[i].country;
						    scope.formData.propertyCode=scope.precinct.concat(scope.formData.parcel,scope.formData.buildingCode,scope.formData.floor,scope.formData.unitCode);
			          		break;
			          }else{
			        	   
							delete scope.formData.state;
				    		delete scope.formData.country;
						}
					}
				  }else{
					    delete scope.formData.precinct;
						delete scope.formData.state;
			    		delete scope.formData.country; 
			    		delete scope.formData.propertyCode;
				  }
			};
			
			scope.getPropertyCode=function(labelValue){
			  if(labelValue!=undefined){
			     scope.formData.propertyCode=scope.precinct.concat(scope.formData.parcel,scope.formData.buildingCode,scope.formData.floor,scope.formData.unitCode);
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
	    '$http', 
        'dateFilter',
        'API_VERSION',
        '$rootScope',
        '$upload',
        '$filter',
	    mifosX.controllers.EditPropertyController 
	    ]).run(function($log) {
	    	$log.info("EditPropertyController initialized");
	    });
}(mifosX.controllers || {}));


































































