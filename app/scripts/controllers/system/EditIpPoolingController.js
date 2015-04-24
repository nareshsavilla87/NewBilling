(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditIpPoolingController: function(scope, resourceFactory, routeParams, location, $modal, PermissionService) {
	        
	        scope.formData = {};
	        scope.typeCodeValue = {};
	        
	        scope.ippoolstatusType= [{statusType:"I", status:"Intermediate"},{statusType:"F", status:"Free"},{statusType:"B", status:"Blocked"},{statusType:"T", status:"Terminated"}];
	        resourceFactory.ipPoolUpdateResource.get({'id': routeParams.id}, function(data) {
	            scope.codeValueDatas = data.codeValueDatas;
	            scope.ipPoolManagementData = data.ipPoolManagementData[0];
	            scope.formData.ipAddress = data.ipPoolManagementData[0].ipAddress;
	            scope.formData.notes = data.ipPoolManagementData[0].notes;
	            scope.formData.type = data.ipPoolManagementData[0].type;
	            scope.typeCodeValue.codeValue = data.ipPoolManagementData[0].typeCodeValue;
	            scope.typeCodeValue.status = data.ipPoolManagementData[0].status;
	            scope.formData.ipPoolDescription = data.ipPoolManagementData[0].ipPoolDescription;
	            scope.formData.subnet = data.ipPoolManagementData[0].subNet;
	            for(var i = 0; i < scope.ippoolstatusType.length; i++){
	            	if(scope.ippoolstatusType[i].status == data.ipPoolManagementData[0].status)
	            		scope.formData.statusType = scope.ippoolstatusType[i].statusType;
	            }
	        });
	        
	        scope.submit = function() {   
	        	if(scope.typeCodeValue.status == 'Assigned'){
	            		scope.formData.statusType = 'A';
	            }
	            resourceFactory.ipPoolingResource.update({'id': routeParams.id}, this.formData, function(data){
	                location.path('/ipPooling');
	             });
	        };
	  }
  });
  mifosX.ng.application.controller('EditIpPoolingController', [
     '$scope', 
     'ResourceFactory', 
     '$routeParams', 
     '$location',
     '$modal',
     'PermissionService',
     mifosX.controllers.EditIpPoolingController
     ]).run(function($log) {
    	 $log.info("EditIpPoolingController initialized");
  });
}(mifosX.controllers || {}));