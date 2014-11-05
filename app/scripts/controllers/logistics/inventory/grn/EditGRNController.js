(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditGRNController: function(scope,webStorage, resourceFactory, location,dateFilter,PermissionService,routeParams,$rootScope) {
        scope.itemDatas = [];
        scope.officeDatas = [];
        scope.supplierDatas = [];
        scope.formData = {};
        scope.grn={};
        
        resourceFactory.grnTemplateResource.get(function(data) {
        	scope.itemDatas = data.itemData;
            scope.officeDatas = data.officeData;
            scope.supplierDatas = data.supplierData;
        });
        resourceFactory.grnResource.get({grnId: routeParams.id} , function(data) {
        	var purchaseDate = dateFilter(data.purchaseDate,'dd MMMM yyyy');
        	scope.formData.purchaseDate = new Date(purchaseDate );
        	scope.formData.purchaseNo=data.purchaseNo;
        	scope.formData.supplierId=data.supplierId;
        	scope.formData.officeId=data.officeId;
        	scope.formData.itemMasterId=data.itemMasterId;
        	scope.formData.orderdQuantity=data.orderdQuantity;
        });
        
        scope.selectedGRN=function(){
        	webStorage.add("callingTab", {someString: "grn" });
        };
        
        scope.reset123 = function(){
	    	   webStorage.add("callingTab", {someString: "grn" });
	       };
                
        scope.submit = function() {
        	this.formData.locale = $rootScope.locale.code;
        	var reqDate = dateFilter(scope.formData.purchaseDate,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.purchaseDate = reqDate;
            
            resourceFactory.grnResource.update({grnId:routeParams.id},this.formData,function(data){
            if(PermissionService.showMenu('READ_GRN'))
            	location.path('/viewgrn/' + data.resourceId);
            else
            	location.path('/inventory');
          });
        };
    }
  });
  mifosX.ng.application.controller('EditGRNController', ['$scope','webStorage', 'ResourceFactory', '$location','dateFilter','PermissionService','$routeParams','$rootScope', mifosX.controllers.EditGRNController]).run(function($log) {
    $log.info("EditGRNController initialized");
  });
}(mifosX.controllers || {}));
