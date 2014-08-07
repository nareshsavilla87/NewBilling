(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreatePlanController: function(scope, resourceFactory, location,dateFilter) {
		  
        scope.billRuleDatas = [];
        scope.availableServices = [];
        scope.selectedServices = [];
        scope.planStatus =[];
        scope.provisionSysDatas = [];
        scope.subscriptiondata = [];
        scope.volumeTypes = [];
        scope.allowed = [];
        scope.restricted = [];
        scope.nonselectedservice = [];
        scope.services=[];
        scope.allowed = [];
        scope.date = {};
        scope.start={};
        scope.end={};
        scope.restricted = [];
        scope.products = [];
        scope.restrictedProducts =[];
       scope.start.date = new Date();
     //   scope.end.date = new Date();
        resourceFactory.planTemplateResource.get(function(data) {
            scope.billRuleDatas = data.billRuleDatas;
            scope.availableServices = data.services;
            scope.planStatus = data.planStatus;
            scope.provisionSysDatas = data.provisionSysData;
            scope.subscriptiondata = data.subscriptiondata;
            scope.volumeTypes = data.volumeTypes;
            scope.productmix = data;
            scope.allowedProducts = data.services;
           // scope.restrictedProducts = data.services;
            scope.formData = {
              isPrepaid:false,
              
            };
        });
        
      
        scope.restrict = function(){
            for(var i in this.allowed)
            {
                for(var j in scope.availableServices){
                    if(scope.availableServices[j].id == this.allowed[i])
                    {
                        var temp = {};
                        temp.id = this.allowed[i];
                        temp.name = scope.availableServices[j].serviceDescription;
                       // temp.includeInBorrowerCycle = scope.allowedProducts[j].includeInBorrowerCycle;
                        scope.selectedServices.push(temp);
                        scope.allowedProducts.splice(j,1);
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
                        temp.serviceDescription = scope.selectedServices[j].name;
                     //   temp.includeInBorrowerCycle = scope.restrictedProducts[j].includeInBorrowerCycle;
                        scope.availableServices.push(temp);
                        scope.selectedServices.splice(j,1);
                    }
                }
            }
        };
        
        scope.submit = function() {   
        	
        	this.formData.locale = 'en';
        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
        	var reqEndDate = dateFilter(scope.end.date,'dd MMMM yyyy');
        	
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.startDate = reqDate;
            this.formData.endDate = reqEndDate;
             var temp = [];
             for(var i in scope.selectedServices){
                 temp[i] = scope.selectedServices[i].id;
               
             }
             this.formData.services = temp;
             
            // var services=[];
             
             
            resourceFactory.planResource.save(this.formData,function(data){
            		location.path('/viewplan/' + data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('CreatePlanController', ['$scope', 'ResourceFactory', '$location','dateFilter', mifosX.controllers.CreatePlanController]).run(function($log) {
    $log.info("CreatePlanController initialized");
  });
}(mifosX.controllers || {}));
