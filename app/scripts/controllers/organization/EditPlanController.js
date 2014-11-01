(function(module) {
  mifosX.controllers = _.extend(module, {
    EditPlanController: function(scope, routeParams, resourceFactory,dateFilter, location,$rootScope) {
    	
    	scope.planId = routeParams.id;
    	scope.formData = {};
    	scope.planStatus = [];
        scope.billRuleDatas = [];
        scope.provisionSysDatas = [];
        
        scope.date = {};
        
        scope.services=[];
        scope.selectedServices = [];
        scope.volumeTypes=[];
        
        resourceFactory.planResource.get({planId: scope.planId, template: 'true'} , function(data) {
            scope.formData = {
            					planCode 				: data.planCode,
            					status 					: data.status,
            					planDescription 		: data.planDescription,
            					billRule 				: data.billRule,
            					provisioingSystem		: data.provisionSystem,
            				  };
            
            scope.planStatus=data.planStatus;
            scope.billRuleDatas = data.billRuleDatas;
            scope.provisionSysDatas=data.provisionSysData;
            
            var startDate =data.startDate; 
            var endDate =data.endDate; 
            scope.date = {
            				startDate : dateFilter(new Date(startDate),'dd MMMM yyyy'),
            				endDate   : dateFilter(new Date(endDate),'dd MMMM yyyy')
            			  };
            
            scope.services = data.services;
            scope.selectedServices = data.selectedServices;
            
            scope.volumeTypes=data.volumeTypes;
            
            if(data.allowTopup == 'Y'){
            	scope.formData.allowTopup = true;
            	scope.formData.volume = data.volume;
            	scope.formData.units = data.units;
            }
            if(data.isPrepaid =='Y'){
            	
            	scope.formData.isPrepaid=true;
            	
            }if(data.isHwReq == 'Y'){
            	
            	scope.formData.isHwReq=true;
            }
        });
        
    	
        scope.restrict = function(){
            for(var i in scope.allowed)
            {
                for(var j in scope.services){
                    if(scope.services[j].id == scope.allowed[i])
                    {
                        scope.selectedServices.push(scope.services[j]);
                        scope.services.splice(j,1);
                    }
                }
            }
        };
        scope.allow = function(){
            for(var i in scope.restricted)
            {
                for(var j in scope.selectedServices){
                    if(scope.selectedServices[j].id == scope.restricted[i])
                    {
                        scope.services.push(scope.selectedServices[j]);
                        scope.selectedServices.splice(j,1);
                    }
                }
            }
        };
        
        scope.submit = function() {
             delete this.formData.billRuleDatas; // removing allowed office list
             delete this.formData.planStatus; // removing allowed roles list 
             delete this.formData.datas; 
             delete this.formData.volumeTypes;     //
             delete this.formData.subscriptiondata;  // removing elected roles to re-format
             delete this.formData.volumeTypes;
             delete this.formData.provisionSysData;
             
             delete this.formData.isActive;
             delete this.formData.planCount;
             //delete this.formData.provisioingSystem;
             delete this.formData.statusname;
             delete this.formData.id;
            
             delete this.formData.selectedServices;  
             delete this.formData.service;
             delete this.formData.startDate;
             delete this.formData.endDate;
            /* this.formData.locale = 'en';
         	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
         	var reqEndDate = dateFilter(scope.end.date,'dd MMMM yyyy');
         	
             this.formData.dateFormat = 'dd MMMM yyyy';
             this.formData.startDate = reqDate;
             this.formData.endDate = reqEndDate;*/
             this.formData.dateFormat = 'dd MMMM yyyy';
             this.formData.locale = $rootScope.locale.code;
             if(scope.date.startDate){this.formData.startDate = dateFilter(scope.date.startDate,'dd MMMM yyyy');}
             if(scope.date.endDate){this.formData.endDate= dateFilter(scope.end.endDate,'dd MMMM yyyy');}
             this.formData.provisioingSystem=this.formData.provisionSystem;
             this.formData.duration=this.formData.contractPeriod;
             
             delete this.formData.provisionSystem;
             delete this.formData.contractPeriod;
             delete this.formData.unitType;


          // reformatting selected services
             scope.formData.services = [];
             
             for(var i in scope.selectedServices){
            	 scope.formData.services[i] = scope.selectedServices[i].id;
             }
             
             scope.formData.locale = $rootScope.locale.code;
             scope.formData.dateFormat = 'dd MMMM yyyy';
             scope.formData.startDate = dateFilter(scope.date.startDate,scope.formData.dateFormat);
             scope.formData.endDate = dateFilter(scope.date.endDate,scope.formData.dateFormat);
             
             resourceFactory.planResource.update({'planId':scope.planId},scope.formData,function(data){
            	 location.path('/viewplan/' + data.resourceId);
             });
        };
    }
  });
  mifosX.ng.application.controller('EditPlanController', ['$scope', '$routeParams', 'ResourceFactory', 'dateFilter','$location','$rootScope', mifosX.controllers.EditPlanController]).run(function($log) {
    $log.info("EditPlanController initialized");
  });
}(mifosX.controllers || {}));
