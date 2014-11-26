(function(module) {
  mifosX.controllers = _.extend(module, {
	  SmartSearchController: function(scope, resourceFactory , paginatorService,dateFilter,location,$rootScope) {
        scope.filters = [{option: "All", value: ""},{option: "Manual Entries", value: true},{option: "System Entries", value: false}];
        scope.isCollapsed = true;
        scope.displayResults = false;
        scope.transactions = [];
        scope.searchDatas = [];
        scope.glAccounts = [];
        scope.offices = [];
        scope.displaySearchResults =false;
        scope.date={};
        scope.formData={};

        resourceFactory.accountCoaResource.getAllAccountCoas({manualEntriesAllowed:true, usage:1, disabled:false}, function(data){
          scope.glAccounts = data;
        });

        resourceFactory.officeResource.getAllOffices(function(data){
          scope.offices = data;  
        });
        
        scope.routeTo = function(id){
            location.path('/viewclient/'+ id);
          };
          
          
          scope.getTicketValues= function (){
        	   resourceFactory.ticketResourceTemplate.get(function(data){ 
                   scope.date = data.ticketDate;
                   scope.problemsDatas=data.problemsDatas;
                   scope.usersDatas=data.usersData;
                 
                 });
          };
        
       var fetchFunction = function(offset, limit, callback) {
          var reqFirstDate = dateFilter(scope.date.first,'yyyy-MM-dd');
          var reqSecondDate = dateFilter(scope.date.second,'yyyy-MM-dd');
          var params = {};
          params.offset = offset;
          params.limit = limit;
          params.locale = $rootScope.locale.code;
          params.dateFormat = "dd MMMM yyyy";

          if (scope.formData.searchText) { params.searchText = scope.formData.searchText; };
          
          if (scope.date.first) { params.fromDate = reqFirstDate; };

          if (scope.date.second) { params.toDate = reqSecondDate; };

          resourceFactory.smartSearchResource.search(params, callback,function(data){
        	  scope.transactions = data.pageItems;
          });
        
       };
       var fetchTicketFunction = function(offset, limit, callback) {
    	   
           var reqFirstDate = dateFilter(scope.date.first,'yyyy-MM-dd');
           var reqSecondDate = dateFilter(scope.date.second,'yyyy-MM-dd');
           var params = {};
           params.offset = offset;
           params.limit = limit;
           params.locale = $rootScope.locale.code;
           params.dateFormat = "dd MMMM yyyy";
        
           if (scope.formData.searchText) { params.searchText = scope.formData.searchText; };
           if (scope.formData.category) { params.category = scope.formData.category; };
           if (scope.formData.assignedTo) { params.assignedTo = scope.formData.assignedTo; };
           if (scope.formData.searchText) { params.closedBy = scope.formData.closedBy; };
           if (scope.formData.searchText) { params.status = scope.formData.status; };
           if (scope.date.first) { params.fromDate = reqFirstDate; };
           if (scope.date.second) { params.toDate = reqSecondDate; };

           resourceFactory.advanceSearchResource.search(params, callback,function(data){
         	  scope.transactions = data.pageItems;
           });
         
        }
        scope.searchTransaction = function () {
         
          if(scope.formData.searchType == 'tickets'){
        	  scope.displaySearchResults = true;
        	  scope.searchDatas = paginatorService.paginate(fetchTicketFunction, 14);
          }else{
        	  scope.displayResults = true;
        	  scope.transactions = paginatorService.paginate(fetchFunction, 14);
          }
          scope.isCollapsed= true;
        };

       }
  });
  mifosX.ng.application.controller('SmartSearchController', ['$scope', 'ResourceFactory', 'PaginatorService','dateFilter','$location','$rootScope', mifosX.controllers.SmartSearchController]).run(function($log) {
    $log.info("SmartSearchController initialized");
  });
}(mifosX.controllers || {}));