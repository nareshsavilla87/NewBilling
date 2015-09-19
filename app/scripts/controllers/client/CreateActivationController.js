(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateActivationController: function(scope,webStorage,routeParams, resourceFactory, location, http,filter,PermissionService, dateFilter,$rootScope,API_VERSION,$modal) {
		
		  scope.ActivationData = {};
		  scope.ActivationData.client = [];
		  scope.ActivationData.sale = [];
		  scope.ActivationData.allocate = [];
		  scope.ActivationData.bookorder = [];
		  scope.ActivationData.owndevice = [];
		  scope.data={};
		  //var config = filter('ConfigLookup')('deviceAgrementType');
		 
		  scope.configPayment = webStorage.get("client_configuration").payment;
		  scope.PermissionService = PermissionService;
		  scope.propertyMaster = webStorage.get("is-propertycode-enabled");
		 
		  
//create client controller
          scope.offices = [];
          scope.first = {};
          scope.allocation={};
          /*scope.first.date = new Date();
          scope.allocation.date=new Date();*/
          scope.formData1 = {};
          scope.formData={};
          scope.clientCategoryDatas=[];
          scope.configurationProperty=[];
          
          resourceFactory.clientTemplateResource.get(function(data) {
        	  scope.first.date = new Date(data.date);
              scope.allocation.date=new Date(data.date);
              
              scope.offices = data.officeOptions;
              scope.formData1.officeId = scope.offices[0].id;
              scope.clientCategoryDatas=data.clientCategoryDatas;
              scope.formData1.clientCategory=scope.clientCategoryDatas[0].id;
              scope.cities=data.addressTemplateData.cityData;
              scope.configurationProperty=data.loginConfigurationProperty.enabled;
          });
          
          scope.formName=function(name){
	    	  
              
              var mesage_array = new Array();
              mesage_array = (name.split(" "));
           
           scope.formData1.firstname=mesage_array[0];
           scope.formData1.lastname=mesage_array[1];
           if(scope.formData1.lastname == null){
        	   scope.formData1.lastname="Mr.";
           }
        	  
          };
         
          scope.getStateAndCountry=function(city){
        	 
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData1.state = data.state;
            		scope.formData1.country = data.country;
        	  });
          };
          
          
          scope.property = {}; 
          scope.getExistsProperty = function(query){
        	  scope.invalidBuildingCode = true;
	           	return http.get($rootScope.hostUrl+API_VERSION+'/property/propertycode/', {
	           	      params: {
	           	    	  		query: query
	           	      		   }
	           	    }).then(function(res){   
	           	    	 scope.propertyCodesData=res.data;
	           	      return scope.propertyCodesData;
	           	    });
	             };  
	             
	   scope.getPropertyDetails = function(existsProperty){   
	            if(!angular.isUndefined(existsProperty)){
	                 for(var j in scope.propertyCodesData)  {
	            			 if(existsProperty == scope.propertyCodesData[j].propertyCode){
	            				 scope.invalidBuildingCode = false;
	            				 scope.formData1.addressNo = scope.propertyCodesData[j].propertyCode;
	            				 if(scope.propertyCodesData[j].street.length > 0){
	            					
	            					 scope.formData1.street = scope.propertyCodesData[j].street;
	            				 }
	            				 scope.formData1.city  =  scope.propertyCodesData[j].precinct; 
	            				 scope.formData1.state =  scope.propertyCodesData[j].state;
	            				 scope.formData1.country = scope.propertyCodesData[j].country;
	            				 if(scope.propertyCodesData[j].poBox.length > 0){
	            					
	            					 scope.formData1.zipCode = scope.propertyCodesData[j].poBox;
	            				 }
	            				 scope.status=scope.propertyCodesData[j].status;
	            				 scope.propetyId=scope.propertyCodesData[j].id;
	            				 break;
	            			 }
	            		 }
	            	   }else{
	            		 delete scope.formData1.street;
	            		 delete scope.formData1.city;
	            		 delete scope.formData1.state;
	            		 delete scope.formData1.country;
	            		 delete scope.formData1.zipCode;
	            	   }
	             };        
	             
	           //property code starting point
	  	       scope.invalidBuildingCode = false;
	  	        var createClientFormVal = false;
	  	        
	  	        scope.$watch(function(){
	  	        	return scope.invalidBuildingCode;
	  	        },function(){
	  	        	if(scope.invalidBuildingCode){
	  	        		scope.createclientform.$valid ?
	  	        				(createClientFormVal = scope.createclientform.$valid,scope.createclientform.$valid = !createClientFormVal) :
	  	        					scope.createclientform.$valid = false;
	  	        	}else{
	  	        		if(scope.createclientform.$valid) scope.createclientform.$valid = true;
	  	        		else {
	  	        			if(createClientFormVal) scope.createclientform.$valid = true;
	  	        			else scope.createclientform.$valid = false;
	  	        		}
	  	        	}
	  	        });
	  	      
	  	       //property code pop up start
	  	       
	  	       scope.generatePropertyPopup = function (){
	  		    	 $modal.open({
	  		    		 templateUrl: 'generateProperty.html',
	  		  	         controller: generatePropertyController,
	  		  	         resolve:{}
	  		  	     });
	  		     };
	  		     
	  		   //starting of property controller     
	  		   function  generatePropertyController($scope, $modalInstance) {
	  		    	 $scope.propertyTypes = [];
	  		    	 $scope.precinctData = [];
	  		    	 $scope.formData = {};
	  				  resourceFactory.propertyCodeTemplateResource.get(function(data) {
	  					  $scope.propertyTypes = data.propertyTypes;
	  					  if(Object.keys(scope.property).length >0){
	  				    		 $scope.formData.propertyCode=scope.property.propertyCode;
	  				    		 $scope.formData.street=scope.property.street;
	  				    		 $scope.formData.state=scope.property.state;
	  				    		 $scope.formData.country=scope.property.country;
	  				    		 $scope.formData.poBox=scope.property.poBox;
	  				    		 $scope.formData.propertyType=scope.property.propertyType;

	  				    		 $scope.formData.precinct=scope.property.precinctCode;
	  				    		 $scope.parcel=scope.property.parcel;
	  				    		 $scope.floor=scope.property.floor;
	  				    		 $scope.buildingCode = scope.property.buildingCode;
	  				    		 $scope.unitCode = scope.property.unitCode;
	  				    		 
	  				    	 }
	  					});
	  				  
	  				  //precinct auto complete 
	  					$scope.getPrecinct = function(query){
	  						return http.get($rootScope.hostUrl+API_VERSION+'/address/city/', {
	  			        	      params: {
	  			        	    	  		query: query
	  			        	      		   }
	  			        	    }).then(function(res){   
	  			        	    	 $scope.precinctData=res.data;	
	  			        	      return $scope.precinctData;
	  			        	    });
	  		             };   
	  					
	  					$scope.getPrecinctDetails = function(precinct){
	  						if(precinct!=undefined){
	  						    for(var i in $scope.precinctData){
	  						    	if(precinct==$scope.precinctData[i].cityCode){
	  						    		scope.property.precinctCode = $scope.precinctData[i].cityCode.substr(0,2);
	  						    		scope.property.precinct = $scope.precinctData[i].cityName;
	  					          		$scope.formData.state =  $scope.precinctData[i].state;
	  					          		$scope.formData.country = $scope.precinctData[i].country;
	  					          		$scope.getWatch(scope.property.precinctCode);
	  					          		break;
	  					          }else{
	  					        	  
	  									delete $scope.formData.state;
	  						    		delete $scope.formData.country;
	  								}
	  							}
	  						  }else{
	  							    
	  								delete $scope.formData.state;
	  					    		delete $scope.formData.country; 
	  						  }
	  					};
	  					
	  					
	  					$scope.getParcel = function(queryParam){
	  						return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
	  			        	      params: {
	  			        	    	  		query: 'parcel',
	  			        	    	  		queryParam:queryParam		
	  			        	      		   }
	  			        	    }).then(function(res){   
	  			        	    	 scope.parcelData=res.data;	
	  			        	      return scope.parcelData;
	  			        	    });
	  		             };   
	  		             $scope.getParcelDetails = function(parcel){
	  		            	 if(parcel !=undefined){
	  		                 for(var i in scope.parcelData){
	  		                	 if(parcel== scope.parcelData[i].code){
	  						    		scope.property.parcel = scope.parcelData[i].code.substr(0,2);
	  						    		$scope.formData.street = scope.parcelData[i].referenceValue;
	  						    		$scope.getWatch(scope.property.parcel);
	  					          		break;
	  					          }	 
	  		                    }
	  		                }
	  		             };
	  		             
	  		             $scope.getBuild = function(queryParam){
	  							return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
	  				        	      params: {
	  				        	    	  		query: 'Building Codes',
	  				        	    	  		queryParam:queryParam				
	  				        	      		   }
	  				        	    }).then(function(res){   
	  				        	    	 scope.buildingData=res.data;	
	  				        	      return scope.buildingData;
	  				        	    });
	  			             };   
	  			         $scope.getbuildCode = function(building){
	  			            	 if(!angular.isUndefined(building)){
	  			            		  for(var i in scope.buildingData){
	  				                    	 if(building==scope.buildingData[i].code ){
	  				                    		 scope.property.buildingCode = scope.buildingData[i].code.substr(0,3);
	  				                    		 $scope.getWatch(scope.property.buildingCode);
	  								    		break;
	  							            }	 
	  				                     }
	  						          }	 
	  			             };  
	  		             
	  					
	  					$scope.getFloor = function(queryParam){
	  						return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
	  			        	      params: {
	  			        	    	  		query: 'Level/Floor',
	  			        	    	  		queryParam:queryParam	
	  			        	      		   }
	  			        	    }).then(function(res){   
	  			        	    	 scope.floorData=res.data;	
	  			        	      return scope.floorData;
	  			        	    });
	  		             };   
	  		             
	  		             $scope.getFloorDetails = function(floor){
	  		            	 if(floor!=undefined){
	  		            		 for( var i in scope.floorData){
	  		            			 if(floor==scope.floorData[i].code){
	  							    		scope.property.floor = scope.floorData[i].code.substr(0,2);
	  							    		$scope.getWatch(scope.property.floor);
	  						          		break;
	  						          }	 
	  			                 }
	  		            	 }	       	        
	  		          };
	  		          
	  		          
	  		          $scope.getUnit = function(queryParam){
	  						return http.get($rootScope.hostUrl+API_VERSION+'/propertymaster/type/', {
	  			        	      params: {
	  			        	    	  		query: 'Unit Codes',
	  			        	    	  		queryParam:queryParam		
	  			        	      		   }
	  			        	    }).then(function(res){   
	  			        	    	 scope.unitData=res.data;	
	  			        	      return scope.unitData;
	  			        	    });
	  		             };   
	  		             $scope.getunitCode = function(unit){
	  		            	 if(!angular.isUndefined(unit)){
	  		                	 scope.property.unitCode=unit.substr(0,4);
	  		                	if(angular.isUndefined($scope.formData.propertyCode)){
	  		                	      $scope.getPropertyCode(scope.property.unitCode);
	  		                	}else{
	  		                		$scope.getWatch(scope.property.unitCode);
	  		                	   }					 
	  					      }	 
	  		             };
	  		          
	  		  		$scope.getPropertyCode=function(unitCode){
	  					if(scope.property.precinctCode !=undefined&&scope.property.parcel!=undefined&&scope.property.buildingCode!=undefined &&scope.property.floor!=undefined){
	  				    $scope.formData.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,unitCode);
	  				    scope.property.propertyCode=$scope.formData.propertyCode;
	  				    $scope.getProperty($scope.formData.propertyCode);
	  					}
	  				}; 
	  				
	  				$scope.getWatch=function(labelValue){
	  					if(!angular.isUndefined(labelValue)&&!angular.isUndefined(scope.property.propertyCode)){
	  						$scope.formData.propertyCode=scope.property.precinctCode.concat(scope.property.parcel,scope.property.buildingCode,scope.property.floor,scope.property.unitCode);
	  					   $scope.getProperty($scope.formData.propertyCode);
	  					}			
	  						
	  				};
	  				
	  		    	 $scope.accept = function () {
	  		    		 scope.property.propertyType=$scope.formData.propertyType;
	  		    		 scope.property.propertyCode=$scope.formData.propertyCode;
	  		    		 scope.property.street=$scope.formData.street;
	  		    		 scope.property.state=$scope.formData.state;
	  		    		 scope.property.country=$scope.formData.country;
	  		    		 scope.property.poBox=$scope.formData.poBox;
	  		    		 
	  		    		 scope.formData1.addressNo = $scope.formData.propertyCode;
	  	    			 scope.formData1.street = $scope.formData.street;
	  	    			 scope.formData1.city  =   scope.property.precinct; 
	  	    			 scope.formData1.state =  $scope.formData.state;
	  	    			 scope.formData1.country = $scope.formData.country;
	  	    			 if(angular.isDefined($scope.formData.poBox) && $scope.formData.poBox.length > 0){
        					
	       					 scope.formData1.zipCode = $scope.formData.poBox;
	       				 }
	  	    			 scope.invalidBuildingCode = false;
	  	    			 $modalInstance.dismiss('delete');
	  	    			 if(!angular.isUndefined(scope.formData1.addressNo)){
	  	    				 $('#propertyCode').attr("disabled","disabled");
	  	    				 
	  	    			 }
	  		      	 };
	  		         $scope.cancel = function () {
	  		        	 $modalInstance.dismiss('cancel');
	  		         };
	  		         
	  		   	    $scope.getProperty = function(query){
	  		           	return http.get($rootScope.hostUrl+API_VERSION+'/property', {
	  		           	      params: {
	  		           	    	      sqlSearch: query,
	  		           	    	         limit : 15,
	  		           	    	         offset:0
	  		           	      		   }
	  		           	    }).then(function(res){   
	  		           	    	 $scope.propertyCodesData=res.data.pageItems;
	  		           	    	if($scope.propertyCodesData.length>0){
	  		         	    		 $scope.unitStatus=$scope.propertyCodesData[0].status;
	  		         	             scope.propetyId=$scope.propertyCodesData[0].id;
	  		         	    		if($scope.unitStatus == 'OCCUPIED'){
	  		         	    		     $scope.errorData= [];
	  		       	                     $scope.errorData.push({code:'error.msg.property.code.already.allocated'});
	  		       	                    $("#generateProperty").addClass("validationerror");
	  		         	    	}
	  		       		    }else{
	  		       		    	
	  		       		    	delete $scope.errorData;
	  	     	    	    	scope.propetyId=undefined;
	  	     	    		   $("#generateProperty").removeClass("validationerror");
	  		       		        } 
	  		           	      return scope.propertyCodesData;
	  		           	 });
	  		         };
	  		         
	  		     }//end of propertyController  
	             
