ActivateUserController = function(scope,RequestSender,rootScope,routeParams,http,
			  							webStorage,httpService,sessionManager,location,API_VERSION,filter,authenticationService,$modal,localStorageService) {

		
		rootScope.isRegClientProcess = true;
		
		//getting the mailId value form routeParams
		  scope.existedEmail = routeParams.mailId;

		//default variables for this controller
		  scope.isAlreadyActive=false;
		  scope.isRegPage = false;
		  
		//declaration of formData
		  scope.formData = {};
		  
		//getting the key value form routeParams
		  var actualKey = routeParams.registrationKey || "";
		  var afterSliceKey = actualKey.slice(0, 27);
		  
		//function called when  clicking on Login link
		  scope.goToSignInPageFun = function(){
			  	rootScope.currentSession = sessionManager.clear();
		   };
		  
		  //adding jsondata for selfcare activation updation request
		  scope.registrationKey = {'verificationKey' : afterSliceKey,
		  	  						'uniqueReference' : scope.existedEmail};
		  
		  authenticationService.authenticateWithUsernamePassword(function(data){
		  	 	//sending selfcare activation updation request
			  rootScope.currentSession= {user :'selfcare'};
		  		RequestSender.registrationResource.update(scope.registrationKey,function(successData) {
		  			scope.isRegPage=true;
	  					  
		  			//getting list of city data
		  			scope.cities = [];
	  				RequestSender.addressTemplateResource.get(function(data) {
	  					scope.cities=data.cityData;
	  					  
	  					//getting data from c_configuration for isRegister_plan and isisDeviceEnabled
	  					 var configurationDatas = [];
	  					  RequestSender.configurationResource.get(function(data){
	  						
	  						var configDeviceAgreeType = {};
	  						configDeviceAgreeType = JSON.parse(data.clientConfiguration);
	  						scope.isConfigNationalId = configDeviceAgreeType.nationalId;
	  						
	  						(configDeviceAgreeType.deviceAgrementType == 'SALE') ?
									  scope.isCPE_TYPESale = true:
								  (configDeviceAgreeType.deviceAgrementType == 'OWN') ?
									  scope.isCPE_TYPEOwn = true :
									  (scope.isCPE_TYPEOwn = false,
									  scope.isCPE_TYPESale = false);

	  						configurationDatas = data.globalConfiguration;
	  						  for(var i in configurationDatas){
	  							 if(configurationDatas[i].name==selfcareModels.registerPlan){
	  								 
	  								  scope.isRegisteredPlan = configurationDatas[i].enabled;
	  								  
	  						      }else if(configurationDatas[i].name==selfcareModels.registrationRequiresDevice){
	  						    	  
	  								  scope.isDeviceEnabled = configurationDatas[i].enabled;
	  								  
	  							  }
	  						  }
	  					  });
	  					});
	
		        },function(errorData){
		      	  scope.isAlreadyActive=true;
		        });
		  });
		  
		//national Id validation
		      scope.nationalIdvalue = true;
			 scope.nationalIdValidationFun = function(id){
				 if(id){
				 scope.nationalIdvalue = Kennitala.validate(id);
				 }
			 };
		  		  
		 //function called when entering the device name 
			 var itemDetails = {};
		  scope.getDataForMacId = function(query){
			  if(query){
				  var str = "";
				  var containsColon = query.match(":");
				  if(containsColon){
					  str = query;
				  }else{
					  str += query[0]+query[1]+":";
					  for(var val=3;val<=query.length-1;val++){
						  if(val == query.length-1){
							  break;
						  }
						  if(val%2 == 0)
							  str += query[val]+":";
						  else
							  str +=query[val];
					  }
				  }
				  RequestSender.gettingSerialNumbers.query({query:query},function(data){
					  itemDetails = {};
					  itemDetails = data;
					  if(itemDetails.length == 0){
						  scope.isInvalidMacId = true;
					  }
					  else if(itemDetails.length >=1){
						  scope.isInvalidMacId = false;
				          scope.isDisabledSerialNumber = true;
		            		 if(query.toLowerCase() == itemDetails[0].serialNumber.toLowerCase()){
		            			 scope.provisioningSerialNumber =  itemDetails[0].provisioningSerialNumber;
		            		 }else{
		            			 scope.isInvalidMacId = true;
		            			 delete scope.provisioningSerialNumber;
		            		 }
					  }
				  });
			  }else{
				  scope.isDisabledSerialNumber = false;
				  scope.isInvalidMacId = false;
				  delete scope.provisioningSerialNumber;
			  }
		  };
		  

		  scope.getDataForSerialNumber = function(query){
			  if(query){
				  var str = "";
				  var containsColon = query.match(":");
				  if(containsColon){
					  str = query;
				  }else{
					  str += query[0]+query[1]+":";
					  for(var val=3;val<=query.length-1;val++){
						  if(val == query.length-1){
							  break;
						  }
						  if(val%2 == 0)
							  str += query[val]+":";
						  else
							  str +=query[val];
					  }
				  }
				  RequestSender.gettingSerialNumbers.query({query:query},function(data){
					  itemDetails = {};
					  itemDetails = data;
					  if(itemDetails.length == 0){
						  scope.isInvalidSerialNumber = true;
					  }
					  else if(itemDetails.length >=1){
						  scope.isInvalidSerialNumber = false;
						  scope.isDisabledMacId = true;
		            		 if(query.toLowerCase() == itemDetails[0].provisioningSerialNumber.toLowerCase()){
		            			 	scope.formData.deviceNo =  itemDetails[0].serialNumber;
		            		 }else{
		            			 scope.isInvalidSerialNumber = true;
		            			 delete scope.formData.deviceNo;
		            		 }
					  }
				  });
			  }else{
				  scope.isDisabledMacId = false;
				  scope.isInvalidSerialNumber = false;
				  delete scope.formData.deviceNo;
			  }
		  };
			              
		
		   
		   //getting state and country while changing the city
			  scope.getStateAndCountry=function(city){
				  scope.formData.zipcode = city;
				//sending request for getting state and country while changing the city
				  RequestSender.addressTemplateResource.get({city :city}, function(data) {
					  scope.formData.state = data.state;
					  scope.formData.country = data.country;
				  },function(errorData) {
					  delete scope.formData.state ;
					  delete scope.formData.country;
				  });
			  };
		  
		  		
			//function called when clicking on Register button in Registration Page
			scope.registerBtnFun =function(){
				
				scope.clientData = {};
				 //deviceNo added to form data when isDeviceEnabled true
					 if(scope.formData.deviceNo){
						 scope.clientData.device = scope.formData.deviceNo;
					 }
					 if(scope.formData.homePhoneNumber){
						 scope.clientData.homePhoneNumber = scope.formData.homePhoneNumber;
					 }
					 
					 var name_array = new Array();
					 name_array = (scope.formData.fullName.split(" "));
			            
			          scope.clientData.firstname = name_array[0];
			          scope.clientData.fullname = name_array[1];
			            if(scope.clientData.fullname == null){
			            	scope.clientData.fullname=".";
			            }
					 scope.clientData.address = scope.formData.address;
					 scope.clientData.nationalId = scope.formData.nationalId;
					 scope.clientData.zipCode = scope.formData.zipcode;
					 scope.clientData.city = scope.formData.city;
					 scope.clientData.phone = parseInt(scope.formData.mobileNo); 
					 scope.clientData.email = scope.existedEmail;
					 
					 rootScope.popUpMsgs = [];
					 RequestSender.authenticationClientResource.save(scope.clientData,function(data){

		  				 
		  			     $modal.open({
		  	                templateUrl: 'messagespopup.html',
		  	                controller: approve,
		  	                resolve:{}
		  	           });
		      	      function  approve($scope, $modalInstance) {
		      	    	  rootScope.popUpMsgs.push({
		      	    		  'image' : './images/info-icon.png',
		      	    		  'names' : [{'name' : 'title.account.activated'},
		      	    		             {'name' : 'title.account.activated.userpwd'},
		      	    		             {'name' : 'title.login.msg'}]
		      	    	      });
		      		
		      		$scope.approve = function () { 
		      			
		      			$modalInstance.dismiss('cancel');
		      			rootScope.currentSession = sessionManager.clear();
		      		};
		        } 
		    });

					
		};
    };
    
selfcareApp.controller('ActivateUserController', ['$scope',
                                                  'RequestSender',
                                                  '$rootScope',
                                                  '$routeParams',
                                                  '$http',
                                                  'webStorage',
                                                  'HttpService',
                                                  'SessionManager',
                                                  '$location',
                                                  'API_VERSION',
                                                  '$filter',
                                                  'AuthenticationService',
                                                  '$modal',
                                                  'localStorageService'
                                                  ,ActivateUserController]);
