(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateActivationController: function(scope,webStorage,routeParams, resourceFactory, location, http,filter, dateFilter) {
		 
		
		  scope.ActivationData = {};
		  scope.ActivationData.client = [];
		  scope.ActivationData.sale = [];
		  scope.ActivationData.allocate = [];
		  scope.ActivationData.bookorder = [];
		  scope.ActivationData.owndevice = [];
		  scope.data=[];
		  var config = webStorage.get('CPE_TYPE');
		  scope.config=config;
		
          
		  
//create client controller
          scope.offices = [];
          scope.staffs = [];
          scope.first = {};
          scope.allocation={};
          scope.first.date = new Date();
          scope.allocation.date=new Date();
          scope.formData1 = {};
          scope.formData={};
          scope.clientCategoryDatas=[];
          scope.configurationProperty=[];
          
          resourceFactory.clientTemplateResource.get(function(data) {
              scope.offices = data.officeOptions;
              scope.staffs = data.staffOptions;
              scope.formData1.officeId = scope.offices[0].id;
              scope.clientCategoryDatas=data.clientCategoryDatas;
              scope.cities=data.addressTemplateData.cityData;
              scope.configurationProperty=data.configurationProperty.enabled;
              scope.formData1.clientCategory=scope.clientCategoryDatas[0].id;
          });
          
         
          scope.changeOffice =function(officeId) {
            resourceFactory.clientTemplateResource.get({staffInSelectedOfficeOnly : false, officeId : officeId
                }, function(data) {
              scope.staffs = data.staffOptions;
             
            });
          };
        
         
          scope.getStateAndCountry=function(city){
        	 
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData1.state = data.state;
            		scope.formData1.country = data.country;
        	  });
          };
        
//addonetimsale controller
      	
			  scope.clientId=routeParams.id;
			  scope.formData2 = {};
	          scope.data={};
	          scope.maxDate = new Date();
	         
	          
	          if(config == "SALE"){
	        	  
	        resourceFactory.oneTimeSaleTemplateResource.getOnetimes({clientId: routeParams.id}, function(data) {
	        	scope.itemDatas = data.itemDatas;
	            scope.discountMasterDatas = data.discountMasterDatas;
	            scope.officesDatas=data.officesData;
	            for(var i=0;i<scope.officesDatas.length;i++){
	            	if(scope.officesDatas[i].id==1){
	            		scope.formData2.officeId=scope.officesDatas[i].id;
	            	}
	            }
	            //scope.formData2.discountId = scope.discountMasterDatas[0].discountMasterId;
                    scope.onetimesales=data;
	            scope.date= {};
	            scope.date.saleDate = new Date();
	            
	        });
	        
	          }else{
	        	  scope.itemtypes=[];
	              resourceFactory.itemResourceTemplate.getAll(function(data){
	            	  scope.itemtypes=data.itemDatas;
	            	  
	    	 
	            });	  
	          }
	       
	        scope.itemData=function(itemId,officeId){
	        	//alert(itemId);
	        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId}, function(data) {
	        		
	        		scope.formData2=data;
	        		scope.formData2.itemId=itemId;
	        		scope.formData2.officeId=officeId;
	        		scope.formData2.discountId = scope.discountMasterDatas[0].discountMasterId;
	        		
	        		scope.data.unitPrice=scope.formData2.unitPrice;
	        		scope.data.locale="en";
	        		scope.data.quantity=1;
	        		
	        		resourceFactory.oneTimeSaleQuantityResource.get({quantity:1,itemId:itemId},scope.data, function(data) {
		        		//scope.formData2=data;
		        		scope.formData2.quantity=1;
		        		scope.formData2.totalPrice=data.totalPrice;
		        		scope.formData2.itemId=itemId;
		        		scope.formData2.discountId = scope.discountMasterDatas[0].discountMasterId;
		        		
			        });	
	        		
	        		
		        });	
	        };
	        scope.itemDataQuantity=function(quantity,itemId){
	        	this.data.unitPrice=this.formData2.unitPrice;
	        	this.data.locale="en";
	        	this.data.quantity=1;
	        	
	        	//alert(itemId);
	        	resourceFactory.oneTimeSaleQuantityResource.get({quantity: quantity,itemId:itemId},this.data, function(data) {
	        		scope.formData2=data;
	        		scope.formData2.quantity=quantity;
	        		scope.formData2.itemId=itemId;
	        		scope.formData2.discountId = scope.discountMasterDatas[0].discountMasterId;
	        		
		        });	
	        	 
	        	scope.formData3.quantity=this.data.quantity;
	        	
	        };
	       
	        scope.submit2 = function() {
	        };

