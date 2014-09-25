(function(module) {
  mifosX.controllers = _.extend(module, {
	  OrderController: function(scope,webStorage,routeParams,route,resourceFactory,location,$modal,dateFilter,paginatorService,PermissionService) {
        scope.orderPriceDatas = [];
        scope.orderHistorydata=[];
        scope.orderData=[];
        scope.redata={};
        scope.formData=[];
        scope.provisioning={};
        scope.commandData = [];
        scope.start = {};
        scope.start.date = new Date();
        var orderId=routeParams.id;
        scope.isextensionEnable=false;
         scope.clientId=routeParams.clientId;
         var clientData = webStorage.get('clientData');
         webStorage.add("orderId",routeParams.id);
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
         webStorage.add("orderId",routeParams.id);
         scope.PermissionService = PermissionService;
         scope.provisioningdatas =[];
      
        resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
           
        	scope.orderPriceDatas= data.orderPriceData;
            scope.orderHistorydata=data.orderHistory;
            scope.orderData=data.orderData;
           var endDate = new Date(scope.orderData.endDate);
            var curDate = new Date(scope.orderData.currentDate);
            if(dateFilter(endDate.setDate(endDate.getDate()))==dateFilter(curDate.setDate(curDate.getDate()))||
            		dateFilter(endDate.setDate(endDate.getDate()+1))==dateFilter(curDate.setDate(curDate.getDate())))
            	console.log("true");
            else console.log("false");
            scope.formData.flag=data.flag;
            scope.orderServicesData=data.orderServices;
            scope.orderDiscountDatas=data.orderDiscountDatas;
            webStorage.add("orderData", {groupName: data.orderData.groupName,orderNo:data.orderData.orderNo,planName: data.orderData.planCode });
      
	    if(data.orderData.isPrepaid == 'Y'){
            	scope.formData.isPrepaid="Pre Paid";
            	scope.plantype="prepaid";
            }else{
            	scope.formData.isPrepaid="Post Paid";
            	scope.plantype="postpaid";
            }
	    var endDate = new Date(scope.orderData.endDate);
        var curDate = new Date(scope.orderData.currentDate);
        if((dateFilter(endDate.setDate(endDate.getDate()))<=dateFilter(curDate.setDate(curDate.getDate())))&&
                (dateFilter(endDate.setDate(endDate.getDate()+1))>=dateFilter(curDate.setDate(curDate.getDate()))))
        	scope.isextensionEnable=true;
        else scope.isextensionEnable=false;
        
        });
        
       if(PermissionService.showMenu('READ_ASSOCIATION')){ 
    	   resourceFactory.associationResource.getAssociation({clientId: routeParams.clientId,id:routeParams.id} , function(data) {
    		   scope.association = data;
    		   if(data.orderId){
    			   scope.flag=true;
    		   }else{
    			   scope.flag=false;
    		   }
    	   });
       }
        
        scope.reconnect = function (){
        	scope.errorStatus=[];scope.errorDetails=[];
        	 $modal.open({
                 templateUrl: 'ApproveReconnect.html',
                 controller: ApproveReconnect,
                 resolve:{}
             });
          };
          
          scope.reactive= function (){
          	 $modal.open({
                   templateUrl: 'ApproveReactive.html',
                   controller: ApproveReactive,
                   resolve:{}
               });
            };
          
          scope.terminate = function (){
          	scope.errorStatus=[];scope.errorDetails=[];
          	 $modal.open({
                   templateUrl: 'ApproveTerminate.html',
                   controller: ApproveTerminate,
                   resolve:{}
               });
            };
            
            scope.confirmRequest = function (provId){
              	scope.errorStatus=[];
              	scope.errorDetails=[];
              	scope.provId=provId;
              	 $modal.open({
                       templateUrl: 'ApproveConfirm.html',
                       controller: ApproveConfirm,
                       resolve:{}
                   });
                };
            
            scope.suspend = function (){
              	scope.errorStatus=[];scope.errorDetails=[];
              	 $modal.open({
                       templateUrl: 'ApproveSuspend.html',
                       controller: ApproveSuspend,
                       resolve:{}
                   });
                };
          
          scope.orderDisconnect = function(orderDisUrl){
        	  scope.errorStatus=[];scope.errorDetails=[];
        	  $modal.open({
                  templateUrl: 'OrderDisconnect.html',
                  controller: OrderDisconnectController,
                  resolve:{}
              });
          };
          
          scope.orderRenew = function(orderRenewUrl){
        	  scope.errorStatus=[];scope.errorDetails=[];
        	  $modal.open({
        		  templateUrl: 'OrderRenewal.html',
        		  controller: OrderRenewalController,
        		  resolve:{}
        	  });
          };
          scope.cancelOrder=function(){
        	  
        	    resourceFactory.saveOrderResource.delete({'clientId':routeParams.id},{},function(data){
        	    	 location.path('/viewclient/' + routeParams.clientId);
                });
          }
          scope.CommandCenter = function(CommandCenterUrl){
        	  scope.errorStatus=[];scope.errorDetails=[];
          	  $modal.open({
                  templateUrl: 'ProvisioningSystemPop.html',
                  controller: ProvisioningSystemPopController,
                  resolve:{}
              });
          	
          };
          
          scope.applyPromo= function(){
        	  scope.errorStatus=[];
        	  scope.errorDetails=[];
          	  $modal.open({
                  templateUrl: 'Promo.html',
                  controller:applyPromoController ,
                  resolve:{}
              });
          	
          };
          
          
      var applyPromoController=function($scope,$modalInstance){
    	  $scope.start = {};
    	  $scope.start.date = new Date();
    	  resourceFactory.promotionResource.get(function(data) {
      		
      		 $scope.promoDatas=data; 
          });
      	 
       	$scope.accept = function(){
       		$scope.flagPromo=true;
       		var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.locale='en';
            this.formData.startDate = reqDate;
       		resourceFactory.applyPromotionCodeResource.update({'orderId': routeParams.id},this.formData,
       				
     		function(data) {
     			 
     			     },function(errData){
     			    	$scope.flagPromo=false;
         	         	//$scope.renewError = errData.data.errors[0].userMessageGlobalisationCode;
         		});

       		    route.reload();
       		 //location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
			 $modalInstance.close('delete');

    	  
      };  
      
  	$scope.rejectProvisioning = function(){
  		$modalInstance.dismiss('cancel');
  	};
      };
      
      scope.extension= function(){
    	  scope.errorStatus=[];
    	  scope.errorDetails=[];
      	  $modal.open({
              templateUrl: 'extension.html',
              controller:extensionController ,
              resolve:{}
          });
      	
      };
      scope.provision = function(){
    	  $modal.open({
              templateUrl: 'editProvision.html',
              controller: EditProvisionController,
              resolve:{}
          });	
      }
      
      //sent message pop up start 
      scope.sentMessagePopup = function(id){
    	  
    	  scope.provisioningDataId = id;
    	  $modal.open({
              templateUrl: 'sentMessage.html',
              controller: SentMessageController,
              resolve:{}
          });	
      }
      
      var SentMessageController = function($scope,$modalInstance){
    	  
    	  $scope.sentMessage = {};
    	  $scope.messageData = [];
    	  
    	  for (var i in scope.sentMessagesData){
    		  	
    		 if( scope.sentMessagesData[i].id == scope.provisioningDataId){
    			 
    			 var obj  = JSON.parse(scope.sentMessagesData[i].sentMessage);
    			 $scope.sentMessage = obj;
    			 
    	    	  for (var key in $scope.sentMessage) {
    	    		  if(key == "IP_ADDRESS"){
    	    			  $scope.messageData.push({
		  											"key" : key,
		  											"value" :$scope.sentMessage[key].toString(),
    	    			   });	
    	    			  
    	    		  }
    	    		  else{
    	    			  $scope.messageData.push({
    	    			  						"key" : key,
    	    			  						"value" : $scope.sentMessage[key],
    	    			  });	
    	    		  }
    	    	  };
   	    		break;
    		 };
    	  }
    	  
			$scope.cancel = function(){
				$modalInstance.dismiss('cancel');
			};
    };
     //sent message pop up end 
    
      var EditProvisionController = function($scope,$modalInstance){
			$scope.parameterDatas = [];
			resourceFactory.provisioningtemplateDataResource.get({orderId: routeParams.id}, function(data) {
					$scope.parameterDatas = data.parameterDatas;
			});
	
			$scope.cancel = function(){
				$modalInstance.dismiss('cancel');
			};
      };
      
      scope.getAllProvisioningDetails = function (orderNo) {
          
          
          resourceFactory.provisioningtemplateMappingResource.get({orderNo:orderNo} , function(data) {
              scope.provisioningdatas = data;
              scope.sentMessagesData = [];
              for(var i in data){
            	  scope.sentMessagesData.push(data[i]);
              };
              
            });
      };
      
      var extensionController=function($scope,$modalInstance){
    	  
    	  resourceFactory.orderExtensionResource.get(function(data) {
	            $scope.extensionReasonDatas = data.extensionReasonDatas;
	            $scope.extensionPeriodDatas = data.extensionPeriodDatas;
	        });
       	$scope.accept = function(){
       		$scope.flagExtension=true;
       		resourceFactory.orderExtensionResource.update({orderId: routeParams.id} ,this.formData, function(data) {  
                
                /*resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                          scope.orderPriceDatas= data.orderPriceData;
                          scope.orderHistorydata=data.orderHistory;
                          scope.orderData=data.orderData;
                      });*/
                route.reload();
                      $modalInstance.close('delete');
                  },function(errData){
                $scope.flagApproveReconnect = false;
                 });
       	};  
  		$scope.rejectExtension = function(){
  			$modalInstance.dismiss('cancel');
  		};
      };
       		
     var ProvisioningSystemPopController = function($scope,$modalInstance){
         	 resourceFactory.provisioningMappingResource.getprovisiongData(function(data) {
         		 $('#commandName').hide();
         		 $scope.commandData=data; 
             });
         	 
          	$scope.acceptProvisioning = function(){
          		$scope.flagProvisioningSystemPop=true;
          		if(this.provisioning == undefined || this.provisioning == null){
              		this.provisioning = {};
              	} 		
          		if(this.formData.commandname.commandName=='OSM'){
          			  this.provisioning.commandName=this.formData.commandname.commandName;
          			  this.provisioning.message=this.formData.message;
        				resourceFactory.osdResource.save({'orderId': routeParams.id},this.provisioning,
        						function(data) {
        					 location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
        					 $modalInstance.close('delete');
        				     },function(renewalErrorData){
        				    	 $scope.flagProvisioningSystemPop=false;
            	         	$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
            						});
          		}
          		else{
          		    this.provisioning.commandName=this.formData.commandname.commandName;
          			resourceFactory.osdResource.getPost({'orderId': routeParams.id} ,this.provisioning, function(data) {
                        location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                        $modalInstance.close('delete');           
          			 },function(renewalErrorData){
          				$scope.flagProvisioningSystemPop=false;
         	        	$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
         						});
          		}
          		  
          	};
          	
          	$scope.commandName=function(name){
          		if(this.formData.commandname.commandName=='OSM'){
          			$('#commandName').show();
          		}else{
          			$('#commandName').hide();
          		}
          		
          	};
          	
          	$scope.rejectProvisioning = function(){
          		$modalInstance.dismiss('cancel');
          	};
          };
          
    	var ApproveReconnect = function ($scope, $modalInstance) {
    		
            $scope.approveReconnect = function () {

            	$scope.flagApproveReconnect=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	resourceFactory.OrderreconnectResource.update({orderId: routeParams.id} ,this.formData, function(data) {              	
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    $modalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        
	var ApproveReactive = function ($scope, $modalInstance) {
    		
            $scope.approveReactive= function () {

            	$scope.flagApproveReactive=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	resourceFactory.OrderReactiveResource.update({orderId: routeParams.id} ,this.formData, function(data) {              	
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    $modalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        
        
  var ApproveTerminate = function ($scope, $modalInstance) {
    		
            $scope.approveTerminate = function () {

            	$scope.flagapproveTerminate=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	resourceFactory.OrderTerminateResource.update({orderId: routeParams.id} ,this.formData, function(data) {              	
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    $modalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        
 var ApproveConfirm= function ($scope, $modalInstance) {
    		
            $scope.approveTerminate = function () {

            	$scope.flagapproveTerminate=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	  resourceFactory.confirmProvisioningDetailsResource.update({'provisioningId':scope.provId},{},function(data){
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    $modalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $modalInstance.dismiss('cancel');
            };
        };  
        
 var ApproveSuspend = function ($scope, $modalInstance) {
	 
	 $scope.reasons = [];
	 $scope.start = {};
	 $scope.start.date = new Date();
	 $scope.maxDate=new Date();
	  resourceFactory.OrderSuspensionResource.get(function(data) {
         $scope.reasons = data.reasons;
     });
    		
            $scope.approveSuspend= function () {

            	$scope.flagapproveTerminate=true;
            	if(this.formData == undefined || this.formData == null){
            		this.formData = {};
            	}
            	  var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
      	        this.formData.dateFormat = 'dd MMMM yyyy';
      	        this.formData.suspensionDate = reqDate;
      	      
      	        this.formData.locale = "en";
            	resourceFactory.OrderSuspensionResource.update({orderId: routeParams.id} ,this.formData, function(data) {              	
            		resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
                        scope.orderPriceDatas= data.orderPriceData;
                        scope.orderHistorydata=data.orderHistory;
                        scope.orderData=data.orderData;
                    });
            		location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);
                    $modalInstance.close('delete');
                },function(errData){
	        		$scope.flagApproveReconnect = false;
	        		$scope.renewError = errData.data.errors[0].userMessageGlobalisationCode;
		          });
            	
            };
            $scope.cancelReconnect = function () {
                $modalInstance.dismiss('cancel');
            };
        }; 
        

          
          var OrderRenewalController = function($scope,$modalInstance){
        	  $scope.subscriptiondatas = [];
        	  resourceFactory.OrderrenewalResourceTemplate.get({orderId:routeParams.id,planType:scope.plantype},function(data) {
                  $scope.subscriptiondatas = data.subscriptiondata;
              });
        	  
        	  $scope.approveRenewal = function(){
        		  $scope.flagOrderRenewal=true;
        		  
        		  if($scope.formData == undefined || $scope.formData == null){
        			  $scope.formData = {"renewalPeriod":"","description":""};
        		  }
        		  
        		  resourceFactory.OrderrenewalResource.save({'orderId': routeParams.id},this.formData,function(data){
        	            //location.path('/vieworder/'+data.resourceId);
        	            
        	            resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
        	            scope.orderPriceDatas= data.orderPriceData;
        	            scope.orderHistorydata=data.orderHistory;
        	            scope.orderData=data.orderData;
        	            });
        	             
        	            $modalInstance.close('delete');
        	            
        	        },function(renewalErrorData){
        	      	  $scope.flagOrderRenewal=false;
        	        	$scope.renewError = renewalErrorData.data.errors[0].userMessageGlobalisationCode;
        	        });
        	  };
        	  $scope.cancelRenewal = function(){
        		  console.log('cancel renewal');
        		  $modalInstance.dismiss('cancel');
        	  };
          };
          
          
          var OrderDisconnectController = function ($scope, $modalInstance) {
              
        	  $scope.disconnectDetails = [];
        	  $scope.start = {};
        	  $scope.start.date = new Date();
              resourceFactory.OrderDisconnectResource.get(function(data) {
                  $scope.disconnectDetails = data.disconnectDetails;
              });
        	  console.log($scope.disconnectDetails);
        	  
        	  $scope.approveDisconnection = function () {
        		  $scope.flagOrderDisconnect=true;
        		  if(this.formData == undefined || this.formData == null){
        			  this.formData = {"disconnectReason":""};
        		  }
        		  
        		  var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
        	        this.formData.dateFormat = 'dd MMMM yyyy';
        	        this.formData.disconnectionDate = reqDate;
        	        this.formData.locale = "en";
        		  
        		  resourceFactory.saveOrderResource.update({'clientId': routeParams.id},this.formData,function(data){
        	            /*location.path('/viewclient/'+scope.orderPriceDatas[0].clientId);
        	            location.path('/vieworder/'+data.resourceId);*/
        			  	
        			  resourceFactory.getSingleOrderResource.get({orderId: routeParams.id} , function(data) {
        		            scope.orderPriceDatas= data.orderPriceData;
        		            scope.orderHistorydata=data.orderHistory;
        		            scope.orderData=data.orderData;
        		        });
        			    console.log(data.resourceId);
        	            $modalInstance.close('delete');
        	        },function(orderErrorData){
        	        	 $scope.flagOrderDisconnect=false;
        	        	$scope.orderError = orderErrorData.data.errors[0].userMessageGlobalisationCode;
        	        });
        		  
              };
              $scope.cancelDisconnection = function () {
                  $modalInstance.dismiss('cancel');
              };
              
              
          };
          
        scope.cancel=function(){
            resourceFactory.saveOrderResource.delete({'clientId':routeParams.id},{},function(data){
            		location.path('/viewClient/'+scope.orderPriceDatas[0].clientId);  
            	});
          }
        
        scope.deAssociation=function (){
        	
        	resourceFactory.deAssociationResource.update({id:scope.association.id} , function(data) {
        		 console.log('/vieworder/'+routeParams.id+'/'+scope.orderPriceDatas[0].clientId);
             
        		 route.reload();
            });
        };
        
      scope.reProcess=function(processId){
    	  
    	  resourceFactory.updateProvisioningMappingResource.update({'provisioningId':processId},{},function(data){
          	/*location.path('/vieworder/'+routeParams.id+'/'+scope.orderPriceDatas[0].clientId);
          	location.path('/vieworder/'+routeParams.id+"/"+scope.clientId);*/
    		  route.reload();
	           
	          });
    	  
      }
          scope.updatePrice = function (id,price){
        	  scope.orderData.locale="en";
        	  scope.orderData.price=price;
        	  scope.orderData.priceId=id;
        	
              resourceFactory.getSingleOrderResource.update({orderId: routeParams.id} ,scope.orderData, function(data) {
                 
            	  //location.path('/vieworder/'+data.resourceId);
            	
              },function(error){
            	  scope.errorStatus=[];scope.errorDetails=[];
              });
        
            };
    }
  
  
  });
  
  mifosX.ng.application.controller('OrderController', ['$scope','webStorage','$routeParams','$route', 'ResourceFactory','$location','$modal','dateFilter','PaginatorService','PermissionService',mifosX.controllers.OrderController]).run(function($log) {
    $log.info("OrderController initialized");
  });
}(mifosX.controllers || {}));
