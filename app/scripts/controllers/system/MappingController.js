(function(module) {
  mifosX.controllers = _.extend(module, {
	  MappingController: function(scope,webStorage, routeParams,location, resourceFactory, paginatorService,PermissionService,$modal,route) {
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
		 
         if( scope.displayTab === "planMappingTab"){
			  
			  scope.planMappingTab =  true;
			  webStorage.remove('callingTab');
			  
		}else if( scope.displayTab === "hardwarePlanMapping"){
			  
			  scope.hardwarePlanMappingTab =  true;
			  webStorage.remove('callingTab');
			  
	    }else if( scope.displayTab === "provisioningCommandTab"){
			  
			  scope.provisioningCommandTab =  true;
			  webStorage.remove('callingTab');
			  
	   }else if( scope.displayTab === "eventActionTab"){
			  
			  scope.eventActionTab =  true;
			  webStorage.remove('callingTab');
       }else{
			  webStorage.remove('callingTab');
		   }
        }
        
        /*service mapping data*/
        scope.getServiceMappingDetails = function(){
        	
             resourceFactory.mappingResource.get(function(data) {
        	 scope.servicemappingdatas=data; 
        });
        };
        /*plan mapping data*/
        scope.getplanMappingdetails = function(){
        	
        	resourceFactory.planMappingResource.get(function(data) {
           	 scope.planmappingdatas=data; 
           });
        };
     
       /* hardware planmapping  data*/
        scope.getHardwareMappingData=function(){
        	
        	resourceFactory.hardwareMappingResource.query(function(data) {
           	 scope.hardwaremappingdatas=data; 
           });
        };
        
        /* provisionCommand  data*/
        scope.getProvisiongCommandData=function(){
         	 
         	 resourceFactory.provisioningMappingResource.getprovisiongData(function(data) {
             	 scope.provisiongsystemData=data; 
             });
         };
         
         scope.deleteProvisioning = function (id){
         	scope.provisionId=id;
          	 $modal.open({
  	                templateUrl: 'provision.html',
  	                controller: approve,
  	                resolve:{}
  	        });
          };
          
      	function  approve($scope, $modalInstance) {
      		$scope.approve = function () {
      			 resourceFactory.provisioningMappingResource.remove({provisioningId: scope.provisionId} , {} , function() {
      				webStorage.add("callingTab", {someString: "provisioningCommandTab" }); 
      				route.reload();
              });
              	 $modalInstance.dismiss('delete');
           };
              $scope.cancel = function () {
                  $modalInstance.dismiss('cancel');
            };
          }   
         
        
        scope.submit = function () {
            var currencies = [];
            var curr = {};
            for(var i=0; i < scope.selectedCurrOptions.length; i++){
                currencies.push(scope.selectedCurrOptions[i].code);
            }
            curr['currencies'] = currencies;
            resourceFactory.currencyConfigResource.upd(curr , function(){
                route.reload();
            });

    };

    scope.cancel = function() {
      route.reload();
    };
        scope.deleteCur =  function (code){
            for(var i=0; i<scope.selectedCurrOptions.length; i++){
                if(scope.selectedCurrOptions[i].code === code){
                  scope.selectedCurrOptions.splice(i, 1);  //removes 1 element at position i 
                  break;
                }
            }
      };
      
      scope.addCur = function (){
          if(scope.selected != undefined && scope.selected.hasOwnProperty('code')) {
            scope.selectedCurrOptions.push(scope.selected);
              for(var i=0; i<scope.allCurrOptions.length; i++){
                  if(scope.allCurrOptions[i].code === scope.selected.code){
                    scope.allCurrOptions.splice(i, 1);  //removes 1 element at position i 
                    break;
                  }
              }
          }
          scope.selected = undefined;
        };
        
	   scope.getEventActionMappingData=function(){
        	
        	resourceFactory.EventActionMappingResource.query(function(data) {
           	 scope.datas=data; 
           });
        	
        };
        
        scope.getEventValidationData=function(){
        	
        	resourceFactory.EventValidationResource.get(function(data) {
           	 scope.eventValidationDatas=data; 
           });
        };
        
        scope.getCurrencyConfig=function(){
            	
            	 resourceFactory.currencyConfigResource.get(function(data){
                     scope.selectedCurrOptions = data.selectedCurrencyOptions;
                     scope.allCurrOptions = data.currencyOptions;
                 });
        };
        
            
          scope.isDeleted=function(id,value){
        	  
        	  resourceFactory.EventActionMappingResource.remove({id: id} , {} , function() {
                  location.path('/mappingconfig');
                  scope.getEventActionMappingData();
            });
          };
          
          scope.isDeletedForValidation=function(id,value){
        	  
        	  resourceFactory.EventValidationResource.remove({id: id} , {} , function(data) {
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
  mifosX.ng.application.controller('MappingController', [
    '$scope',
    'webStorage', 
    '$routeParams', 
    '$location', 
    'ResourceFactory',
    'PaginatorService',
    'PermissionService', 
    '$modal',
    '$route',
    mifosX.controllers.MappingController]).run(function($log) {
    $log.info("MappingController initialized");
  });
}(mifosX.controllers || {}));