//allocation  controller
	          scope.formData3 = {};
			  scope.clientId=routeParams.clientId;
			 //scope.allocation.date = new Date();
	        scope.getData = function(query,officeId){
	        	if(query.length>0){
	        		resourceFactory.allocateHardwareDetails.getSerialNumbers({oneTimeSaleId:scope.formData2.itemId,officeId:officeId,query: query}, function(data) { 	        	
	     	            scope.itemDetails = data.serials;
	     	          
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
	        scope.start.date = new Date();
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
	        		 scope.formData4.planCode=value;
	        		 
	        		  for (var i in data.subscriptiondata) {
	                 	
	                 	if(data.subscriptiondata[i].id == data.contractPeriod){
	                 		 scope.formData4.contractPeriod=data.subscriptiondata[i].id; 
	                 	}
	                   
	                  };
	             });
	       };
	        
	       scope.formName=function(name){
	    	  
	    	 // var name= this.middlename;
               
               var mesage_array = new Array();
               mesage_array = (name.split(" "));
            
            this.formData1.firstname=mesage_array[0];
            this.formData1.lastname=mesage_array[1];
            if(this.formData1.lastname == null){
         	   this.formData1.lastname="Mr.";
            }
         	  
           };
	      
	        scope.submit4 = function() {   
	        	scope.flag = true;

	        	this.formData4.locale = 'en';
	        	this.formData4.isNewplan=true;
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData4.dateFormat = 'dd MMMM yyyy';
	            this.formData4.start_date = reqDate;
	         //   alert(this.formData4.contractPeriod);
	            if(this.formData4.isPrepaid == 'Y'){
	            this.formData4.paytermCode='Monthly';
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
	              	//alert("submit");
	                  var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
	                  this.formData1.locale = 'en';
	                  this.formData1.active = true;
	                  this.formData1.dateFormat = 'dd MMMM yyyy';
	                  this.formData1.activationDate = reqDate;
	                  this.formData1.state=scope.formData1.state;
	                  this.formData1.country=scope.formData1.country;
	                  this.formData1.addressNo="Addr1";
	                

	                
	                  /* var name= this.middlename;
	                  
	                      var mesage_array = new Array();
	                      mesage_array = (name.split(" "));
	                   
	                   this.formData1.firstname=mesage_array[0];
	                   this.formData1.lastname=mesage_array[1];
	                   if(this.formData1.lastname == null){
	                	   this.formData1.lastname="Mr.";
	                   }*/
	                   

	                  this.formData1.flag=scope.configurationProperty;
	                  delete this.formData1.middlename;
	                //  delete this.formData1.name;
	                  
	                if(config =='SALE'){  
	 	        	 this.formData2.locale = "en";
	 	             this.formData2.dateFormat = "dd MMMM yyyy";
	 	             this.formData2.saleType="Sale";
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
	                }else{
	                	
	                	  scope.formData5.locale = 'en';
	  		            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
	  		            scope.formData5.dateFormat = 'dd MMMM yyyy';
	  		            scope.formData5.allocationDate = reqDate;
	  		            scope.formData5.status = "ACTIVE";
	  		          scope.formData5.serialNumber=scope.formData5.provisioningSerialNumber;
	  		            
	  		            
	                }
	 	            
	 	        	
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
	 	            
	 	        	 scope.formData3.itemMasterId=scope.formData2.itemId;
	 	            this.formData2.serialNumber=temp1;

	 	            var clientId=null;
	 	            // temp1 = undefined;
	 	            
		            scope.ActivationData.owndevice.push(this.formData5);
		            scope.ActivationData.bookorder.push(this.formData4);
	 	            scope.ActivationData.allocate.push(this.formData3);
	 	            scope.ActivationData.sale.push(this.formData2);
	 	            scope.ActivationData.client.push(this.formData1);
	 	            
	 	            delete this.formData3.serials;
	 	            delete this.formData2.pageItems;
	 	            delete this.formData2.totalFilteredRecords;

	 	           
	 	    
	           	var resourceId=null;
	           	var paymentData=[];
	           	paymentData=scope.formData6;
	            
	            resourceFactory.activationProcessResource.save(scope.ActivationData,function(data){
	            	 // location.path('/viewclient/' + data.resourceId);
	            	resourceId=data.resourceId;
	            	var resp = filter('ConfigLookup')('payment');
	          
	            	if(resp){
	            	
	            	scope.formData6.paymentCode=23;
	            	scope.formData6.locale='en';
	            	scope.formData6.dateFormat = 'dd MMMM yyyy';
	            	scope.formData6.paymentDate=reqDate;
	            	var num=Math.floor((Math.random()*900)+100);
	            	scope.formData6.receiptNo="SA"+num+"_"+scope.formData6.receiptNo;
	            	resourceFactory.paymentsResource.save({clientId :resourceId}, scope.formData6,function(data){
	            		

	            	});
	            	}
	            	location.path('/viewclient/'+ resourceId);


	 	         /*   resourceFactory.activationProcessResource.save(scope.ActivationData,function(data){
	            	 location.path('/viewclient/' + data.resourceId);
>>>>>>> obsplatform-1.01*/
	            });
	           
	        };
    	  
		  
	
    }
  });
  mifosX.ng.application.controller('CreateActivationController', ['$scope','webStorage', '$routeParams','ResourceFactory', '$location', '$http','$filter', 'dateFilter', mifosX.controllers.CreateActivationController]).run(function($log) {
    $log.info("CreateActivationController initialized");
  });
}(mifosX.controllers || {}));
