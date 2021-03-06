(function(module) {
  mifosX.controllers = _.extend(module, {
	  CreateOrderController: function(scope,webStorage,routeParams, resourceFactory,dateFilter,location,filter,$rootScope) {
        scope.plandatas = [];
        scope.postpaidPlanDatas = [];
        scope.prepaidPlanDatas = [];
       // scope.postAvailableServices = [];
       // scope.preAvailableServices = [];
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
        scope.clientId=routeParams.id;
        scope.formData =[];
        scope.walletConfig = webStorage.get('is-wallet-enable');
        scope.clientConfiguration = webStorage.get('client_configuration');
        var isAutoRenew = scope.clientConfiguration.isAutoRenew== 'true';
        var date;

        $("[name='autoRenewCheckbox']").bootstrapSwitch('state', isAutoRenew, true);
        var clientData = webStorage.get('clientData');
        scope.displayName=clientData.displayName;
        scope.statusActive=clientData.statusActive;
	    scope.hwSerialNumber=clientData.hwSerialNumber;
        scope.accountNo=clientData.accountNo;
        scope.officeName=clientData.officeName;
        scope.balanceAmount=clientData.balanceAmount;
        scope.currency=clientData.currency;
        scope.imagePresent=clientData.imagePresent;
        scope.categoryType=clientData.categoryType;
        scope.email=clientData.email;
        scope.phone=clientData.phone;
        if(scope.imagePresent){
         scope.image=clientData.image;
        }
        //scope.minDate=scope.start.date;
        scope.postpaid  ={};
        scope.postpaid.open = true;
        scope.isnow=true;
        
        resourceFactory.orderTemplateResource.get({'planId': routeParams.planId,'clientId': routeParams.id},function(data) {
     	   scope.start.date = new Date(data.date);
     	   date = data.date;
     	   
     	   scope.plandatas = data.plandata;	
     	   for(var plan in scope.plandatas){
     		   //assinging postpaid plans
     		   if(scope.plandatas[plan].isPrepaid == 'N')
     			   scope.postpaidPlanDatas.push(scope.plandatas[plan]);
     		   //assinging prepaid plans
     		   else if(scope.plandatas[plan].isPrepaid == 'Y')
     			   scope.prepaidPlanDatas.push(scope.plandatas[plan]);
     	   }
            scope.subscriptiondatas=data.subscriptiondata;
            scope.paytermdatas=data.paytermdata;
            scope.clientId = routeParams.id;
            scope.formData = {
              		billAlign: true,
              		autoRenew : isAutoRenew
                    };
     	   
        });
        
        
        scope.$watch('start.date', function() {
    	    scope.doSomething();  
    	});
       scope.doSomething =function(){
    	   
    	   scope.todayDate=new Date(date).toDateString();
    	   scope.selectedDate=scope.start.date.toDateString();
    	   
    	   if(Date.parse(scope.todayDate) > Date.parse(scope.selectedDate)){
    		
    		   scope.isnow=true;
    	   }else if(Date.parse(scope.todayDate) < Date.parse(scope.selectedDate)){
    		
    		   scope.isnow=false;
    	   }else if(scope.todayDate == scope.selectedDate){
    		
    		   scope.isnow=true;
    	   }

       };

        scope.setBillingFrequency = function(value) {
        	  $('plancode').css({"color":"red"});
        	scope.paytermdatas=undefined;
        	 resourceFactory.orderResource.get({planId:value,'clientId': routeParams.id,template: 'true'} , function(data) {
        		 scope.paytermdatas=data.paytermdata;
        		 scope.formData.isPrepaid=data.isPrepaid;
        		 scope.isPrepaidPlan=data.isPrepaid;


        		 scope.formData.planCode=value;
        		 scope.formData.contractPeriod=data.contractPeriod;
        		/*  for (var i in data.subscriptiondata) {
                 	
                 	if(data.subscriptiondata[i].id == data.contractPeriod){
                 		 scope.formData.contractPeriod=data.subscriptiondata[i].id; 
                 	}
                   
                  };*/
             });
       };
        
       var searchMatch = function (haystack, needle) {
           if (!needle) {
               return true;e
           }
          
           return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;e
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
         
        $('input[name="autoRenewCheckbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
   		  console.log(state); // true | false
   		  	scope.formData.autoRenew = state;
   		});

        scope.submit = function() { 
        	
        	this.formData.isNewplan =false;
        	if(routeParams.planId == 0){
        		this.formData.isNewplan =true;
        	}
        	
        	
        	scope.flag = true;
        	this.formData.locale = $rootScope.locale.code;
           	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.start_date = reqDate;
            
            if(this.formData.isPrepaid == 'Y'){

            	  for (var i in scope.paytermdatas) {
                     	if(scope.paytermdatas[i].duration == this.formData.contractPeriod){
                     		 this.formData.paytermCode=scope.paytermdatas[i].paytermtype; 
                     	}
                  };
                  for (var i in scope.subscriptiondatas) {
                   	if(scope.subscriptiondatas[i].Contractdata == this.formData.contractPeriod){
                   		 this.formData.contractPeriod=scope.subscriptiondatas[i].id;
                   		
                   	}
                };    
            //this.formData.paytermCode='Monthly';
                this.formData.billAlign=false;
            }
            delete this.formData.planId;
            delete this.formData.id;
            delete this.formData.isPrepaid;

            var orderId = webStorage.get('orderId');
            
            if(routeParams.planId == 0){

            	resourceFactory.saveOrderResource.save({'clientId': routeParams.id},this.formData,function(data){
                    location.path('/vieworder/' + data.resourceId+'/'+routeParams.id);
                  },function(errData){
                	  scope.flag = false;
                  });
            
            }else{
            	this.formData.disconnectionDate= reqDate;
            	this.formData.disconnectReason= "Not Interested";
            	resourceFactory.changeOrderResource.update({'orderId':orderId},this.formData,function(data){
                    location.path('/vieworder/' + data.resourceId+'/'+routeParams.id);
                  },function(errData){
                	  scope.flag = false;
                  });
            	
            }
            

        };
        scope.submitschedule = function() {   
        	this.formData.isNewplan =false;
        	if(routeParams.planId == 0){
        		this.formData.isNewplan =true;
        	}
        	
        	
        	scope.flag = true;
        	this.formData.locale = $rootScope.locale.code;
        	this.formData.serialnumber="";
           	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
            this.formData.dateFormat = 'dd MMMM yyyy';
            this.formData.start_date = reqDate;
            if(this.formData.isPrepaid == 'Y'){

          	  for (var i in scope.paytermdatas) {
                   	if(scope.paytermdatas[i].duration == this.formData.contractPeriod){
                   		 this.formData.paytermCode=scope.paytermdatas[i].paytermtype; 
                   	}
                };
                for (var i in scope.subscriptiondatas) {
                 	if(scope.subscriptiondatas[i].Contractdata == this.formData.contractPeriod){
                 		 this.formData.contractPeriod=scope.subscriptiondatas[i].id;
                 		
                 	}
              };   
            }
            delete this.formData.planId;
            delete this.formData.id;
            delete this.formData.isPrepaid;

            var orderId = webStorage.get('orderId');
            
            if(routeParams.planId == 0){

            	resourceFactory.OrderSchedulingResource.save({'clientId': routeParams.id},this.formData,function(data){
                    location.path('/viewclient/'+routeParams.id);
                  },function(errData){
                	  scope.flag = false;
                  });
            
            }else{/*
            	this.formData.disconnectionDate= reqDate;
            	this.formData.disconnectReason= "Not Interested";
            	resourceFactory.changeOrderResource.update({'orderId':orderId},this.formData,function(data){
                    location.path('/vieworder/' + data.resourceId+'/'+routeParams.id);
                  },function(errData){
                	  scope.flag = false;
                  });
            	
            */
            	this.formData.disconnectionDate= reqDate;
            	this.formData.disconnectReason= "Not Interested";
            	this.formData.actionType = "changeorder";
            	this.formData.orderId = orderId;
            	resourceFactory.OrderSchedulingResource.save({'clientId': routeParams.id},this.formData,function(data){
                    location.path('/vieworder/' + orderId+'/'+routeParams.id);
                  },function(errData){
                	  scope.flag = false;
                  });
            	}
            
            };
        }
	  
  });
  mifosX.ng.application.controller('CreateOrderController', ['$scope','webStorage','$routeParams', 'ResourceFactory', 'dateFilter','$location','$filter','$rootScope', mifosX.controllers.CreateOrderController]).run(function($log) {
    $log.info("CreateOrderController initialized");
  });
}(mifosX.controllers || {}));




//do not delete this code it is important.....

/* resourceFactory.orderTemplateResource.get({'planId': routeParams.planId},function(data) {

scope.plandatas = data.plandata;
scope.items = data.plandata;
scope.prepaidPlansitems = data.plandata;
//  scope.formData=data;
scope.subscriptiondatas=data.subscriptiondata;
scope.paytermdatas=data.paytermdata;
scope.clientId = routeParams.id;

//   scope.formData.billAlign=true;

scope.formData = {
  		billAlign: true,
  		
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
 
});*/