//addonetimsale controller
      	
			  scope.formData2 = {};
	          //scope.maxDate = new Date();
	          
	          var config = webStorage.get("client_configuration").deviceAgrementType;
			  scope.config=config;
			  
	          if(config == "SALE"){
	        	  if(PermissionService.showMenu('CREATE_NEWSALE')){ 
	        		  scope.formData2.saleType='NEWSALE';
	    		  }else if(PermissionService.showMenu('CREATE_SECONDSALE')){
	    			  scope.formData2.saleType='SECONDSALE';
	              }
	        	  
	        	  scope.clientId=routeParams.id;
		           resourceFactory.oneTimeSaleTemplateResource.getOnetimes({clientId: scope.clientId}, function(data) {
		        	   scope.itemDatas = data.itemDatas;
		            	scope.discountMasterDatas = data.discountMasterDatas;
			            scope.officesDatas=data.officesData;
			            	
			            for(var i=0;i<scope.officesDatas.length;i++){
			            	if(scope.officesDatas[i].id==1){
			            		scope.formData2.officeId=scope.officesDatas[i].id;
			            	}
			            }
	                    scope.onetimesales=data;
		            scope.date= {};
		            scope.date.saleDate = new Date(data.date);
		            scope.maxDate = new Date(data.date);
		            
		        });
	        
	          }else{
	        	  scope.itemtypes=[];
	              resourceFactory.itemResourceTemplate.getAll(function(data){
	            	  scope.itemtypes=data.itemDatas;
	              });	  
	          }
	       
	        scope.itemData=function(itemId,officeId){
	        	
	        	  scope.saleType=scope.formData2.saleType;
	        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId,region:scope.formData1.state}, function(data) {
	        	
	        		scope.formData2=data;
	        		scope.formData2.itemId=itemId;
	        		scope.formData2.officeId=officeId;
	        		scope.formData2.discountId = scope.discountMasterDatas[0].id;
	        		scope.formData2.saleType=scope.saleType;
	        		scope.data.unitPrice=scope.formData2.unitPrice;
	        		scope.data.locale=$rootScope.locale.code;
	        		scope.data.quantity=1;
	        		scope.data.units=scope.formData2.units;
	        		scope.formData2.quantity=1;
	        		scope.formData2.totalPrice=scope.formData2.unitPrice;
	        		scope.formData2.itemId=itemId;
	        		scope.formData2.discountId = scope.discountMasterDatas[0].id;
	        		
	        	/*	resourceFactory.oneTimeSaleQuantityResource.get({quantity:1,itemId:itemId},scope.data, function(data) {
		        		
	        			scope.formData2.quantity=1;
		        		scope.formData2.totalPrice=data.totalPrice;
		        		scope.formData2.itemId=itemId;
		        		scope.formData2.discountId = scope.discountMasterDatas[0].id;
		        		
			        });	*/
	        		
	        		
		        });	
	        };
	        scope.itemDataQuantity=function(quantity,itemId){
	        	
	        	this.data.unitPrice=this.formData2.unitPrice;
	        	this.data.locale=$rootScope.locale.code;
	        	this.data.quantity=1;
	        	
	        	resourceFactory.oneTimeSaleQuantityResource.get({quantity: quantity,itemId:itemId},this.data, function(data) {
	        		scope.formData2=data;
	        		scope.formData2.quantity=quantity;
	        		scope.formData2.itemId=itemId;
	        		scope.formData2.discountId = scope.discountMasterDatas[0].id;
	        		
		        });	
	        	 
	        	scope.formData3.quantity=this.data.quantity;
	        	
	        };
	       
	        scope.submit2 = function() {
	        };

