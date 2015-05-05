(function(module) {
  mifosX.controllers = _.extend(module, {
	  ServiceTransferRequestController: function(scope,webStorage, resourceFactory, routeParams, location,dateFilter,$rootScope, http,API_VERSION,PermissionService,$upload,filter) {
		  
		  
		  scope.walletConfig = webStorage.get('is-wallet-enable');

	        var clientData = webStorage.get('clientData');
	        scope.displayName=clientData.displayName;
	        scope.statusActive=clientData.statusActive;
		    scope.hwSerialNumber=clientData.hwSerialNumber;
	        scope.accountNo=clientData.accountNo;
	        scope.officeName=clientData.officeName;
	        scope.balanceAmount=clientData.balanceAmount;
	        scope.currency=clientData.currency;
	        scope.imagePresent=clientData.imagePresent;
	        scope.categoryType=clientData.categoryType;
	        scope.email=clientData.email;
	        scope.phone=clientData.phone;
	        if(scope.imagePresent){
	         scope.image=clientData.image;
	        }

	  scope.walletConfig = webStorage.get('is-wallet-enable');
		var clientData = webStorage.get('clientData');
		scope.hwSerialNumber = clientData.hwSerialNumber;
		scope.displayName = clientData.displayName;
		scope.statusActive = clientData.statusActive;
		scope.accountNo = clientData.accountNo;
		scope.officeName = clientData.officeName;
		scope.balanceAmount = clientData.balanceAmount;
		scope.currency = clientData.currency;
		scope.imagePresent = clientData.imagePresent;
		scope.categoryType = clientData.categoryType;
		scope.email = clientData.email;
		scope.phone = clientData.phone;
        if(scope.imagePresent){
        	scope.image=clientData.image;
		}  
       scope.walletAmount = webStorage.get("walletAmount");
        
       scope.formData = {};
       scope.property = {};
       scope.precinctData = [];
       scope.parcelData = [];
       scope.floorData = [];
       
       scope.shiftingCheckbox = "Yes";
       scope.clientId = routeParams.clientId;
       scope.serviceTransferRequestData = {};
       scope.propertyCodesData = [];scope.feeMasterData = [];
       resourceFactory.serviceTransferRequestResource.get({clientId:routeParams.clientId},function(data){
    	  scope.serviceTransferRequestData = data;
    	  scope.feeMasterData  = data.feeMasterData;
    	  scope.propertyTypes  = data.propertyTypes;
    	  scope.propertyId=scope.serviceTransferRequestData.id;
    	  if(scope.feeMasterData){
    		  scope.formData.shiftChargeAmount = scope.feeMasterData.defaultFeeAmount;
    		  scope.formData.chargeCode = scope.feeMasterData.chargeCode;
    	  }
       });
       
       scope.getPropertyStatus = function(query){
       	return http.get($rootScope.hostUrl+API_VERSION+'/property', {
       	      params: {       	    	 		       	  
       	    	  sqlSearch: query,
	    	         limit : 15,
	    	         offset:0
       	      		   }
       	    }).then(function(res){   
       	    	 scope.propertyCodesData=res.data.pageItems;	
       	    	if(scope.propertyCodesData.length>0){
       	    		 scope.unitStatus=scope.propertyCodesData[0].status;
       	    		 scope.propertyId=scope.propertyCodesData[0].id;
       	    		if(scope.unitStatus == 'OCCUPIED'){
    	    		     scope.errorDetails= [];
  	                     scope.errorDetails.push({code:'error.msg.property.code.already.allocated'});
  	                    $("#propertyCode").addClass("validationerror");
  	                   $("#unitStatus").addClass("validationerror");
    	    	    }else{
    	    		   delete scope.errorDetails;
 	    	    	   scope.propetyId=undefined;
 	    		       $("#propertyCode").removeClass("validationerror");
 	    		       $("#unitStatus").removeClass("validationerror");

    	    	   }
       	    	}else{
       	    		scope.unitStatus='VACANT';
       	    		scope.propertyId=undefined;
       	    	}
       	      return scope.propertyCodesData;
       	    });
         };  

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
			    		scope.property.precinctCode = scope.precinctData[i].cityCode.substr(0,2);
		          		scope.property.state =  scope.precinctData[i].state;
		          		scope.property.country = scope.precinctData[i].country;
		          		scope.property.precinct = scope.precinctData[i].cityName;
		          		scope.getWatch(scope.property.precinctCode);
		          		break;
		          }else{
		        	  
						delete scope.property.state;
			    		delete scope.property.country;
					}
				}
			  }else{
				    
					delete scope.property.state;
		    		delete scope.property.country; 
			  }
		};
		
		
		scope.getParcel = function(query){
			return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
       	      params: {
       	    	  		query: 'parcel'
       	      		   }
       	    }).then(function(res){   
       	    	 scope.parcelData=res.data;	
       	      return scope.parcelData;
       	    });
        };   
        
        scope.getParcelDetails = function(parcel){
       	 if(parcel !=undefined){
            for(var i in scope.parcelData){
           	 if(parcel== scope.parcelData[i].description){
			    		scope.property.parcel = scope.parcelData[i].code.substr(0,2);
			    		scope.street = scope.parcelData[i].referenceValue;
			    		scope.getWatch(scope.property.parcel);
		          		break;
		          }	 
               }
           }
        };
		
		scope.getFloor = function(query){
			return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
       	      params: {
       	    	  		query: 'Level/Floor'
       	      		   }
       	    }).then(function(res){   
       	    	 scope.floorData=res.data;	
       	      return scope.floorData;
       	    });
        };   
        
        scope.getFloorDetails = function(floor){
       	 if(floor!=undefined){
       		 for( var i in scope.floorData){
       			 if(floor==scope.floorData[i].description){
				    		scope.property.floor = scope.floorData[i].code.substr(0,2);
				    		scope.getWatch(scope.property.floor);
			          		break;
			          }	 
                }
       	 }	       	        
     };
     
     scope.getBuild = function(query){
			return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
     	      params: {
     	    	  		query: 'Building Codes'
     	      		   }
     	    }).then(function(res){   
     	    	 scope.buildingData=res.data;	
     	      return scope.buildingData;
     	    });
      };   
      scope.getbuildCode = function(buildingCode){
     	 if(!angular.isUndefined(buildingCode)){
			    		scope.property.buildingCode = buildingCode.substr(0,3);
			    		scope.getWatch(scope.property.buildingCode);
		          }	 
      };  
      
      scope.getUnit = function(query){
			return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
      	      params: {
      	    	  		query: 'Unit Codes'
      	      		   }
      	    }).then(function(res){   
      	    	 scope.unitData=res.data;	
      	      return scope.unitData;
      	    });
       };   
       scope.getunitCode = function(unit){
      	 if(!angular.isUndefined(unit)){
          	 scope.property.unitCode=unit.substr(0,4);
          	if(angular.isUndefined(scope.formData.propertyCode)){
          	      scope.getPropertyCode(scope.property.unitCode);
          	}else{
          		$scope.getWatch(scope.property.unitCode);
          	   }					 
		      }	 
       };
    
       
		scope.getPropertyCode=function(unitCode){
		if(scope.property.precinctCode !=undefined&&scope.property.parcel!=undefined&&scope.property.buildingCode!=undefined &&scope.property.floor!=undefined){
	    scope.property.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,unitCode);
	    scope.property.unitCode=unitCode;
	    scope.getPropertyStatus(scope.property.propertyCode);
		}
	  }; 
       
	   scope.getWatch=function(labelValue){
			  if(!angular.isUndefined(labelValue)&&!angular.isUndefined(scope.property.propertyCode)){
			     scope.property.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,scope.unitCode);
			     scope.getPropertyStatus(scope.property.propertyCode);
			  }
      
         };
       
       
       scope.submit = function(){
    	   
    	   scope.formData.oldPropertyCode = scope.serviceTransferRequestData.propertyCode; 
    	   scope.formData.locale = "en"; 
    	   if(scope.shiftingCheckbox == "Yes"){
    		   scope.formData.newPropertyCode = scope.serviceTransferRequestData.propertyCode; 
    	   }else if(scope.shiftingCheckbox == "No"){
    		   scope.formData.newPropertyCode = scope.property.propertyCode; 
    	   }
    	   if(angular.isUndefined(scope.propertyId)){
    		   delete scope.property.precinctCode;
    		   resourceFactory.propertyCodeResource.save({},scope.property,function(data){
    			   
        		   resourceFactory.serviceTransferRequestResource.save({clientId:routeParams.clientId},scope.formData,function(data){
        			   location.path("/viewclient/"+scope.clientId);
        		   });
    		   });
    	   }else{
    		   resourceFactory.serviceTransferRequestResource.save({clientId:routeParams.clientId},scope.formData,function(data){
    			   location.path("/viewclient/"+scope.clientId);
    		   });
    	   }
       };
    }
  });
  mifosX.ng.application.controller('ServiceTransferRequestController', ['$scope','webStorage', 'ResourceFactory', '$routeParams', '$location','dateFilter','$rootScope',
                                                                        '$http','API_VERSION','PermissionService','$upload','$filter',
                                                                        mifosX.controllers.ServiceTransferRequestController]).run(function($log) {
    $log.info("ServiceTransferRequestController initialized");
  });
}(mifosX.controllers || {}));
