(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditOwnHardwareController: function(scope,webStorage,routeParams, resourceFactory, location, dateFilter,$rootScope) {
        scope.itemtypes = [];
        scope.serialnumber = [];
        scope.provisioningserialnumber = {};
        scope.first = {};
        scope.first.date = new Date();
        
        scope.serialnumber={};
        scope.formData = {};
        scope.ownHrdId=routeParams.id;
        
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
       // alert(routeParams.id);
        scope.ownhardwaredatas = []; 
        scope.itemtypes=[];
        resourceFactory.ownHardwareResource.getSingleOwnHardware({id: routeParams.id} , function(data) {
        	//alert('discountController,' +data);
            scope.formData = data.ownedHardwareDatas[0];
            scope.first.date=dateFilter(new Date(scope.formData.allocationDate),'dd MMMM yyyy');
            scope.itemtypes=data.itemDatas;
            scope.clientId =scope.formData.clientId;
            scope.formData.itemType=parseInt(data.ownedHardwareDatas[0].itemType);
        });
                 
        scope.reset123 = function(){
     	   webStorage.add("callingTab", {someString: "hardware" });
        };
        
        scope.submit = function() {
        	
            this.formData.locale = $rootScope.locale.code;
            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.allocationDate = reqDate;
            delete this.formData.id;
            delete this.formData.clientId;
            resourceFactory.ownHardwareResource.update({'id':routeParams.id},this.formData,function(data){
            	// alert(routeParams.id);
            	location.path('/viewownhardware/' +routeParams.id);
	           
	          });
            webStorage.add("callingTab", {someString: "hardware" });
        }; 
            
            
      }
 });     
        mifosX.ng.application.controller('EditOwnHardwareController', ['$scope','webStorage','$routeParams', 'ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.EditOwnHardwareController]).run(function($log) {
		    $log.info("EditOwnHardwareController initialized");
		  });
		}(mifosX.controllers || {}));
		     
          