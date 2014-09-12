(function(module) {
  mifosX.controllers = _.extend(module, {
    ViewClientController: function(scope,webStorage, routeParams , route, location, resourceFactory,paginatorService, http,$modal,dateFilter,API_VERSION,$rootScope,PermissionService) {
    	 scope.client = [];
         scope.error = {};
         scope.identitydocuments = [];
         scope.buttons = [];
         scope.clientdocuments = [];
         scope.clientcarddetails = [];
         scope.staffData = {};
         scope.orders = [];
         scope.scheduleorders=[];
         scope.ippoolDatas = [];
         scope.formData = {};
 		 scope.start = {};
         scope.start.date = new Date();
         scope.payment="PAYMENT";
         scope.invoice="INVOICE";
         scope.adjustment="ADJUSTMENT";
         scope.PermissionService = PermissionService;
         scope.ipstatus;
         scope.ipId;
         
            var callingTab = webStorage.get('callingTab',null);
         if(callingTab == null){
         	callingTab="";
         }else{
 		  scope.displayTab=callingTab.someString;
 		 
 		  if( scope.displayTab == "moreInfo"){
 			 
 			  scope.moreInfoTab = true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "documents"){
  			  scope.moreInfoTab = true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "Tickets"){
 			  scope.TicketsTab = true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "eventordertab"){
 			  scope.eventordertab =  true;
 			  webStorage.remove('callingTab');
 		  }
 		  else if(scope.displayTab == "Sale"){
 			  scope.SaleTab =  true;
 			  scope.eventsaleC="active";
 			  scope.mydeviceC="";
 			  webStorage.remove('callingTab');
 		  }else if(scope.displayTab == "Statements"){
 			  scope.StatementsTab =  true;
 			  webStorage.remove('callingTab');
 		  }else if(scope.displayTab == "eventOrders"){
 			scope.SaleTab = true;
 			scope.eventsaleC="";
 			scope.eventorderC="active";
 			webStorage.remove('callingTab');
 		  }else if(scope.displayTab == "creditCardDetails"){
 			  scope.moreInfoTab = true;
  			  webStorage.remove('callingTab');
 		  }else if(scope.displayTab == "ACHDetailsTab"){
 			  scope.moreInfoTab = true;
  			  webStorage.remove('callingTab');
 		  }else if(scope.displayTab == "ChildDetailsTab"){
 			  scope.identitiesTab = true;
  			  webStorage.remove('callingTab');
 		  }else
 		  {
 			  webStorage.remove('callingTab');
 		  };
 		 
         }
         
         scope.routeTogeneral = function(orderid,clientid){
             location.path('/vieworder/'+orderid+'/'+clientid);
           };
           
         scope.routeToOwnHardware = function(id){
               location.path('/viewownhardware/'+ id);
             };
           
         scope.routeToticket = function(clientId,ticketid){
               location.path('/viewTicket/'+clientId+'/'+ticketid);
         };
         scope.routeToFollowupTicket=function(clientId,ticketid){
        	 location.path('/editTicket/'+clientId+'/'+ticketid);
         };
         scope.routeToCloseTicket=function(clientId,ticketid){
        	 location.path('/closeTicket/'+clientId+'/'+ticketid);
         };
         scope.routeTostatement = function(statementid){
             location.path('/viewstatement/'+statementid);
        };
        scope.routeTofinancial = function(transactionId,transtype,clientid){
        	
        	if(transtype == 'INVOICE'){
               location.path('/viewfinancialtran/'+transactionId+'/'+clientid);
        	}
        }; 
        scope.routeToItemSale = function(onetimesaleid,clientid){
            location.path('/viewonetimesale/'+onetimesaleid+'/'+clientid);
        };

        scope.routeToCardDetails = function(clientid,id,cardType){
            location.path('/viewcarddetails/'+clientid+'/'+id+'/'+cardType);
          };
          
          scope.routeTotable = function(tableName,clientId,cardType){
              location.path('/viewdatatableentry/'+tableName+'/'+clientId+'/'+cardType);
            };
          
       
        var bookOrder = PermissionService.showMenu('CREATE_ORDER')&&PermissionService.showMenu('READ_ORDER');
        var riseTicket = PermissionService.showMenu('CREATE_TICKET')&&PermissionService.showMenu('READ_TICKET');
        var makePayment = PermissionService.showMenu('CREATE_PAYMENT')&&PermissionService.showMenu('READ_GETPAYMENT');
        var payInvoice = PermissionService.showMenu('CREATE_PAYMENT')&&PermissionService.showMenu('READ_GETPAYMENT')&&PermissionService.showMenu('READ_INVOICEMAP');
        var distribute =  PermissionService.showMenu('CREATE_CREDITDISTRIBUTION')&&PermissionService.showMenu('READ_CREDITDISTRIBUTION');
        var postAdjustment =  PermissionService.showMenu('CREATE_ADJUSTMENT')&&PermissionService.showMenu('READ_ADJUSTMENT');
        var doInvoice = PermissionService.showMenu('CREATE_INVOICE');
        var statement = PermissionService.showMenu('READ_BILLMASTER');
        var edit = PermissionService.showMenu('UPDATE_CLIENT');
        var acceptTransfer = PermissionService.showMenu('ACCEPTTRANSFER_CLIENT');
        var rejectTransfer = PermissionService.showMenu('REJECTTRANSFER_CLIENT');
        var undoTransfer = PermissionService.showMenu('WITHDRAWTRANSFER_CLIENT');

        var getDetails = function(){
        	
        	resourceFactory.clientResource.get({clientId: routeParams.id} , function(data) {
                scope.orders = [];
                    scope.client = data;
                    scope.statusActive=scope.client.status.code;
                    scope.taxExemption=scope.client.taxExemption;
                
                    
                    webStorage.add("clientData", {clientId:routeParams.id,balanceAmount: data.balanceAmount, displayName: data.displayName,hwSerialNumber: data.hwSerialNumber,

                     statusActive: data.status.value, accountNo: data.accountNo, officeName: data.officeName,officeId:data.officeId,

                     currency: data.currency, imagePresent: data.imagePresent,phone:data.phone,email:data.email,categoryType:data.categoryType });
                    
                    scope.staffData.staffId = data.staffId;
                    if (data.imagePresent) {
                      http({
                        method:'GET',
                        url: $rootScope.hostUrl+ API_VERSION +'/clients/'+routeParams.id+'/images'
                      }).then(function(imageData) {
                        scope.image = imageData.data;
                      });
                    }
                  

                    //if (data.status.value == "Active") {
                      scope.buttons = [{

                      	                  name:"button.sale",
                      	                  href:"#/addonetimesale",
                      	                  icon:"icon-tag",
                      	                  ngShow : bookOrder
                         	            },
                         	            {
                                          name:"button.neworder",
                                          href:"#/neworder/0",
                                          icon :"icon-plus-sign",
                                          ngShow : bookOrder
                                        	 
                                        },
                                      
                                        {
                                          name:"button.newTicket",
                                          href:"#/newTicket",
                                          icon :"icon-flag",
                                          ngShow : riseTicket
                                        },
                                        
                                        /*{

                                            name:"button.payments",
                                            href:"#/payments",
                                            icon :"icon-usd",
                                            ngShow : makePayment
                                         },
                                            icon :"icon-usd"
                                         },*/
                                         {

                                             name:"button.payments",
                                             href:"#/payinvoice",
                                             icon :"icon-usd",
                                             ngShow : payInvoice
                                          },
                                         /* {

                                              name:"button.distribution",
                                              href:"#/creditDistribution",
                                              icon :"icon-usd",
                                              ngShow : distribute
                                           },
                                              icon :"icon-usd"
                                           },*/
                                          
                                         {
                                             name:"button.adjustments",
                                             href:"#/adjustments",
                                             icon :"icon-adjust",
                                             ngShow : postAdjustment
                                         },
                                         {
                                             name:"button.invoice",
                                             href:"#/clientinvoice",
                                             icon :"icon-play",
                                             ngShow : doInvoice
                                          },
                                          {
                                             name:"button.statement",
                                             href:"#/statement",
                                             icon :"icon-file",
                                             ngShow : statement
                                         },                                                                              

                                         {
	                                        name:"button.edit",
	                                        href:"#/editclient",
	                                        icon :"icon-edit",
	                                        ngShow : edit
                                        },
                                        {
                                        	name:"Delete",
                                        	href:"#/closeclient",
                                        	icon:"icon-remove",
                                        	 ngShow : "true"
                                        },
                                        {
	                                          name:"",	
	                                          href:"#/viewclient",
	                                          icon :"icon-refresh",
	                                          ngShow : "true"
                                        }
                                      ]

                   

                    if (data.status.value == "Transfer in progress") {
                      scope.buttons = [{
                                        name:"button.accept.transfer",
                                        href:"#/client",
                                        subhref:"acceptclienttransfer",
                                        icon :"icon-check-sign",
                                        ngShow : acceptTransfer
                                      },
                                      {
                                        name:"button.reject.transfer",
                                        href:"#/client",
                                        subhref:"rejecttransfer",
                                        icon :"icon-remove",
                                        ngShow : rejectTransfer
                                      },
                                      {
                                        name:"button.undo.transfer",
                                        href:"#/client",
                                        subhref:"undotransfer",
                                        icon :"icon-undo",
                                        ngShow : undoTransfer
                                      }]
                    }

                    if (data.status.value == "Transfer on hold") {
                      scope.buttons = [{
                                        name:"button.undo.transfer",
                                        href:"#/client",
                                        subhref:"undotransfer",
                                        icon :"icon-undo",
                                        ngShow : undoTransfer
                                      }]
                    }
                if(PermissionService.showMenu('READ_ORDER'))
                  resourceFactory.getOrderResource.getAllOrders({clientId: routeParams.id} , function(data) {
                      scope.orders = data.clientOrders;
                  });
                  resourceFactory.EventActionResource.get({clientId: routeParams.id} , function(data) {
                      scope.scheduleorders = data;
                      
                  });
                  resourceFactory.DataTablesResource.getAllDataTables({apptable: 'm_client'}, function (data) {
                      scope.clientdatatables = data;
                     
                  });
                });
        };
      
        getDetails();
        var Approve = function($scope,$modalInstance){
        	
			$scope.accept = function(date){
				$scope.flagapprove1 = true;
			        	scope.formData.locale = 'en';
			        	var reqDate = dateFilter(date,'dd MMMM yyyy');
			            scope.formData.dateFormat = 'dd MMMM yyyy';
			            scope.formData.systemDate=reqDate;
			            resourceFactory.clientInvoiceResource.save({'clientId': routeParams.id},scope.formData,function(data,putResponseHeaders){
			            	$modalInstance.close('delete');
			            	getDetails();
			          },function(errData){

			        		$scope.flagapprove1 = false;

			        	  $scope.error = errData.data.errors[0].userMessageGlobalisationCode;
			          });
			};
			$scope.reject = function(){
				$modalInstance.dismiss('cancel');
			};
		};
		
		  var CancelPayment = function($scope,$modalInstance,getPaymentId){
				$scope.accept = function(cancelRemark){
					$scope.flagcancelpayment=true;
					var paymentId=getPaymentId;
					scope.formData.cancelRemark=cancelRemark;
				            resourceFactory.cancelPaymentResource.update({'paymentId':paymentId},scope.formData,function(data){
				            	$modalInstance.close('delete');
				            	getDetails();

				            	scope.getAllFineTransactions();
				          },function(errData){
				        		$scope.flagcancelpayment = false;
				          });

				            
				};
				$scope.reject = function(){
					$modalInstance.dismiss('cancel');
				};
			};
			
        scope.cancelPayment=function(id){
        	$modal.open({
                templateUrl: 'cancelpayment.html',
                controller: CancelPayment,
                resolve:{
                	 getPaymentId:function(){
                 		return id;
                 	  }
                }
            });
        }
		scope.getMe = function(href,cId,subHref){
        	var url = href.replace("#","")+"/"+cId+""+(subHref==undefined?"":"/"+subHref);
        	console.log(url);
        	if(href=="#/clientinvoice"){
        		$modal.open({
                    templateUrl: 'approve1.html',
                    controller: Approve,
                    resolve:{}
                });
        	}else if(href=="#/statement"){
        		$modal.open({
                    templateUrl: 'StatementPop.html',
                    controller: StatementPopController,
                    resolve:{}
                });
        	}else if(href=="#/viewclient"){
        		route.reload();
        	}else{
        		location.path(url);
        	}
        };
        
 var StatementPopController = function($scope,$modalInstance){
        	
        	$scope.start = {};
        	
            $scope.start.date = new Date();
        	$scope.acceptStatement = function(){
        		$scope.flagStatementPop = true;
        		console.log("Accept Statement");
        		if($scope.formData == undefined || $scope.formData == null){
                    $scope.formData = {"message":""};
                      }
        		this.formData.locale = 'en';
   	         	var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
   	         	this.formData.dateFormat = 'dd MMMM yyyy';
   	         	this.formData.dueDate=reqDate;
        		
        		resourceFactory.statementResource.save({'clientId': routeParams.id},this.formData,function(data) {
                    location.path('/billmaster/' +routeParams.id);
                    $modalInstance.close('delete');
                },function(errorData){
                	$scope.flagStatementPop = false;
                	$scope.stmError = errorData.data.errors[0].userMessageGlobalisationCode;
                	console.log(errorData);
                	console.log($scope.stmError);
                });
        	};
        	$scope.rejectStatement = function(){
        		console.log("Reject Statement");
        		$modalInstance.dismiss('cancel');
        	};
        };
        
        scope.deleteClient = function () {
            $modal.open({
                templateUrl: 'deleteClient.html',
                controller: ClientDeleteCtrl
            });
        };
        scope.unassignStaffCenter = function () {
            $modal.open({
                templateUrl: 'clientunassignstaff.html',
                controller: ClientUnassignCtrl
            });
        };
        var ClientDeleteCtrl = function ($scope, $modalInstance) {
            $scope.delete = function () {
                resourceFactory.clientResource.delete({clientId: routeParams.id}, {}, function(data){
                    location.path('/clients');
                });
                $modalInstance.close('delete');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        var ClientUnassignCtrl = function ($scope, $modalInstance) {
            $scope.unassign = function () {
                resourceFactory.clientResource.save({clientId: routeParams.id, command : 'unassignstaff'}, scope.staffData,function(data){
                    route.reload();
                });
                $modalInstance.close('unassign');
            };
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        };
        scope.getClientNotes = function(){
        	if(PermissionService.showMenu('READ_CLIENTNOTE')){
        		resourceFactory.clientNotesResource.getAllNotes({clientId: routeParams.id} , function(data) {
        			scope.clientNotes = data;
        		});
        	}
        }
        
        scope.getClientIdentityDocuments = function () {
 
        	scope.indentitiesSubTab = "active";
        	scope.documnetsUploadsTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab="";
        	
        	if(scope.displayTab == "documents"){
        		scope.indentitiesSubTab = "";
            	scope.documnetsUploadsTab = "active";
            	scope.creditCardDetailsTab = "";
            	scope.ACHDetailsTab = "";
            	scope.ChildDetailsTab="";
            	scope.displayTab = "";
            	scope.documnetsUploadsTabFun();
        		
        	}else if(scope.displayTab == "creditCardDetails"){
        		scope.indentitiesSubTab = "";
            	scope.documnetsUploadsTab = "";
            	scope.creditCardDetailsTab = "active";
            	scope.ACHDetailsTab = "";
            	scope.ChildDetailsTab="";
            	scope.displayTab = "";
            	scope.creditCardDetailsTabFun();
        	}else if(scope.displayTab == "ACHDetailsTab"){
        		scope.indentitiesSubTab = "";
            	scope.documnetsUploadsTab = "";
            	scope.creditCardDetailsTab = "";
            	scope.ACHDetailsTab = "active";
            	scope.ChildDetailsTab="";
            	scope.displayTab = "";
            	scope.ACHDetailsTabFun();
        	}else if(scope.displayTab == "ChildDetailsTab"){
        		scope.indentitiesSubTab = "";
            	scope.documnetsUploadsTab = "";
            	scope.creditCardDetailsTab = "";
            	scope.ACHDetailsTab = "";
            	scope.ChildDetailsTab="active";
            	scope.displayTab = "";
            	scope.childsFun();
        	}
         //  console.log(scope.taxExemption);
        	 if(scope.taxExemption=='N'){
        	
        		 $('#onbtn').removeClass("btn-default");
             	 $('#onbtn').addClass("active btn-primary");
             	 $('#offbtn').removeClass("active btn-primary");
             	 $('#offbtn').addClass("btn-default");
               }
               else{
            	  $('#offbtn').removeClass(" btn-default");
             	  $('#offbtn').addClass("active btn-primary");
             	  $('#onbtn').removeClass("active btn-primary");
             	  $('#onbtn').addClass("btn-default");
               }
        	 
        	 
        	 scope.onbtn = function(){
           	   $('#onbtn').removeClass("btn-default");
           	   $('#onbtn').addClass("active btn-primary");
           	   $('#offbtn').removeClass("active btn-primary");
           	   $('#offbtn').addClass("btn-default");
           	  var obj = {"taxExemption":false};
           	  scope.taxExemption='N';
             	resourceFactory.taxExemptionResource.update({clientId:routeParams.id},obj,function(data){
             	});
             		
             };
             scope.offbtn = function(){
           	   $('#offbtn').removeClass("btn-default");
           	   $('#offbtn').addClass("active btn-primary");
           	   $('#onbtn').addClass("btn-default");
           	   $('#onbtn').removeClass("active btn-primary");
           	  var obj = {"taxExemption":true};
           	  scope.taxExemption='Y';
               	resourceFactory.taxExemptionResource.update({clientId:routeParams.id},obj,function(data){
               	});
             };
        	
          resourceFactory.clientResource.getAllClientDocuments({clientId: routeParams.id, anotherresource: 'identifiers'} , function(data) {
              scope.identitydocuments = data;
              for(var i = 0; i<scope.identitydocuments.length; i++) {
                resourceFactory.clientIdentifierResource.get({clientIdentityId: scope.identitydocuments[i].id} , function(data) {
                  for(var j = 0; j<scope.identitydocuments.length; j++) {
                     if(data.length > 0 && scope.identitydocuments[j].id == data[0].parentEntityId)
                      {
                        scope.identitydocuments[j].documents = data;
                      }
                  }
                });
              }
          });
          
          //parentClient 
           resourceFactory.clientParentResource.get({clientId:routeParams.id},function(data) {
        	  scope.parent = [];
        	  scope.parent=data.parentClientData;
        	  scope.parentCount=data.count;
        	  
          });
          
        };
        
      //identities tab fun
        scope.indentitiesTabFun = function(){
        	
        	scope.indentitiesSubTab = "active";
        	scope.documnetsUploadsTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab="";
        	
        	resourceFactory.clientResource.getAllClientDocuments({clientId: routeParams.id, anotherresource: 'identifiers'} , function(data) {
                scope.identitydocuments = data;
                for(var i = 0; i<scope.identitydocuments.length; i++) {
                  resourceFactory.clientIdentifierResource.get({clientIdentityId: scope.identitydocuments[i].id} , function(data) {
                    for(var j = 0; j<scope.identitydocuments.length; j++) {
                       if(data.length > 0 && scope.identitydocuments[j].id == data[0].parentEntityId)
                        {
                          scope.identitydocuments[j].documents = data;
                        }
                    }
                  });
                }
            });
            
           
        }
        
        scope.documnetsUploadsTabFun = function(){
        	scope.indentitiesSubTab = "";
        	scope.documnetsUploadsTab = "active";
        	scope.creditCardDetailsTab = "";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab="";
        	
        	 //documents details
            if(PermissionService.showMenu('READ_DOCUMENT')){
        		resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId: routeParams.id} , function(data) {
        				scope.clientdocuments = data;
        		});
        	};  
        }
        
        scope.creditCardDetailsTabFun = function(){
        	scope.indentitiesSubTab = "";
        	scope.documnetsUploadsTab = "";
        	scope.creditCardDetailsTab = "active";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab="";
        	
        	//credit card details
            resourceFactory.creditCardSaveResource.get({clientId: routeParams.id} , function(data1) {

                var key  = mifosX.models.encrptionKey;
                scope.clientcarddetails = data1;
                for ( var i in scope.clientcarddetails) {	

                    if(scope.clientcarddetails[i].type=='CreditCard'){
                  	  
  				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardNumber, key);
  				         var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
  				          var stars = "";
  				         for (var j in cardNum){
  				        	 if(j>=0&&j<(cardNum.length)-4){
  				        		 stars += "*";
  				        	 };
  				         }
  				         cardNum = stars+cardNum.substr(cardNum.length-4,cardNum.length-1);
  				         scope.clientcarddetails[i].cardNumber = cardNum;
  				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardExpiryDate,  key);
  				        scope.clientcarddetails[i].cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
  				        
                    }else if(scope.clientcarddetails[i].type=='ACH'){
                	        
  				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].routingNumber,  key);
  				        var routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
  				          var stars = "";
  				         for (var j in routingNumber){
  				        	 if(j>=0&&j<(routingNumber.length)-4){
  				        		 stars += "*";
  				        	 };
  				         }
  				         routingNumber = stars+routingNumber.substr(routingNumber.length-4,routingNumber.length-1);
  				         scope.clientcarddetails[i].routingNumber = routingNumber;

  				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankAccountNumber,  key);
  				        var bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
  				          var stars = "";
  				         for (var j in bankAccountNumber){
  				        	 if(j>=0&&j<(bankAccountNumber.length)-4){
  				        		 stars += "*";
  				        	 };
  				         }
  				         bankAccountNumber = stars+bankAccountNumber.substr(bankAccountNumber.length-4,bankAccountNumber.length-1);
  				         scope.clientcarddetails[i].bankAccountNumber = bankAccountNumber;
  				         
  				         var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankName,  key);
  					        scope.clientcarddetails[i].bankName = decrypted3.toString(CryptoJS.enc.Utf8);

                    }
                }
              });
        }
        
        scope.ACHDetailsTabFun = function(){
        	scope.indentitiesSubTab = "";
        	scope.documnetsUploadsTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.ACHDetailsTab = "active";
        	scope.ChildDetailsTab="";
        	//credit card details
            resourceFactory.creditCardSaveResource.get({clientId: routeParams.id} , function(data1) {

                var key  = mifosX.models.encrptionKey;
                scope.clientcarddetails = data1;
                for ( var i in scope.clientcarddetails) {	

                    if(scope.clientcarddetails[i].type=='CreditCard'){
                  	  
  				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardNumber, key);
  				         var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
  				          var stars = "";
  				         for (var j in cardNum){
  				        	 if(j>=0&&j<(cardNum.length)-4){
  				        		 stars += "*";
  				        	 };
  				         }
  				         cardNum = stars+cardNum.substr(cardNum.length-4,cardNum.length-1);
  				         scope.clientcarddetails[i].cardNumber = cardNum;
  				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardExpiryDate,  key);
  				        scope.clientcarddetails[i].cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
  				        
                    }else if(scope.clientcarddetails[i].type=='ACH'){
                	        
  				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].routingNumber,  key);
  				        var routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
  				          var stars = "";
  				         for (var j in routingNumber){
  				        	 if(j>=0&&j<(routingNumber.length)-4){
  				        		 stars += "*";
  				        	 };
  				         }
  				         routingNumber = stars+routingNumber.substr(routingNumber.length-4,routingNumber.length-1);
  				         scope.clientcarddetails[i].routingNumber = routingNumber;

  				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankAccountNumber,  key);
  				        var bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
  				          var stars = "";
  				         for (var j in bankAccountNumber){
  				        	 if(j>=0&&j<(bankAccountNumber.length)-4){
  				        		 stars += "*";
  				        	 };
  				         }
  				         bankAccountNumber = stars+bankAccountNumber.substr(bankAccountNumber.length-4,bankAccountNumber.length-1);
  				         scope.clientcarddetails[i].bankAccountNumber = bankAccountNumber;
  				         
  				         var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankName,  key);
  					        scope.clientcarddetails[i].bankName = decrypted3.toString(CryptoJS.enc.Utf8);

                    }
                }
              });
        }

        /**Child Details Function*/ 	
        scope.childsFun = function(){
        	
        	scope.indentitiesSubTab = "";
        	scope.documnetsUploadsTab = "";
        	scope.creditCardDetailsTab = "";
        	scope.ACHDetailsTab = "";
        	scope.ChildDetailsTab="active";
        	
        	/*resourceFactory.clientChildResource.get({clientId:routeParams.id},function(data) {
                scope.childsDatas = data;
            });*/
        	resourceFactory.clientParentResource.get({clientId:routeParams.id},function(data) {
          	  scope.childsDatas=data.parentClientData;
          	  scope.parentCount=data.count;
          	  
            });
           
        };
        
