(function(module) {
  mifosX.controllers = _.extend(module, {
	  AssociationController: function(scope, routeParams , location,resourceFactory ) {		
            scope.formData={};
            scope.clientId= routeParams.id;
            scope.hardwareDatas=[];
           
        resourceFactory.associationTemplate.get({clientId: routeParams.id} , function(data) {  
        	scope.hardwareDatas=data.hardwareData;
        	scope.planData=data.planData;
        	
        });
        
        scope.orderId = function (planid) {   
				for ( var j in scope.planData) {																			
					if (scope.planData[j].planId == planid ) {											
						this.formData.orderId= scope.planData[j].orderId;
					}
				}
          };


        scope.submit = function() { 
           this.formData.orderId=routeParams.orderId;
           for ( var j in scope.hardwareDatas) {																			
				if (scope.hardwareDatas[j].serialNum == this.formData.provisionNum ) {											
					this.formData.allocationType= scope.hardwareDatas[j].allocationType;
				}
			}
            resourceFactory.associationSaveResource.save({clientId: routeParams.id},this.formData,function(data){
           	 location.path('/viewclient/' +scope.clientId);
              
             });
        };
    
    }
  });
  mifosX.ng.application.controller('AssociationController', ['$scope', '$routeParams', '$location','ResourceFactory', mifosX.controllers.AssociationController]).run(function($log) {
    $log.info("AssociationController initialized");
  });
}(mifosX.controllers || {}));