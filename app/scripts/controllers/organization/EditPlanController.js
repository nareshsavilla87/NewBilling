(function(module) {
  mifosX.controllers = _.extend(module, {
    EditPlanController: function(scope, routeParams, resourceFactory,dateFilter, location) {
        scope.billRuleDatas = [];
        scope.planStatus = [];
        scope.date = {};
        scope.availableservices = [];
        scope.selectedServices = [];
        scope.subscriptiondata=[];
        scope.volumeTypes=[];
        scope.provisionSysDatas = [];
        scope.selectedServ=[];
        scope.services=[];
        scope.start = {};
        scope.end = {};
        scope.start.date = new Date();
        scope.end.date = new Date();
        resourceFactory.planResource.get({planId: routeParams.id, template: 'true'} , function(data) {
            scope.formData = data;
            scope.planId = data.id;
           // scope.provisioingSystem=data.provisionSystem;
            scope.billRuleDatas = data.billRuleDatas;
            scope.services = data.services;
            scope.selectedServices = data.selectedServices;
            scope.planStatus=data.planStatus;
            scope.subscriptiondata=data.subscriptiondata;
            scope.volumeTypes=data.volumeTypes;
            scope.provisionSysDatas=data.provisionSysData;
            if(data.isPrepaid =="Y"){
            	scope.formData.isPrepaid=true;
            }if(data.allowTopup == "Y"){
            	scope.formData.allowTopup=true;
            }if(data.isHwReq == "Y"){
            	scope.formData.isHwReq=true;
            }
            var actDate = dateFilter(data.startDate,'dd MMMM yyyy');
            scope.date.startDate = new Date(actDate);
            if(scope.date.endDate){ 
            var endDate = dateFilter(data.endDate,'dd MMMM yyyy');
            scope.end.endDate = new Date(endDate );
            }
        });
        
    	
        scope.restrict = function(){
            for(var i in this.allowed)
            {
                for(var j in scope.services){
                    if(scope.services[j].id == this.allowed[i])
                    {
                        var temp = {};
                        temp.id = this.allowed[i];
                        temp.serviceCode = scope.services[j].serviceDescription;
                       // temp.includeInBorrowerCycle = scope.allowedProducts[j].includeInBorrowerCycle;
                        scope.selectedServices.push(temp);
                        scope.services.splice(j,1);
                    }
                }
            }
        };
        scope.allow = function(){
            for(var i in this.restricted)
            {
                for(var j in scope.selectedServices){
                    if(scope.selectedServices[j].id == this.restricted[i])
                    {
                        var temp = {};
                        temp.id = this.restricted[i];
                        temp.serviceDescription = scope.selectedServices[j].serviceCode;
                     //   temp.includeInBorrowerCycle = scope.restrictedProducts[j].includeInBorrowerCycle;
                        scope.services.push(temp);
                        scope.selectedServices.splice(j,1);
                    }
                }
            }
        };
        
        scope.submit = function() {
             delete this.formData.billRuleDatas; // removing allowed office list
             delete this.formData.planStatus; // removing allowed roles list 
                //
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
             this.formData.locale = 'en';
             if(scope.date.startDate){this.formData.startDate = dateFilter(scope.date.startDate,'dd MMMM yyyy');}
             if(scope.date.endDate){this.formData.endDate= dateFilter(scope.end.endDate,'dd MMMM yyyy');}
             this.formData.provisioingSystem=this.formData.provisionSystem;
             this.formData.duration=this.formData.contractPeriod;
             
             delete this.formData.provisionSystem;
             delete this.formData.contractPeriod;
             delete this.formData.unitType;

          // reformatting selected roles
             var userId = this.formData.id;
             delete this.formData.id; 
             var temp = [];
             var final = {};
             for(var i in scope.selectedServices){
                 temp[i] = scope.selectedServices[i].id;
               
             }
             this.formData.services = temp;
             resourceFactory.planResource.update({'planId':routeParams.id},this.formData,function(data){
             location.path('/viewplan/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditPlanController', ['$scope', '$routeParams', 'ResourceFactory', 'dateFilter','$location', mifosX.controllers.EditPlanController]).run(function($log) {
    $log.info("EditPlanController initialized");
  });
}(mifosX.controllers || {}));
