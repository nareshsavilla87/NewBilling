(function(module) {
	mifosX.controllers = _.extend(module, {
		CreatePropertyController : function(scope,location,$modal,route, webStorage,resourceFactory,PermissionService,http,dateFilter,API_VERSION,$rootScope,$upload,filter) {
	
			scope.propertyTypes = [];
			scope.precinctData = [];
			scope.formData = {};
		
			scope.PermissionService = PermissionService;
			
			resourceFactory.propertyCodeTemplateResource.get(function(data) {
				scope.propertyTypes = data.propertyTypes;
				//scope.citiesData = data.citiesData;
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
			          	//	scope.formData.cityName=scope.precinctData[i].cityName;
			          		break;
			          }else{
			        	   
							delete scope.formData.state;
				    		delete scope.formData.country;
						}
					}
				  }else{
					  //  delete scope.formData.propertyCode;
						delete scope.formData.state;
			    		delete scope.formData.country; 
				  }
			};
			
			scope.getPropertyCode=function(unitCode){
				if(scope.precinct !=undefined&&scope.formData.parcel!=undefined&&scope.formData.buildingCode!=undefined && scope.formData.floor!=undefined){
			    scope.formData.propertyCode=scope.precinct.concat(scope.formData.parcel,scope.formData.buildingCode,scope.formData.floor,unitCode);
				}
			};
			scope.submit = function() { 
				console.log(scope.formData.precinct);
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
	    '$http', 
        'dateFilter',
        'API_VERSION',
        '$rootScope',
        '$upload',
        '$filter',
	    mifosX.controllers.CreatePropertyController 
	    ]).run(function($log) {
	    	$log.info("CreatePropertyController initialized");
	    });
}(mifosX.controllers || {}));

