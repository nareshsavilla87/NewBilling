ProfileController = function(scope,RequestSender,rootScope,location,paginatorService,localStorageService, API_VERSION,modal) {
		  
		  var totalStatementsData = [];var retrivingStatementsData = {};scope.statementsData = [];
          scope.getStatementsData = function(offset, limit, callback) {
        	  
			  retrivingStatementsData.pageItems = [];
			  var itrCount = 0;
			  for (var i=offset;i<totalStatementsData.length;i++) {
				 itrCount += 1;
				 retrivingStatementsData.pageItems.push(totalStatementsData[i]);
				 if(itrCount==limit){
					 break;
				 }
		      }
			  callback(retrivingStatementsData);
	  	   };
	  	function initialCallFun(){   
		   if(rootScope.selfcare_sessionData){		  
			  scope.clientId = rootScope.selfcare_sessionData.clientId;
			  RequestSender.clientResource.get({clientId: scope.clientId} , function(data) {
				  scope.clientData = data;
				  if(data.selfcare){
					  data.selfcare.token ? rootScope.iskortaTokenAvailable = true : rootScope.iskortaTokenAvailable = false;
					  !data.selfcare.authPin ? scope.clientData.selfcare.authPin = 'Not Available':null;
				  }
				  rootScope.selfcare_userName = data.displayName;
				  localStorageService.add("clientTotalData",data);
				  
				  RequestSender.statementResource.query({clientId: scope.clientId} , function(data) {	
					  totalStatementsData = data;
					  retrivingStatementsData.totalFilteredRecords = totalStatementsData.length;
					  scope.statementsData = paginatorService.paginate(scope.getStatementsData, 2);
					  
					//getting data from c_configuration for isRegister_plan and isisDeviceEnabled
	  					 var registrationListing = {};
	  					  RequestSender.configurationResource.get(function(data){
	  						var configType = angular.fromJson(data.clientConfiguration);
	  						if(configType) registrationListing	= configType.registrationListing;
	  						scope.isConfigNationalId 			= configType.nationalId;
	  						scope.isConfigPassport				= registrationListing.passport;
	  						localStorageService.add("isAutoRenewConfig",configType.isAutoRenew);
	  						if(scope.isConfigPassport){
	  							RequestSender.clientIdentifiersResource.query({clientId:scope.clientId},function(identifiersdata){
	  								angular.forEach(identifiersdata,function(val,key){
	  									if(angular.lowercase(val.documentType['name']) == 'passport'){
	  										scope.passport = val.documentKey;
	  									}
	  								});
	  							});
	  						}
	  						
	  						var configurationDatas = data.globalConfiguration;
	  						  for(var i in configurationDatas){
	  							 if(configurationDatas[i].name==selfcareModels.isRedemption){
	  								  localStorageService.add('isRedemptionConfig',configurationDatas[i].enabled);
	  								  rootScope.isRedemptionConfig = configurationDatas[i].enabled;
	  								  break;
	  						      }
	  						  }
	  					  });
				  });
				
			  });
		    }
	  	  }initialCallFun();
		 
		  scope.routeTostatement = function(statementid){
             location.path('/viewstatement/'+statementid);
           };
           
           scope.downloadFile = function (statementId){
	           window.open(rootScope.hostUrl+ API_VERSION +'/billmaster/'+ statementId +'/print?tenantIdentifier='+selfcareModels.tenantId);
	      };
	      
	    //redemption popup controller
	 	 var RedemptionPopupController = function($scope,$modalInstance,$filter){
	 		 
	 		 $scope.isProcessing = false;
	 		 $scope.formData = {};
	 		 var valid = false;
	 		 $scope.voucherNumberValidationFun = function(voucherNumber){
	 			 if(voucherNumber){
	 				 RequestSender.VoucherResource.query({pinNumber:voucherNumber},function(data){
	 					 if(data.length == 1){
	 						 $scope.isInValidVoucher = false;
	 						 var expiryDate  = $filter('DateFormat')(data[0].expiryDate);
	 						 var todayDate	 = $filter('DateFormat')(new Date());
	 						 if (new Date(expiryDate) < new Date(todayDate)) {
	 							 delete $scope.formData.voucherNumber;
	 							 $scope.isDateExpired = true;
	 						 }else{
	 							 $scope.isDateExpired = false;
	 						 }
	 					 }else{
	 						 $scope.isDateExpired = false;
	 						 $scope.isInValidVoucher = true;
	 						 delete $scope.formData.voucherNumber;
	 					 }
	 					 valid = !$scope.isInValidVoucher && !$scope.isDateExpired;
	 				 });
	 			 }
	 		 };
	 		 
	 		 $scope.confirm = function(voucherNumber){
	 			 if(valid){
	 			   var voucherData = {'clientId' : scope.clientId,'pinNumber': voucherNumber};
	 			  
	 				 $scope.isProcessing = true;$scope.voucherError = null;
	 				 RequestSender.redemptionResource.save(voucherData,function(data){
	 					 
	 					 $scope.isProcessing = false;
	 					 if('/profile' == location.path()) initialCallFun();
	 					 else location.path('/profile');
	 					 $modalInstance.close('delete');
	 					 
	 					 
	 				 },function(errorData){
	 					 $scope.voucherError = errorData.data.errors[0].userMessageGlobalisationCode;
	 					 $scope.isProcessing = false;
	 				 });
	 			 }	 
	 		};
	 		
	 		$scope.cancel = function(){
	 			$modalInstance.dismiss('cancel');
	 		};
	 	 };
	      
	      rootScope.redeemFun = function(){
	    	  modal.open({
	 			 templateUrl: 'redemptionpop.html',
	 			 controller: RedemptionPopupController,
	 			 resolve:{}
	 			});
	      };
		 
		
    };
    
selfcareApp.controller('ProfileController', ['$scope',
                                             'RequestSender',
                                             '$rootScope',
                                             '$location',
                                             'PaginatorService', 
                                             'localStorageService', 
                                             'API_VERSION', 
                                             '$modal', 
                                             ProfileController]);
