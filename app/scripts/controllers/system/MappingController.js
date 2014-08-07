(function(module) {
  mifosX.controllers = _.extend(module, {
	  MappingController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService,PermissionService) {
        scope.servicemappingdatas = [];
        scope.hardwaremappingdatas= [];
        scope.provisiongsystemData= [];
        scope.selectedCurrOptions = [];
        scope.allCurrOptions = [];
        scope.hideview = false;
        scope.selected = undefined;
        scope.PermissionService = PermissionService;
        scope.planmappingdatas= [];
        
        var callingTab = webStorage.get('callingTab',null);
        if(callingTab == null){
        	callingTab="";
        }else{
		  scope.displayTab=callingTab.someString;
		 
		  if( scope.displayTab == "hardwarePlanMapping"){
			 
			  scope.hardwarePlanMappingTab =  true;
			  webStorage.remove('callingTab');
		  }else
		  {
			  webStorage.remove('callingTab');
		  };
		 
        }
        
        resourceFactory.mappingResource.get(function(data) {
        	 scope.servicemappingdatas=data; 
        });
     
        scope.getHardwareMappingData=function(data){
        	
        	resourceFactory.hardwareMappingResource.get(function(data) {
           	 scope.hardwaremappingdatas=data; 
           });
        	
        };
        
        scope.submit = function () {
            var currencies = [];
            var curr = {};
            for(var i=0; i < scope.selectedCurrOptions.length; i++){
                currencies.push(scope.selectedCurrOptions[i].code);
            }
            curr["currencies"] = currencies;
            resourceFactory.currencyConfigResource.upd(curr , function(data){
                route.reload();
            });

    };

    scope.cancel = function() {
      route.reload();
    }
        scope.deleteCur =  function (code){
            for(var i=0; i<scope.selectedCurrOptions.length; i++){
                if(scope.selectedCurrOptions[i].code == code){
                  scope.selectedCurrOptions.splice(i, 1);  //removes 1 element at position i 
                  break;
                }
            }
      };
      
      scope.addCur = function (){
          if(scope.selected != undefined && scope.selected.hasOwnProperty('code')) {
            scope.selectedCurrOptions.push(scope.selected);
              for(var i=0; i<scope.allCurrOptions.length; i++){
                  if(scope.allCurrOptions[i].code == scope.selected.code){
                    scope.allCurrOptions.splice(i, 1);  //removes 1 element at position i 
                    break;
                  }
              }
          }
          scope.selected = undefined;
        };
        
	scope.getEventActionMappingData=function(data){
        	
        	resourceFactory.EventActionMappingResource.get(function(data) {
           	 scope.datas=data; 
           });
        	
        };
        
        scope.getEventValidationData=function(data){
        	
        	resourceFactory.EventValidationResource.get(function(data) {
           	 scope.eventValidationDatas=data; 
           });
        	
        };
        
            scope.getCurrencyConfig=function(data){
            	
            	 resourceFactory.currencyConfigResource.get(function(data){
                     scope.selectedCurrOptions = data.selectedCurrencyOptions;
                     scope.allCurrOptions = data.currencyOptions;

                 });
        	
        };
        
        scope.getProvisiongCommandData=function(data){
          	 
          	 resourceFactory.provisioningMappingResource.getprovisiongData(function(data) {
              	 scope.provisiongsystemData=data; 
              });
          };
          
          scope.getplanMappingdetails = function(data){
            	
            	resourceFactory.planMappingResource.get(function(data) {
               	 scope.planmappingdatas=data; 
               });
            	
            };
            
          scope.isDeleted=function(id,value){
        	  
        	  resourceFactory.EventActionMappingResource.delete({id: id} , {} , function(data) {
                  location.path('/mappingconfig');
                  scope.getEventActionMappingData();
            });
          };
          
          scope.isDeletedForValidation=function(id,value){
        	  
        	  resourceFactory.EventValidationResource.delete({id: id} , {} , function(data) {
                  location.path('/mappingconfig');
                  scope.getEventValidationData();
            });
          };
          
          scope.routeToservice = function(id){
        		location.path('/viewServiceMapping/'+ id);
            };
          scope.routeTohardware = function(id){
             location.path('/viewhardwareplanmapping/'+ id);
          };
          scope.routeToprovisioning = function(id){
              location.path('/viewprovisioningmapping/'+ id);
          };
          scope.routeToplanmapping = function(id){
               location.path('/viewplanmapping/'+ id);
          };
    }
  });
  mifosX.ng.application.controller('MappingController', ['$scope','webStorage', '$routeParams', '$location', 'ResourceFactory','PaginatorService','PermissionService', mifosX.controllers.MappingController]).run(function($log) {
    $log.info("MappingController initialized");
  });
}(mifosX.controllers || {}));


