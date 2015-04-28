(function(module) {
  mifosX.controllers = _.extend(module, {
	  ViewOwnHardwareController: function(scope,webStorage,routeParams , route, location, resourceFactory, http,PermissionService) {
		  //alert(routeParams.id);
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
	        scope.walletConfig = webStorage.get('is-wallet-enable');

        scope.ownhardwaredatas = []; 
        scope.itemdatas=[];
        scope.PermissionService = PermissionService;
        resourceFactory.ownHardwareResource.getSingleOwnHardware({id: routeParams.id} , function(data) {
        	//alert('discountController,' +data);
            scope.ownhardwaredatas = data.ownedHardwareDatas[0];
            scope.itemdatas=data.itemDatas;
            scope.id=scope.ownhardwaredatas.id;
            scope.clientId=scope.ownhardwaredatas.clientId;
        });
        scope.deletemessage = function (){
            resourceFactory.ownHardwareResource.remove({id: routeParams.id} , {} , function(data) {
            	 location.path('/viewclient/' +scope.clientId);
            	 webStorage.add("callingTab", {someString: "hardware" });
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
          };
    }
  });
  mifosX.ng.application.controller('ViewOwnHardwareController', ['$scope','webStorage', '$routeParams', '$route', '$location', 'ResourceFactory', '$http','PermissionService', mifosX.controllers.ViewOwnHardwareController]).run(function($log) {
    $log.info("ViewOwnHardwareController initialized");
  });
}(mifosX.controllers || {}));