//leftside orderMenu function
     /*   scope.selectedOrder = function(status){
        	if(status="ACTIVE")
        		scope.orderMenu = true;
        }*/
        
        
        scope.getClientTemplateDocuments = function() {
          resourceFactory.templateResource.get({entityId : 0, typeId : 0}, function(data) {
            scope.clientTemplateData = data;
          });
        }

        /*scope.getTransactionHistory = function () {
            resourceFactory.transactionHistoryResource.getTransactionHistory({clientId: routeParams.id} , function(data) {
              scope.transactionhistory = data;
            });
          };*/
        
        scope.getTransactionHistoryFetchFunction = function(offset, limit, callback) {
  			resourceFactory.transactionHistoryResource.getTransactionHistory({clientId: routeParams.id ,offset: offset, limit: limit} , callback);
  			};
  			
  		  scope.getClientDistributionFetchFunction = function(offset, limit, callback) {
    			resourceFactory.creditDistributionResource.get({clientId: routeParams.id ,offset: offset, limit: limit} , callback);
    			};
    			
    	  scope.getClientNetworkIpsFetchFunction = function() {
    	   resourceFactory.clientIpPoolingResource.get({clientId: routeParams.id} , function(data) {
               scope.ippoolDatas = data;
           });
    	  };
          scope.getTransactionHistory = function () {
          	scope.transactionhistory = paginatorService.paginate(scope.getTransactionHistoryFetchFunction, 14);
          };
      
          scope.getClientDistribution =function(){
        		scope.clientDistribution = paginatorService.paginate(scope.getClientDistributionFetchFunction, 14);
          }
          scope.searchTransactionHistory123 = function(offset, limit, callback) {
	    	  resourceFactory.transactionHistoryResource.getTransactionHistory({ clientId: routeParams.id ,
	    		  offset: offset, limit: limit ,sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchTransactionHistory = function(filterText) {
	  			scope.transactionhistory = paginatorService.paginate(scope.searchTransactionHistory123, 14);
	  		}; 
        
        
        
        scope.getClientTemplate = function(templateId) {
          scope.selectedTemplate = templateId;
          http({
            method:'POST',
            url: $rootScope.hostUrl+ API_VERSION +'/templates/'+templateId+'?clientId='+routeParams.id,
            data: {}
          }).then(function(data) {
            scope.template = data.data;
          });
        }

       /* resourceFactory.DataTablesResource.getAllDataTables({apptable: 'm_client'} , function(data) {
          scope.clientdatatables = data;
        });*/
        
        scope.getClientStatements = function () {
            resourceFactory.statementResource.get({clientId: routeParams.id} , function(data) {	
                   scope.states = data;
                   scope.url = mifosX.models.url;
                   scope.mail = mifosX.models.mail;
                 });
               };
               
           scope.routeToEmail = function (statementId) {
                   resourceFactory.statementEmailResource.update({statementId: statementId} , function(data) {	
                         
                        });
                      };     
               
               scope.getClientAssociation = function () {
                   resourceFactory.associationResource.get({clientId: routeParams.id} , function(data) {	
                          scope.associations = data;
                         
                        });
                      };        
               

         scope.downloadFile = function (statementId){
        	 
        	 /*http({
                 method:'PUT',
                 url: $rootScope.hostUrl+ API_VERSION +'/billmaster/'+statementId+'/print?tenantIdentifier=default',
                 data: {}
               })*/
              
              window.open($rootScope.hostUrl+ API_VERSION +'/billmaster/'+statementId+'/print?tenantIdentifier=default');
         };
         
         scope.cancelScheduleOrder =function(id){
        	 resourceFactory.OrderSchedulingResource.delete({'clientId':id},{},function(data){
        		// location.path('/viewclient/' + routeParams.id);
        		 route.reload();
     	    	
             });
         }
       
         scope.getAllTickets=function(){      
               resourceFactory.ticketResource.getAll({clientId: routeParams.id},function(data) {	        
   	            scope.tickets = data;
   	            scope.clientId= routeParams.id;	  
   	        });
         };
	
	scope.financialsummeryTab = function(){
        	 scope.financialsummaryC="active";
        	 scope.invoicesC="";
        	 scope.paymentsC="";
        	 scope.adjustmentsC="";
        	 scope.financialtransactions = paginatorService.paginate(scope.getFinancialTransactionsFetchFunction, 14);
         }
         scope.invoicesTab = function(){
        	 scope.financialsummaryC="";
        	 scope.paymentsC="";
        	 scope.invoicesC="active";
        	 scope.adjustmentsC="";
        	 scope.financialInvoices = paginatorService.paginate(scope.getInvoice, 14);
         }
         scope.paymentsTab = function(){
        	 scope.financialsummaryC="";
        	 scope.invoicesC="";
        	 scope.paymentsC="active";
        	 scope.adjustmentsC="";
        	 scope.financialPayments = paginatorService.paginate(scope.getPayments, 14);
         }
         scope.adjustmentsTab = function(){
        	 scope.financialsummaryC="";
        	 scope.invoicesC="";
        	 scope.paymentsC="";
        	 scope.adjustmentsC="active";
        	 scope.financialAdjustments = paginatorService.paginate(scope.getAdjustments, 14);
         }
         scope.eventsaleTab = function(){
        	 scope.eventsaleC="active";
        	 scope.mydeviceC="";
         }
         scope.eventorderCTab = function(){
        	 scope.eventsaleC="";
        	 scope.mydeviceC="active";
         }
               scope.getOneTimeSale = function () {
            	   scope.eventsaleC="active";
            	   scope.mydeviceC="";
            	   if(scope.displayTab == "eventOrders"){
            		   scope.eventsaleC="";
                	   scope.mydeviceC="active";
            	   }
                   resourceFactory.oneTimeSaleResource.getOneTimeSale({clientId: routeParams.id} , function(data) {
                     scope.onetimesales = data.oneTimeSaleData;
                     scope.eventOrders = data.eventOrdersData;
                   });
                 };
                 
                 scope.getEventSale = function () {
              	  
                     resourceFactory.eventOrderPriceUpdateTemplateResource.get({clientId: routeParams.id} , function(data) {
                       scope.eventOrders = data;
                     });
                   };       
                 
                 
        scope.dataTableChange = function(clientdatatable) {
          resourceFactory.DataTablesResource.getTableDetails({datatablename: clientdatatable.registeredTableName,
          entityId: routeParams.id, genericResultSet: 'true'} , function(data) {
            scope.datatabledetails = data;
            scope.datatabledetails.isData = data.data.length > 0 ? true : false;
            scope.datatabledetails.isMultirow = data.columnHeaders[0].columnName == "id" ? true : false;
            scope.showDataTableAddButton=false;
            scope.showDataTableEditButton=false;
            scope.showDataTableAddButton = (!scope.datatabledetails.isData || scope.datatabledetails.isMultirow);
            scope.showDataTableEditButton = (scope.datatabledetails.isData && !scope.datatabledetails.isMultirow);
            scope.singleRow = [];
            for(var i in data.columnHeaders) {
              if (scope.datatabledetails.columnHeaders[i].columnCode) {
                for (var j in scope.datatabledetails.columnHeaders[i].columnValues){
                  for(var k in data.data) {
                    if (data.data[k].row[i] == scope.datatabledetails.columnHeaders[i].columnValues[j].id) {
                       data.data[k].row[i] = scope.datatabledetails.columnHeaders[i].columnValues[j].value;
                    }
                  }
                }
              }
            }
            if (scope.datatabledetails.isData) {
                for (var i in data.columnHeaders) {
                    if (!scope.datatabledetails.isMultirow) {
                        var row = {};
                        row.key = data.columnHeaders[i].columnName;
                        row.value = data.data[0].row[i];
                        scope.singleRow.push(row);
                    }
                }
            }

          });
        };
        scope.viewDataTable = function (registeredTableName, data) {
        	
            if (scope.datatabledetails.isMultirow) {
                location.path("/viewdatatableentry/" + registeredTableName + "/" + scope.client.id + "/" + data.row[0]);
            } else {
                location.path("/viewsingledatatableentry/" + registeredTableName + "/" + scope.client.id);
            }
        };
        
        scope.deleteAll = function (apptableName, entityId) {
          resourceFactory.DataTablesResource.delete({datatablename:apptableName, entityId:entityId, genericResultSet:'true'}, {}, function(data){
            route.reload();
          });
        };
        /*scope.getClientDocuments = function () {
        	
        	if(PermissionService.showMenu('READ_DOCUMENT')){
        		resourceFactory.clientDocumentsResource.getAllClientDocuments({clientId: routeParams.id} , function(data) {
        				scope.clientdocuments = data;
        		});
        	}    
          
          resourceFactory.creditCardSaveResource.get({clientId: routeParams.id} , function(data1) {

              var key  = mifosX.models.encrptionKey;
              scope.clientcarddetails = data1;
              for ( var i in scope.clientcarddetails) {	

                  if(scope.clientcarddetails[i].type=='CreditCard'){
                	  
				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardNumber, key);
				         var cardNum = decrypted1.toString(CryptoJS.enc.Utf8);
				          var stars = "";
				         for (var j in cardNum){
				        	 if(j>=0&&j<(cardNum.length)-4){
				        		 stars += "*";
				        	 };
				         }
				         cardNum = stars+cardNum.substr(cardNum.length-4,cardNum.length-1);
				         scope.clientcarddetails[i].cardNumber = cardNum;
				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].cardExpiryDate,  key);
				        scope.clientcarddetails[i].cardExpiryDate = decrypted2.toString(CryptoJS.enc.Utf8);
				        
                  }else if(scope.clientcarddetails[i].type=='ACH'){
              	        
				        var decrypted1 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].routingNumber,  key);
				        var routingNumber = decrypted1.toString(CryptoJS.enc.Utf8);
				          var stars = "";
				         for (var j in routingNumber){
				        	 if(j>=0&&j<(routingNumber.length)-4){
				        		 stars += "*";
				        	 };
				         }
				         routingNumber = stars+routingNumber.substr(routingNumber.length-4,routingNumber.length-1);
				         scope.clientcarddetails[i].routingNumber = routingNumber;

				        var decrypted2 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankAccountNumber,  key);
				        var bankAccountNumber = decrypted2.toString(CryptoJS.enc.Utf8);
				          var stars = "";
				         for (var j in bankAccountNumber){
				        	 if(j>=0&&j<(bankAccountNumber.length)-4){
				        		 stars += "*";
				        	 };
				         }
				         bankAccountNumber = stars+bankAccountNumber.substr(bankAccountNumber.length-4,bankAccountNumber.length-1);
				         scope.clientcarddetails[i].bankAccountNumber = bankAccountNumber;
				         
				         var decrypted3 = CryptoJS.AES.decrypt(scope.clientcarddetails[i].bankName,  key);
					        scope.clientcarddetails[i].bankName = decrypted3.toString(CryptoJS.enc.Utf8);

                  }
              }
            });

        };*/

        scope.deleteDocument = function (documentId, index) {
          resourceFactory.clientDocumentsResource.delete({clientId: routeParams.id, documentId: documentId}, '', function(data) {
            scope.clientdocuments.splice(index,1);
          });
        };

        scope.downloadDocument = function(documentId,index) {
        	window.open($rootScope.hostUrl+ API_VERSION +'/clients/'+routeParams.id+'/documents/'+documentId+'?tenantIdentifier=default');
            /*resourceFactory.clientDocumentsResource.get({clientId: routeParams.id, documentId: documentId}, '', function(data) {
                scope.clientdocuments.splice(index,1);
            });*/
        };
        scope.isNotClosed = function(loanaccount) {
          if(loanaccount.status.code === "loanStatusType.closed.written.off" || 
            loanaccount.status.code === "loanStatusType.rejected") {
            return false;
          } else{
             return true;
          }
        };

        scope.isClosed = function(loanaccount) {
          if(loanaccount.status.code === "loanStatusType.closed.written.off" || 
            loanaccount.status.code === "loanStatusType.rejected") {
            return true;
          } else{
             return false;
          }
        };
        
        scope.getAllOwnHardware = function () {
        	scope.eventsaleC="";
       	 scope.mydeviceC="active";
            resourceFactory.HardwareResource.getAllOwnHardware({clientId: routeParams.id} , function(data) {
              scope.ownhardwares = data;
            });
           
        };
        
        scope.cancelSale = function(otsId,index){
        	resourceFactory.deleteOneTimeSaleResource.update({saleId: otsId} , function(data) {
        		console.log(index)
        		scope.onetimesales.splice(index, 1);
        		getDetails();
            },function(errorData){
            	
            });
        };
        scope.unallocateDevice = function(otsId,serialNo){
        	this.formData.clientId=routeParams.id;
        	this.formData.serialNo=serialNo;
        	resourceFactory.unallocateDeviceResource.update({allocationId: otsId} ,this.formData,function(data) {
        		route.reload();
            },function(errorData){
            	
            });
        }; 
       /*scope.getAllFineTransactions = function () {
              resourceFactory.FineTransactionResource.getAllFineTransactions({clientId: routeParams.id} , function(data) {
                scope.financialtransactions = data;
                
                
             });

            };*/

          scope.getFinancialTransactionsFetchFunction = function(offset, limit, callback) {
  			resourceFactory.FineTransactionResource.getAllFineTransactions({clientId: routeParams.id ,offset: offset, limit: limit} , callback);
  			};
	
  			scope.getInvoice = function(offset, limit, callback,invoice) {
  	  			resourceFactory.Filetrans.get({clientId: routeParams.id ,offset: offset, limit: limit,type:scope.invoice} , callback);
  	  		};
  			
  	  		scope.getPayments = function(offset, limit, callback,payment) {
	  			resourceFactory.Filetrans.get({clientId: routeParams.id ,offset: offset, limit: limit,type:scope.payment} , callback);
	  		};
	  		
	  		scope.getAdjustments = function(offset, limit, callback,adjustment) {
  	  			resourceFactory.Filetrans.get({clientId: routeParams.id ,offset: offset, limit: limit,type:scope.adjustment} , callback);
  	  		};
          scope.getAllFineTransactions = function () {
		  scope.financialsummaryC="active";
       	   	  scope.invoicesC="";
       	   	  scope.paymentsC="";
       	   	  scope.adjustmentsC="";
          	scope.financialtransactions = paginatorService.paginate(scope.getFinancialTransactionsFetchFunction, 14);
          };
          
          scope.sendIp = function (id){    	                   
              resourceFactory.ipStatusResource.update({id: id} , {} , function(data) {
            	scope.ipstatus=data.resourceIdentifier;
            	  console.log(data);
            	 scope.ipId=id;
              },function(errorData){
              	
              });
                   
      }; 
          scope.searchFinancialTransactions123 = function(offset, limit, callback) {
	    	  resourceFactory.FineTransactionResource.getAllFineTransactions({ clientId: routeParams.id ,
	    		  offset: offset, limit: limit ,sqlSearch: scope.filterText } , callback); 
	          };
	  		
	  		scope.searchFinancialTransactions = function(filterText) {
	  			scope.financialtransactions = paginatorService.paginate(scope.searchFinancialTransactions123, 14);
	  		};  
          


        scope.saveNote = function() {   
            resourceFactory.clientResource.save({clientId: routeParams.id, anotherresource: 'notes'}, this.formData , function(data){
            var today = new Date();
            temp = { id: data.resourceId , note : scope.formData.note , createdByUsername : "test" , createdOn : today } ;
            scope.clientNotes.push(temp);
            scope.formData.note = "";
            scope.predicate = '-id';
          });
        }

        scope.deleteClientIdentifierDocument = function (clientId, entityId, index){
          resourceFactory.clientIdenfierResource.delete({clientId: clientId, id: entityId}, '', function(data) {
            scope.identitydocuments.splice(index,1);
          });
        };

        scope.downloadClientIdentifierDocument=function (identifierId, documentId){
          console.log(identifierId,documentId);
        };
        
       /* scope.getparent = function(query){
        	if(query.length>0){
        		resourceFactory.clientParentResource.get({query: query}, function(data) { 	        	
     	            scope.parentClients = data;
     	        }); 
        	}else{
            	
        	}
        };*/
       scope.$watch('parentClient', function() {
        	if(scope.parentClient){
        		$('.btn-disabled').prop('disabled', false);
        	}
        	else{
        		$('.btn-disabled').prop('disabled', true);
        	}
         });
        scope.getparent = function(query){
        		
        	return http.get($rootScope.hostUrl+ '/obsplatform/api/v1/parentclient/', {
        	      params: {
        	    	  query: query
        	      }
        	    }).then(function(res){
        	     parentClients = [];
        	      for(var i in res.data){
        	    	  parentClients.push(res.data[i]);
        	    	  if(i == 7)
        	    		  break;
        	      }
        	      return  parentClients;
        	    });
        	
          };
        scope.saveParent = function(displayLabel){
        	
        var firstSplit=displayLabel.split('[');
        var displayName=firstSplit[0];
        var array=firstSplit[1].split(']');
        var accountNo=array[0];
        var obj = {"accountNo":accountNo,"displayName":displayName};
        resourceFactory.clientParentResource.update({clientId:routeParams.id}, obj,function(data) { 	
        	location.path('/viewclient/' +routeParams.id);
        	route.reload();
        	});
      //  webStorage.add("callingTab", {someString: "moreInfo" });
        };
     scope.routeToParentClientOrChildClient = function(id){
    	 webStorage.add("callingTab", {someString: "identities" });
    	 webStorage.add("callingTab", {someString: "ChildDetailsTab" });
    	 location.path('/viewclient/'+id);
     };
        
        
        
		// *********************** InVenture controller ***********************
        scope.fetchInventureScore = function(){
          // dummy data for the graph - DEBUG purpose
          var inventureScore = getRandomInt(450,800);
          var natAverage = getRandomInt(450,800);
          var industryAverage = getRandomInt(450,800);
          var inventureMinScore = 300;
          var inventureMaxScore = 850;

          // dummy data for inventure loan recommendation - DEBUG purpose
          scope.inventureAgricultureLimit = '21,000';
          scope.inventureFishermenLimit = '27,500';
          scope.inventureHousingLimit = '385,000';
          scope.inventureBusinessLimit = '10,000';

          // this part is used to generate data to see the look of the graph
          function getRandomInt (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }

          // CHART1 - comparison chart control
          var comparisonData = [
            {
              key: "Score Comparison",
                values: [
                  { 
                    "label" : "National Average",
                    "value" : (natAverage)
                  }, 
                  { 
                    "label" : "Agriculture Average", 
                    "value" : (industryAverage)
                  }, 
                  { 
                    "label" : "This Client", 
                    "value" : (inventureScore)
                  }
                ]
              }
            ];

          // add the comparison chart to the viewclient.html
          nv.addGraph(function() {
            var comparisonChart = nv.models.discreteBarChart()
              .x(function(d) { return d.label })
              .y(function(d) { return d.value })
              .staggerLabels(true)
              .tooltips(true)
              .showValues(true);
                
            // set all display value to integer
            comparisonChart.yAxis.tickFormat(d3.format('d'));
            comparisonChart.valueFormat(d3.format('d'));
            comparisonChart.forceY([inventureMinScore, inventureMaxScore]);

            d3.select('#inventureBarChart svg')
              .datum(comparisonData)
              .transition().duration(1500)
              .call(comparisonChart);

            nv.utils.windowResize(comparisonChart.update);
            return comparisonChart;
          });

          // CHART2 - inventure score bullet chart control
          nv.addGraph(function() {  
            var bullet = nv.models.bulletChart()
              .tooltips(false);

            d3.select('#inventureBulletChart svg')
              .datum(scoreData())
              .transition().duration(1500)
              .call(bullet);

            nv.utils.windowResize(bullet.update);
            return bullet;
          });

   
          function scoreData() {
            return {
              "title": "",
              "ranges": [(inventureMinScore - 300), (inventureMaxScore - 300)],
              "measures": [(inventureScore - 300)],
              "markers": [(inventureScore - 300)]};	
          }

          // this will be used to display the score on the viewclient.html
          scope.inventureScore = inventureScore;
        };
 
       
        scope.approveUnallocate = function (ipAddress){
        	scope.ipAddr = ipAddress;
        	scope.errorStatus=[];scope.errorDetails=[];
          	 $modal.open({
                   templateUrl: 'ApproveUnallocate.html',
                   controller: ApproveUnallocate,
                   resolve:{}
               });
            };
 
var ApproveUnallocate = function ($scope, $modalInstance) {
        		
                $scope.approveUnallocate = function () {

                	$scope.flagapproveTerminate=true;
                	if(this.formData == undefined || this.formData == null){
                		this.formData = {"ipAddress":scope.ipAddr,"status":'F'};
                	}
                	resourceFactory.ipPoolingIpStatusResource.update({} ,this.formData, function(data) {              	
                		location.path('/viewclient/'+routeParams.id);  
                        $modalInstance.close('delete');
                    },function(errData){
    	        		$scope.flagApproveReconnect = false;
    		          });
                	
                };
                $scope.cancelReconnect = function () {
                    $modalInstance.dismiss('cancel');
                };
            };
           
         var DownloadCSVFinancialDataController = function($scope,$modalInstance){
				
				var date = new Date(), y = date.getFullYear(), m = date.getMonth();
				$scope.formData = {};
				$scope.formData.downloadType ='csv';
				$scope.start = {};
				$scope.start.date = new Date(y, m, 1);
				$scope.to = {};
				$scope.to.date = new Date();
				
				$scope.accept = function(){
					var fromDate = new Date($scope.start.date).getTime();
					var toDate = new Date($scope.to.date).getTime();
					var downloadType = $scope.formData.downloadType;
					window.open($rootScope.hostUrl+ API_VERSION +'/financialTransactions/download/'+routeParams.id+'?downloadType='+downloadType+'&fromDate='+fromDate+'&toDate='+toDate+'&tenantIdentifier=default');
					$modalInstance.close('delete');

				};
				
				$scope.reject = function(){
					$modalInstance.dismiss('cancel');
				};
				
				
			};
            
            //export financial csv 
            scope.exportFinancialCSV = function(){
            	
            	$modal.open({
                    templateUrl: 'downloadCSVFinancialData.html',
                    controller: DownloadCSVFinancialDataController,
                    resolve:{}
                });
            };
        
    }
  });
  
  
  mifosX.ng.application.controller('ViewClientController', ['$scope','webStorage', '$routeParams', '$route', '$location', 'ResourceFactory', 'PaginatorService','$http','$modal','dateFilter','API_VERSION','$rootScope','PermissionService', mifosX.controllers.ViewClientController]).run(function($log) {
    $log.info("ViewClientController initialized");
  });
}(mifosX.controllers || {}));