//allocation  controller
	          scope.formData3 = {};
			  scope.clientId=routeParams.clientId;
	        scope.getData = function(query,officeId){
	        	if(query.length>0){
	        		resourceFactory.allocateHardwareDetails.getSerialNumbers({oneTimeSaleId:scope.formData2.itemId,officeId:officeId,query: query}, function(data) { 	        	
	     	            scope.itemDetails = data.serialNumbers;
	     	          
	     	        }); 
	        	}else{
	            	
	        	}
            };
            
            scope.getNumber= function(num) {
            	
            	if(num == undefined){
            		  return new Array(1);   
            	}
	             return new Array(parseInt(num));   
	         };
	        scope.submit3 = function() {
	        	
	        };
          
  //createorder controller
	        scope.plandatas = [];
	        scope.subscriptiondatas=[];
	        scope.paytermdatas=[];
	        scope.start = {};
	        //scope.start.date = new Date();
	        scope.sortingOrder = 'planCode';
	        scope.reverse = false;
	        scope.filteredItems = [];
	        scope.prepaidPalnfilteredItems = [];
	        scope.groupedItems = [];
	        scope.itemsPerPage =6;
	        scope.pagedItems = [];
	        scope.prepaidPlanspagedItems = [];
	        scope.currentPage = 0;
	        scope.items =[];
	        scope.formData4 =[];
	        scope.formData5 ={};
	        scope.formData6={};
	       
	        resourceFactory.orderTemplateResource.get({planId:'0'},function(data) {
	          scope.start.date = new Date(data.date);
	          
	          scope.plandatas = data.plandata;
	          scope.items = data.plandata;
	          scope.prepaidPlansitems = data.plandata;
	          scope.subscriptiondatas=data.subscriptiondata;
	          scope.paytermdatas=data.paytermdata;
	          scope.clientId = routeParams.id;
	      
	          scope.formData4 = {
	            		billAlign: false,
	            		
	                  };
	        });
	        
	        scope.setBillingFrequency = function(value) {
	        	scope.paytermdatas=undefined;
	        	 resourceFactory.orderResource.get({planId:value, template: 'true'} , function(data) {
	        		 
	        		 scope.paytermdatas=data.paytermdata;
	        		 scope.formData4.isPrepaid=data.isPrepaid;
	        		 scope.isPrepaidPlanFormData4=data.isPrepaid;
	        		 scope.formData4.planCode=value;
	        		 
	        		  for (var i in data.subscriptiondata) {
	                 	if(data.subscriptiondata[i].Contractdata == data.contractPeriod){
	                 		 scope.formData4.contractPeriod=data.subscriptiondata[i].id; 
	                 	}
	                   
	                  };
	             });
	       };
	        
	        scope.submit4 = function() {   
	        	scope.flag = true;
	        	this.formData4.locale = $rootScope.locale.code;
	        	this.formData4.isNewplan=true;
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData4.dateFormat = 'dd MMMM yyyy';
	            this.formData4.start_date = reqDate;
	            if(this.formData4.isPrepaid == 'Y'){
	            	  for (var i in scope.paytermdatas) {
	                     	if(scope.paytermdatas[i].duration == this.formData4.contractPeriod){
	                     		 this.formData4.paytermCode=scope.paytermdatas[i].paytermtype; 
	                     	}
	                  };
	                  for (var i in scope.subscriptiondatas) {
	                   	if(scope.subscriptiondatas[i].Contractdata == this.formData4.contractPeriod){
	                   		 this.formData4.contractPeriod=scope.subscriptiondatas[i].id;
	                   		
	                   	}
	                };    
	            //this.formData.paytermCode='Monthly';
	                this.formData4.billAlign=false;
	            }

	            delete this.formData4.planId;
	            delete this.formData4.id;
	            delete this.formData4.isPrepaid;
	           
	            	scope.ActivationData = {};
	      		  scope.ActivationData.client = [];
	      		  scope.ActivationData.sale = [];
	      		  scope.ActivationData.allocate = [];
	      		  scope.ActivationData.bookorder = [];
	      		scope.ActivationData.owndevice=[];
	                  var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
	                  scope.formData1.locale = $rootScope.locale.code;
	                  scope.formData1.active = true;
	                  scope.formData1.dateFormat = 'dd MMMM yyyy';
	                  scope.formData1.activationDate = reqDate;
	                  scope.formData1.entryType="IND";
                      if(!scope.propertyMaster){
                       scope.formData1.addressNo="Addr1";
	                  }
	                  scope.formData1.flag=scope.configurationProperty;
	                  delete scope.formData1.middlename;
	                  
	                if(config =='SALE'){  
	                	
	 	        	 this.formData2.locale = $rootScope.locale.code;
	 	             this.formData2.dateFormat = "dd MMMM yyyy";
	 	            this.formData2.quantity=1;
	 	            
	        		this.formData2.totalPrice=scope.formData2.totalPrice;
	 	             var actDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
	 	             this.formData2.saleDate=actDate;
	 	             delete this.formData2.discountMasterDatas;   
	 	             delete this.formData2.warranty;
	 	             delete this.formData2.itemDatas;
	 	             delete this.formData2.units;
	 	             delete this.formData2.itemCode;
	 	             delete this.formData2.id;
	               delete this.formData2.chargesData;
	               delete this.formData2.feeMasterData;
	               delete this.formData2.grnData;
	                }else if(config =='OWN'){
	                	
	                	  scope.formData5.locale = $rootScope.locale.code;
	  		            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
	  		            scope.formData5.dateFormat = 'dd MMMM yyyy';
	  		            scope.formData5.allocationDate = reqDate;
	  		            scope.formData5.status = "ACTIVE";
	  		          //scope.formData5.serialNumber=scope.formData5.provisioningSerialNumber;
	  		              if(scope.formData5.provisioningSerialNumber == undefined){ 
	  		            	scope.formData5.provisioningSerialNumber = scope.formData5.serialNumber;
	  		              }
	                }else{
	                	
	                }
	 	            
	                if(config =='SALE'){
	                	var temp1 = new Array();
	    	 	        
		 	        	$("input[name='serial']").each(function(){
		 	        		var temp = {};
		 	    			temp["serialNumber"] = $(this).val();
		 	    			temp["orderId"] = routeParams.id;
		 	    			temp["clientId"] = routeParams.clientId;
		 	    			temp["status"] = "allocated";
		 	    			temp["itemMasterId"] = scope.formData2.itemId;
		 	    			  
		 	    			temp["isNewHw"]="Y";
		 	    			temp1.push(temp);
		 	        	});
		 	        	this.formData2.serialNumber=temp1;
	                }
	 	        	
	 	            
	 	        	 scope.formData3.itemMasterId=scope.formData2.itemId;
	 	            

	 	            var clientId=null;
	 	            if(config =='OWN'){
	 	            	scope.ActivationData.owndevice.push(this.formData5);
	 	            }
		            scope.ActivationData.bookorder.push(this.formData4);
	 	            scope.ActivationData.allocate.push(this.formData3);
	 	            if(config =='SALE'){
	 	            	scope.ActivationData.sale.push(this.formData2);
	 	            }
	 	            scope.ActivationData.client.push(scope.formData1);
	 	            
	 	            delete this.formData3.serialNumbers;
	 	            delete this.formData2.pageItems;
	 	            delete this.formData2.totalFilteredRecords;

	 	           
	 	    
	           	var resourceId=null;
	           	var paymentData=[];
	           	paymentData=scope.formData6;
	           	
	        if(scope.propertyMaster&&(angular.isUndefined(scope.propetyId))){
	        	
	        	delete scope.property.precinctCode;
       		   resourceFactory.propertyCodeResource.save({},scope.property,function(data){
       			 scope.propetyId=data.resourceId;
	           
	            resourceFactory.activationProcessResource.save(scope.ActivationData,function(data){
	            	resourceId=data.resourceId;
	            	//var resp = filter('ConfigLookup')('payment');
	            	var resp = webStorage.get("client_configuration").payment;
	          
	            	if(resp){
	            	
	            	scope.formData6.paymentCode=23;
	            	scope.formData6.locale=$rootScope.locale.code;
	            	scope.formData6.dateFormat = 'dd MMMM yyyy';
	            	scope.formData6.paymentDate=reqDate;
	            	var num=Math.floor((Math.random()*900)+100);
	            	scope.formData6.receiptNo="SA"+num+"_"+scope.formData6.receiptNo;
	            	resourceFactory.paymentsResource.save({clientId :resourceId}, scope.formData6,function(data){
	            		

	            	});
	            	}
	            	location.path('/viewclient/'+ resourceId);
	            });
       		  });
	         }else{
	        	 
	        	 resourceFactory.activationProcessResource.save(scope.ActivationData,function(data){
		            	resourceId=data.resourceId;
		            	//var resp = filter('ConfigLookup')('payment');
		            	var resp = webStorage.get("client_configuration").payment;
		          
		            	if(resp){
		            	
		            	scope.formData6.paymentCode=23;
		            	scope.formData6.locale=$rootScope.locale.code;
		            	scope.formData6.dateFormat = 'dd MMMM yyyy';
		            	scope.formData6.paymentDate=reqDate;
		            	var num=Math.floor((Math.random()*900)+100);
		            	scope.formData6.receiptNo="SA"+num+"_"+scope.formData6.receiptNo;
		            	resourceFactory.paymentsResource.save({clientId :resourceId}, scope.formData6,function(data){
		            		

		            	});
		            	}
		            	location.path('/viewclient/'+ resourceId);
		            });
	         }
	           
	        };
    	  
		  
	
    }
  });
  mifosX.ng.application.controller('CreateActivationController', [
                                                                  '$scope',
                                                                  'webStorage',
                                                                  '$routeParams',
                                                                  'ResourceFactory', 
                                                                  '$location', 
                                                                  '$http',
                                                                  '$filter',
                                                                  'PermissionService', 
                                                                  'dateFilter',
                                                                  '$rootScope',
                                                                  'API_VERSION',
                                                                  '$modal',
                                                                  mifosX.controllers.CreateActivationController]).run(function($log) {
    $log.info("CreateActivationController initialized");
  });
}(mifosX.controllers || {}));
