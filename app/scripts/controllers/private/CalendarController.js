(function(module) {
    mifosX.controllers = _.extend(module, {
    	CalendarController: function(scope, resourceFactory,location,dateFilter,filter) {
    		
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
			 
			$('#calendar').fullCalendar({
		     	header: {
		     		left: 'prev,next today',
		     		center: 'title',
		     		right: 'month,basicWeek,basicDay'
		     	},
		     	defaultDate: dateFilter(new Date(), 'yyyy-MM-dd'),
		     	editable: true,
		     	eventLimit: true, // allow "more" link when too many events
		     	
		     	events: scope.events
		     		/*[
		         				{
		         					title: 'All Day Event',
		         					start: '2015-07-01'
		         				},
		         				{
		         					title: 'Long Event',
		         					start: '2015-07-07',
		         					end: '2015-07-08'
		         				},
		         				{
		         					id: 999,
		         					title: 'Repeating Event',
		         					start: '2015-07-09T16:00:00'
		         				},
		         				{
		         					id: 999,
		         					title: 'Repeating Event',
		         					start: '2015-07-16T16:00:00'
		         				},
		         				{
		         					title: 'Conference',
		         					start: '2015-07-15',
		         					end: '2015-07-16'
		         				},
		         				{
		         					title: 'Meeting',
		         					start: '2015-07-12T10:30:00',
		         					end: '2015-07-12T12:30:00'
		         				},
		         				{
		         					title: 'Lunch',
		         					start: '2015-07-12T12:00:00'
		         				},
		         				{
		         					title: 'Meeting',
		         					start: '2015-07-12T14:30:00'
		         				},
		         				{
		         					title: 'Happy Hour',
		         					start: '2015-07-12T17:30:00'
		         				},
		         				{
		         					title: 'Dinner',
		         					start: '2015-07-12T20:00:00'
		         				},
		         				{
		         					title: 'Birthday Party',
		         					start: '2015-07-13T07:00:00'
		         				},
		         				{
		         					title: 'Click for Google',
		         					url: 'http://google.com/',
		         					start: '2015-07-28'
		         				}
		         				
		         			]*/
		     });
		 });
            
        }
    });
    mifosX.ng.application.controller('CalendarController', ['$scope', 'ResourceFactory','$location','dateFilter','$filter', mifosX.controllers.CalendarController]).run(function($log) {
        $log.info("CalendarController initialized");
    });
}(mifosX.controllers || {}));

