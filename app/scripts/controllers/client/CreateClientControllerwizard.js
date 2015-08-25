(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateClientControllerwizard: function(scope,webStorage,routeParams, resourceFactory, location, http,filter, dateFilter,$rootScope) {
		 
		  scope.nextcount=0;
		  scope.next=true;
		  scope.step1=true;
		  scope.step2=false;
		  scope.step3=false;
		  scope.step4=false;
		  scope.previous=false;
		  scope.ActivationData = {};
		  scope.ActivationData.client = [];
		  scope.ActivationData.sale = [];
		  scope.ActivationData.allocate = [];
		  scope.ActivationData.bookorder = [];
		  scope.ActivationData.owndevice = [];
		  var config = webStorage.get('CPE_TYPE');
		  scope.nextStepmain=function(){
			  if(scope.nextcount<2){
			    scope.nextcount=scope.nextcount+1;
			    scope.previouscount=scope.nextcount;
			  }
			  if(scope.nextcount==1){
				  scope.previous=true;
				  scope.step1=false;
				  scope.step2=true;
				  //scope.step3=false;
				  scope.step4=false;
				 // var config = webStorage.get('CPE_TYPE');
				  
				  if(config == "OWN"){
					  scope.template2="views/clients/createownedharwarewizard.html"; 
				  }else{
				      scope.template2="views/clients/addonetimesalewizard.html";
				  }
			  	$('#active1').html('1.Client Information');
			  	$('#active2').html('2.Device Info');
			  //	$('#active3').html('3.Assign Device');
			  	$('#active4').html('3.Order');
			  	$("#progress1").css({"background":"none repeat scroll 0% 0% #90EE90"});
			  	$("#progress2").css({"background":"none repeat scroll 0% 0% #FFA500"});
			  	$("#progress3").css({"background":"none repeat scroll 0% 0% #E5E4E2"});
			  	$("#progress4").css({"background":"none repeat scroll 0% 0% #E5E4E2"});
			   
			  }
			 /* if(scope.nextcount==2){
				  scope.step1=false;
				  scope.step2=false;
				  scope.step3=true;
				  scope.step4=false;
				  scope.template3="views/clients/allocatehardwareonetimesalewizard.html";
				  	$('#active1').html('1.Client Information');
				  	$('#active2').html('2.Item Sale');
				  	$('#active3').html('3.Assign Device');
				  	$('#active4').html('4.Order');
				  	$("#progress1").css({"background":"none repeat scroll 0% 0% #90EE90"});
				  	$("#progress2").css({"background":"none repeat scroll 0% 0% #90EE90"});
				  	$("#progress3").css({"background":"none repeat scroll 0% 0% #FFA500"});
				  	$("#progress4").css({"background":"none repeat scroll 0% 0% #E5E4E2"});
				  
				}*/
			  if(scope.nextcount==2){
				  scope.step1=false;
				  scope.step2=false;
				  //scope.step3=false;
				  scope.step4=true;
				  scope.template4="views/clients/createorderwizard.html";
				  	$('#active1').html('1.Client Information');
				  	$('#active2').html('2.Device Info');
				  	//$('#active3').html('3.Assign Device');
				  	$('#active4').html('3.Order');
				  	$("#progress1").css({"background":"none repeat scroll 0% 0% #90EE90"});
				  	$("#progress2").css({"background":"none repeat scroll 0% 0% #90EE90"});
				  	$("#progress3").css({"background":"none repeat scroll 0% 0% #90EE90"});
				  	$("#progress4").css({"background":"none repeat scroll 0% 0% #FFA500"});
						 scope.next=false;
						 scope.finish=true;
						 
				}
          };
		  
          
          scope.previousStepmain=function(){
				scope.next=true;
				scope.finish=false;
				
				if(scope.previouscount>=0){
				   scope.previouscount=scope.previouscount-1;
				   scope.nextcount=scope.nextcount-1;
				}
				
				if(scope.previouscount==1){
					scope.step4=false;
					scope.step2=true;
					$('#active1').html('1.Client Information');
				  	$('#active2').html('2.Device Info');
				 // 	$('#active3').html('3.Assign Device');
				  	$('#active4').html('3.Order');
					$("#progress1").css({"background":"none repeat scroll 0% 0% #90EE90"});
				  	$("#progress2").css({"background":"none repeat scroll 0% 0% #FFA500"});
				  	//$("#progress3").css({"background":"none repeat scroll 0% 0% #FFA500"});
				  	$("#progress4").css({"background":"none repeat scroll 0% 0% #E5E4E2"});
				}
				
				/*if(scope.previouscount==1){
					scope.step3=false;
					scope.step2=true;
					$('#active1').html('1.Client Information');
				  	$('#active2').html('2.Item Sale');
				 // 	$('#active3').html('3.Assign Device');
				  	$('#active4').html('3.Order');
					$("#progress1").css({"background":"none repeat scroll 0% 0% #90EE90"});
				  	$("#progress2").css({"background":"none repeat scroll 0% 0% #FFA500"});
				  	$("#progress3").css({"background":"none repeat scroll 0% 0% #E5E4E2"});
				  	$("#progress4").css({"background":"none repeat scroll 0% 0% #E5E4E2"});
					
				}*/
				if(scope.previouscount==0){
					scope.step2=false;
					scope.step1=true;
					$('#active1').html('1.Client Information');
				  	$('#active2').html('2.Device Info');
				  	//$('#active3').html('3.Assign Device');
				  	$('#active4').html('3.Order');
					$("#progress1").css({"background":"none repeat scroll 0% 0% #FFA500"});
				  	$("#progress2").css({"background":"none repeat scroll 0% 0% #E5E4E2"});
				  	$("#progress3").css({"background":"none repeat scroll 0% 0% #E5E4E2"});
				  	$("#progress4").css({"background":"none repeat scroll 0% 0% #E5E4E2"});
					scope.previous=false;
				}
			};
		  
//create client controller
          scope.offices = [];
          scope.staffs = [];
          scope.first = {};
          scope.allocation={};
          scope.first.date = new Date();
          scope.allocation.date=new Date();
          scope.formData1 = {};
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
        
          /*$("#city").change(function(){
        	 
          	resourceFactory.AddressTemplateResource.get({city : scope.formData1.city}, function(data) {
          		scope.formData1.state = data.state;
          		scope.formData1.country = data.country;
           
          });
          });*/
          scope.getStateAndCountry=function(city){
        	  resourceFactory.AddressTemplateResource.get({city :city}, function(data) {
            		scope.formData1.state = data.state;
            		scope.formData1.country = data.country;
        	  });
          };
          scope.onFileSelect = function($files) {
            scope.file = $files[0];
          };
          scope.setChoice = function(){
              if(this.formData1.active){
                  scope.choice = 1;
              }
              else if(!this.formData1.active){
                  scope.choice = 0;
              }
          };
          scope.submit1 = function() {
        	  
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
	            scope.formData2.discountId = scope.discountMasterDatas[0].discountMasterId;
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
	       
	        scope.itemData=function(itemId){
	        	//alert(itemId);
	        	resourceFactory.oneTimeSaleTemplateResourceData.get({itemId: itemId}, function(data) {
	        		
	        		scope.formData2=data;
	        		scope.formData2.itemId=itemId;
	        		scope.formData2.discountId = scope.discountMasterDatas[0].discountMasterId;
	        		
	        		
		        });	
	        };
	        scope.itemDataQuantity=function(quantity,itemId){
	        	this.data.unitPrice=this.formData2.unitPrice;
	        	this.data.locale=$rootScope.locale.code;
	        	this.data.quantity=quantity;
	        	
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
	        scope.getData = function(query){
	        	if(query.length>0){
	        		resourceFactory.allocateHardwareDetails.getSerialNumbers({oneTimeSaleId:scope.formData2.itemId,query: query}, function(data) { 	        	
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
	     	   
	            scope.filteredItems = filter('filter')(scope.items, function (item) {
	                for(var attr in item) {
	                    if (searchMatch(item[attr], scope.query))
	                        return true;
	                }
	                return false;
	            });
	            
	            scope.prepaidPalnfilteredItems = filter('filter')(scope.prepaidPlansitems, function (prepaidPlansitem) {
	                for(var attr in prepaidPlansitem) {
	                	
	                    if (searchMatch1(prepaidPlansitem[attr], scope.query))
	                        return true;
	                }
	                
	                return false;
	               
	            });
	            
	            if (scope.sortingOrder !== '') {
	                scope.filteredItems =filter('orderBy')(scope.filteredItems, scope.sortingOrder, scope.reverse);
	           }
	            
	            if (scope.sortingOrder !== '') {
	                scope.filteredItems =filter('orderBy')(scope.prepaidPalnfilteredItems, scope.sortingOrder, scope.reverse);
	           }
	            scope.currentPage = 0;
	            scope.groupToPages();
	            scope.groupToprepaidPages();
	            scope.pagedItems = [];
	            for (var i = 0; i < scope.filteredItems.length; i++) {
	                if (i % scope.itemsPerPage === 0) {
	                    scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.filteredItems[i] ];
	                } else {
	                    scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.filteredItems[i]);
	                }
	            }
	            
	            scope.prepaidPlanspagedItems = [];
	            
	            for (var i = 0; i < scope.prepaidPalnfilteredItems.length; i++) {
	            	
	            	
	                if (i % scope.itemsPerPage === 0) {
	                    scope.prepaidPlanspagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.prepaidPalnfilteredItems[i] ];
	                } else {
	                    scope.prepaidPlanspagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.prepaidPalnfilteredItems[i]);
	                }
	            }
	           
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
	        
	       var searchMatch = function (haystack, needle) {
	           if (!needle) {
	               return true;
	           }
	          
	           return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	       };
	       
	       var searchMatch1 = function (haystack, needle) {
	           if (!needle) {
	               return true;
	           }
	          
	           return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
	       };

	       // init the filtered items
	       scope.search = function () {
	    	   
	           scope.filteredItems = filter('filter')(scope.items, function (item) {
	        	   
	               for(var attr in item) {
	            	  
	                   if (searchMatch(item[attr], scope.query))
	                       return true;
	               }
	               return false;
	           });
	           // take care of the sorting order
	         //  if (scope.sortingOrder !== '') {
	               scope.filteredItems =filter('orderBy')(scope.filteredItems, scope.sortingOrder, scope.reverse);
	          // }
	           scope.currentPage = 0;
	           // now group by pages
	           scope.groupToPages();
	       };
	       
	       // calculate page in place
	       scope.groupToPages = function () {
	           scope.pagedItems = [];
	           
	           for (var i = 0; i < scope.filteredItems.length; i++) {
	               if (i % scope.itemsPerPage === 0) {
	                   scope.pagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.filteredItems[i] ];
	               } else {
	                   scope.pagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.filteredItems[i]);
	               }
	           }
	       };
	       
	       scope.groupToprepaidPages = function () {
	           scope.prepaidPlanspagedItems = [];
	           
	           for (var i = 0; i < scope.prepaidPalnfilteredItems.length; i++) {
	               if (i % scope.itemsPerPage === 0) {
	                   scope.prepaidPlanspagedItems[Math.floor(i / scope.itemsPerPage)] = [ scope.prepaidPalnfilteredItems[i] ];
	               } else {
	                   scope.prepaidPlanspagedItems[Math.floor(i / scope.itemsPerPage)].push(scope.prepaidPalnfilteredItems[i]);
	               }
	           }
	       };
	       
	       scope.range = function (start, end) {
	           var ret = [];
	           if (!end) {
	               end = start;
	               start = 0;
	           }
	           for (var i = start; i < end; i++) {
	               ret.push(i);
	           }
	           return ret;
	       };
	       
	       scope.prevPage = function () {
	           if (scope.currentPage > 0) {
	               scope.currentPage--;
	           }
	       };
	       
	       scope.nextPage = function () {
	           if (scope.currentPage < scope.pagedItems.length - 1) {
	               scope.currentPage++;
	           }
	       };
	       
	       scope.setPage = function () {
	           scope.currentPage = this.n;
	       };

	       // functions have been describe process the data for display
	       scope.search();

	       // change sorting order
	       scope.sort_by = function(newSortingOrder) {
	           if (scope.sortingOrder == newSortingOrder)
	               scope.reverse = !scope.reverse;

	           scope.sortingOrder = newSortingOrder;

	           // icon setup
	           $('th i').each(function(){
	               // icon reset
	               $(this).removeClass().addClass('icon-sort');
	           });
	           if (scope.reverse)
	               $('th.'+'planCode'+' i').removeClass().addClass('icon-chevron-up');
	           else
	               $('th.'+'planCode'+' i').removeClass().addClass('icon-chevron-down');
	       };
	       scope.dbClick = function(){
	        	console.log("dbclick");
	        	return false;
	        };

	        scope.submit4 = function() {   
	        	scope.flag = true;

	        	this.formData4.locale = $rootScope.locale.code;
	        	this.formData4.isNewplan=true;
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData4.dateFormat = 'dd MMMM yyyy';
	            this.formData4.start_date = reqDate;
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
	                  this.formData1.locale = $rootScope.location.code;
	                  this.formData1.active = true;
	                  this.formData1.dateFormat = 'dd MMMM yyyy';
	                  this.formData1.activationDate = reqDate;
	                  this.formData1.flag=scope.configurationProperty;
	                  
	                if(config =='SALE'){  
	 	        	 this.formData2.locale = $rootScope.locale.code;
	 	             this.formData2.dateFormat = "dd MMMM yyyy";
	 	             var actDate = dateFilter(scope.date.saleDate,'dd MMMM yyyy');
	 	             this.formData2.saleDate=actDate;
	 	             delete this.formData2.discountMasterDatas;   
	 	             delete this.formData2.warranty;
	 	             delete this.formData2.itemDatas;
	 	             delete this.formData2.units;
	 	             delete this.formData2.itemCode;
	 	             delete this.formData2.id;
	               
	                }else{
	                	
	                	  scope.formData5.locale = $rootScope.locale.code;
	  		            var reqDate = dateFilter(scope.first.date,'dd MMMM yyyy');
	  		            scope.formData5.dateFormat = 'dd MMMM yyyy';
	  		            scope.formData5.allocationDate = reqDate;
	  		            scope.formData5.status = "ACTIVE";
	                }
	 	            
	 	        	
	 	        	var temp1 = new Array();
	 	        
	 	        	$("input[name='serialNumber']").each(function(){
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

	 	            
	 	           
		          
		            
	 	            // temp1 = undefined;
	 	            
		            scope.ActivationData.owndevice.push(this.formData5);
		            scope.ActivationData.bookorder.push(this.formData4);
	 	            scope.ActivationData.allocate.push(this.formData3);
	 	            scope.ActivationData.sale.push(this.formData2);
	 	            scope.ActivationData.client.push(this.formData1);
	 	            
	 	            delete this.formData3.serials;
	 	            delete this.formData2.pageItems;
	 	            delete this.formData2.totalFilteredRecords;
	            resourceFactory.activationProcessResource.save(scope.ActivationData,function(data){
	            	  location.path('/viewclient/' + data.resourceId);
	            },function(errData){
	          	  scope.flag = false;
	            });

	           
	        };
    	  
		  
	
    }
  });
  mifosX.ng.application.controller('CreateClientControllerwizard', ['$scope','webStorage', '$routeParams','ResourceFactory', '$location', '$http','$filter', 'dateFilter','$rootScope', mifosX.controllers.CreateClientControllerwizard]).run(function($log) {
    $log.info("CreateClientControllerwizard initialized");
  });
}(mifosX.controllers || {}));
