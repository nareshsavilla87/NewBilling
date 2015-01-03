(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditAssociationController: function(scope, routeParams, resourceFactory, location) {
		  
		 scope.formData={};
		 scope.clientId=routeParams.clientId;
         resourceFactory.associationResource.getAssociation({clientId: routeParams.clientId,id:routeParams.id} , function(data) { 	 
         scope.formData=data;
         scope.hardwareDatas=data.hardwareData;
         scope.planData=data.planData;     
        });
         
         scope.orderId = function (planid) {   
        	 alert('planid is :'+ planid);
				for ( var j in scope.planData) {																			
					if (scope.planData[j].planId == planid ) {											
						this.formData.orderId= scope.planData[j].orderId;
						 alert('orderId is :'+ this.formData.orderId);
					}
				
			}
         };
        
         scope.submit = function() { 
        	 delete this.formData.hardwareData;
        	 delete this.formData.planData;
        	 delete this.formData.clientId;
        	 delete this.formData.planCode;
        	 delete this.formData.id;
        	 delete this.formData.provisionNumber;
        	 this.formData.provisionNum=this.formData.serialNum;;
        	 delete this.formData.serialNum;
            resourceFactory.associationUpdateResource.update({associationId : routeParams.id},this.formData,function(data){
                location.path('/viewAssociation/' + scope.clientId + '/' + data.resourceId);
         });
        };
    }
  });
  mifosX.ng.application.controller('EditAssociationController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.EditAssociationController]).run(function($log) {
    $log.info("EditAssociationController initialized");
  });
}(mifosX.controllers || {}));