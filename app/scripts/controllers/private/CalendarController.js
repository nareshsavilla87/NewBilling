(function(module) {
    mifosX.controllers = _.extend(module, {
    	CalendarController: function(scope, resourceFactory,location,dateFilter,filter,$modal) {
    		
            scope.dashModel = 'calendar';
            
            scope.switch1 = function() {
	        	location.path('/home');
			};
            
			scope.switchDash = function() {
				location.path('/dashboard');
			};
			  scope.switchDef = function() {
		        	location.path('/definations');
				};
				
		 resourceFactory.runReportsResource.get({reportSource: 'NetActiveCalendar', genericResultSet:false} , function(data) {
			
			 scope.events = [];data = angular.fromJson(angular.toJson(data));
			 for(var i in data){
				 if(data[i].actual_date){
					 actual_date = data[i].actual_date.split(" ");
					 scope.events.push({
						 title : data[i].cnt,
						 start : actual_date[0]
					 });
				 }
		     }
			 
			 resourceFactory.runReportsResource.get({reportSource: 'opTicketsbyDays', genericResultSet:false} , function(tktData) {
				 tktData = angular.fromJson(angular.toJson(tktData));
				 for(var i in tktData){
					 scope.events.push({
						 title : "Open Tickets = "+tktData[i].tkt_cnt,
						 start : dateFilter(new Date(tktData[i].days),"yyyy-MM-dd")
					 });
				 }
				$('#calendar').fullCalendar({
			     	header: {
			     		left: 'prev,next today',
			     		center: 'title',
			     		right: 'month,basicWeek,basicDay'
			     	},
			     	eventClick: scope.calendarDetailsPopup,
			     	defaultDate: dateFilter(new Date(), 'yyyy-MM-dd'),
			     	editable: true,
			     	eventLimit: true, // allow "more" link when too many events
			     	
			     	events: scope.events
			     });
			 });
		 });
		 
		 /*popup details*/
			scope.calendarDetailsPopup= function(date, jsEvent, view){
				var title = date.title.split("="); 
				scope.transactionType = title[0];
				if(scope.transactionType == "REN BEF AUTO EXP "){
					scope.transactionType = "RENEWAL BEFORE AUTOEXIPIRY";
				}else if(scope.transactionType == "REN AFT AUTO EXP "){
					scope.transactionType = "RENEWAL AFTER AUTOEXIPIRY";
				}
				scope.date = date.start._i; 
				if(scope.transactionType == "Open Tickets "){
					
					$modal.open({
		                templateUrl: 'ticketspopup.html',
		                controller:TicketsDetailsPopupController ,
		                resolve:{}
		        	 });
				}else{
	        	  $modal.open({
	                templateUrl: 'calendarDetailsPopup.html',
	                controller:calendarDetailsPopupController ,
	                resolve:{}
	        	  });
				}
	        	
	        };
	        
	        function calendarDetailsPopupController($scope,$modalInstance){
	      	  
	      	  resourceFactory.runReportsResource.get({reportSource: 'ClientNotificationsByDay',R_transactionType:scope.transactionType,R_startDate : scope.date, genericResultSet:false} , function(data) {
	      		  $scope.orderDatas=data;
	    	  	});
	      	  
	      	  $scope.routeToViewClient = function(clientId){
	      		  $modalInstance.dismiss('cancel');
	      		  location.path("/viewclient/"+clientId);
	      	  };
	      	  
	  	    		$scope.reject = function(){
	  	    			$modalInstance.dismiss('cancel');
	  	    		};
	  	     };
	  	     
	  	     function TicketsDetailsPopupController($scope,$modalInstance){
	  	    	 
	  	    	 resourceFactory.runReportsResource.get({reportSource: 'Client Wise Tickets',R_startDate : scope.date,R_endDate : scope.date,R_officeId:-1, genericResultSet:false} , function(data) {
	  	    		 $scope.ticketsData=data;
	  	    	 });
	  	    	 
	  	    	$scope.routeToViewTicket = function(clientId,tktId){
		      		  $modalInstance.dismiss('cancel');
		      		  location.path("/viewTicket/"+clientId+"/"+tktId);
		      	 };
	  	    	 
	  	    	 $scope.close = function(){
	  	    		 $modalInstance.dismiss('cancel');
	  	    	 };
	  	     };
            
        }
    });
    mifosX.ng.application.controller('CalendarController', ['$scope', 'ResourceFactory','$location','dateFilter','$filter','$modal', mifosX.controllers.CalendarController]).run(function($log) {
        $log.info("CalendarController initialized");
    });
}(mifosX.controllers || {}));

