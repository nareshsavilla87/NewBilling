(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewClientOneTimeSaleController: function(scope,webStorage, routeParams , route, location, resourceFactory, http,PermissionService) {
		 // alert("hh");
        scope.onetimesales = [];    
        scope.readAllocation = PermissionService.showMenu("READ_ALLOCATION");
        scope.createAllocation = PermissionService.showMenu("CREATE_ALLOCATION");
        scope.walletConfig = webStorage.get('is-wallet-enable');
        scope.id=routeParams.id;
        scope.clientId=routeParams.clientId;
        var clientData = webStorage.get('clientData');
        scope.hwSerialNumber=clientData.hwSerialNumber;
        scope.displayName=clientData.displayName;
        scope.statusActive=clientData.statusActive;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.phone=clientData.phone;
        
        resourceFactory.oneTimeSaleAllocation.get({orderId: routeParams.id} , function(data) {
        	//alert('discountController,' +data);
        	scope.isDefault='false';
            scope.onetimesales = data.allocationData;
            if(scope.onetimesales.length !=0){
            	scope.isDefault='true';
            }
        });
       
    }
  });
  mifosX.ng.application.controller('ViewClientOneTimeSaleController', ['$scope','webStorage', '$routeParams', '$route', '$location', 'ResourceFactory', '$http','PermissionService', mifosX.controllers.ViewClientOneTimeSaleController]).run(function($log) {
    $log.info("ViewClientOneTimeSaleController initialized");
  });
}(mifosX.controllers || {}));