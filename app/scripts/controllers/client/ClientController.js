(function(module) {
  mifosX.controllers = _.extend(module, {
    ClientController: function(scope, resourceFactory , paginatorService,location,PermissionService,webStorage,$modal) {
        
      scope.clients = [];
      scope.config = {};
      scope.allDatas = [];
      scope.PermissionService = PermissionService;
      scope.pageNo = 1;
      scope.newClients = 0;
      scope.activeClients = 0;
      scope.InActiveClients = 0;
      scope.PendingClients = 0;
      scope.totalPages = 1;
      scope.status = 'ALL';
      scope.isPasswordShow = false;
      scope.config = webStorage.get("client_configuration").clientListing || ""; 
      scope.configValues = webStorage.get("client_configuration");
      /**
       * @default
       * we call this function from below
       * scope.clients = paginatorService.paginate(fetchFunction, 14);
       * */
      
      var passwordSetToStar = function(){
    	  for (var i in scope.allDatas){
		        	
         		if(scope.allDatas[i].clientPassword != undefined && scope.allDatas[i].clientPassword.length>0){
         			var stars = "";
         			for (var k in scope.allDatas[i].clientPassword){
 				        	if(k>=0 && k<scope.allDatas[i].clientPassword.length){
 				        		
 				        		stars += "*";
 				        	}
 				    }
         			if(scope.isPasswordShow){
         				scope.allDatas[i].password = scope.allDatas[i].clientPassword;
         			}
         			scope.allDatas[i].clientPassword = stars;
         			// console.log(scope.allDatas[i].clientPassword);
         		}
 		    }
      };
      
      if(PermissionService.showMenu('SHOW_PASSWORD')){
    	  if(scope.config != null && scope.config.password == 'true'){
    		 scope.isPasswordShow = true;
    	  }
      }
      
      var fetchFunction = function(offset, limit, callback) {
        resourceFactory.clientResource.getAllClients({offset: offset, limit: limit} , function(data){
        	scope.totalClients = data.totalFilteredRecords;
        	scope.allDatas = data.pageItems;
        	if(scope.totalClients%15 == 0)	
        		scope.totalPages = scope.totalClients/15;
        	else
        		scope.totalPages = Math.floor(scope.totalClients/15)+1;
        	
        	if(scope.config.password == 'true'){
        		passwordSetToStar();
        	}
        	
        	callback(data);
        });
      };
      
      resourceFactory.runReportsResource.get({reportSource: 'ClientCounts',genericResultSet:false} , function(data) {
    	  for(var i in data){
    		  if(data[i].status == 'New')
    			  scope.newClients = data[i].counts;
    		  if(data[i].status == 'Active')
    			  scope.activeClients = data[i].counts;
    		  if(data[i].status == 'Inactive')
    			  scope.InActiveClients = data[i].counts;
    		  if(data[i].status == 'Pending')
    			  scope.PendingClients = data[i].counts;
    	  }
    	  /*scope.totalClients = scope.newClients+scope.activeClients
    	  					   +scope.InActiveClients+scope.PendingClients;
    	  if(scope.totalClients%15 == 0)
    		  scope.totalPages = scope.totalClients/15;
    	  else
    		  scope.totalPages = Math.floor(scope.totalClients/15)+1;*/
      });
       
      scope.nextPageNo = function(){
    	  if(scope.pageNo < scope.totalPages)
    	   scope.pageNo +=1;
      };
      
      scope.previousPageNo = function(){
    	  if(scope.pageNo >1)
    	  scope.pageNo -=1;
      };
      
      scope.lastPageNo = function(){
    	  scope.pageNo =scope.totalPages;
      };
      
      scope.firstPageNo = function(){
    	  scope.pageNo =1;
      };
      
      scope.routeTo = function(id){
          location.path('/viewclient/'+ id);
        };
        
    	scope.routeToGroup = function(name){
            location.path('/viewgroupdetails/'+ name);
       };
       
      if(PermissionService.showMenu('READ_CLIENT'))
    	  scope.clients = paginatorService.paginate(fetchFunction, 14);
      
      
      scope.search123 = function(offset, limit, callback) {
          resourceFactory.clientResource.getAllClients({offset: offset, limit: limit , sqlSearch: scope.filterText } , function(data){
        	  scope.allDatas = data.pageItems;
        	  if(scope.config.password == 'true'){
        		  passwordSetToStar();
 	          }
 	        	callback(data);
          }); 
      };
       
       scope.search = function(filterText) {
        scope.clients = paginatorService.paginate(scope.search123, 14);
       };
       
       /**
        * @ Changing status
        * */
       scope.searchSource=function(sourceStatus){
    	   /**
    	    * This function used for specific status
    	    * like New,Active... etc
    	    * */
    	   scope.searchSources123 = function(offset, limit, callback) {
    			   resourceFactory.clientResource.getAllClients({offset: offset, limit: limit,status: sourceStatus} , function(data){
       	        	scope.totalClients = data.totalFilteredRecords;
       	        	scope.allDatas = data.pageItems;
       	        	if(scope.totalClients%15 == 0)	
       	        		scope.totalPages = scope.totalClients/15;
       	        	else
       	        		scope.totalPages = Math.floor(scope.totalClients/15)+1;
       	        	
       	        	if(scope.config.password == 'true'){
       	        		passwordSetToStar();
       	        	}
       	        	callback(data);
       	        });
    	   };
    	   
    	   if(sourceStatus == 'ALL'){
			   scope.clients = paginatorService.paginate(fetchFunction, 14);
		   }else{
			   scope.clients = paginatorService.paginate(scope.searchSources123, 14);
		   }
    	   
       };
       
      /* scope.routeToCheckOnline = function(){
    	   resourceFactory.radiusOnlineUser.get({checkOnline:true},function(data) {
    		   scope.checkOnlineClient = data.onlineUsersdata;
    		   console.log(scope.checkOnlineClient[0]);
           });
       };*/
       
       scope.routeToCheckOnline=function(clientNameForOnlineUser){
    	   if(clientNameForOnlineUser == undefined){
    		   scope.clientNameForOnlineUser = '';
    	   }else{
    		   scope.clientNameForOnlineUser = clientNameForOnlineUser;
    	   }
    	   
    	   
       	$modal.open({
       		templateUrl: 'onlineuser.html',
       		controller: ApproveRegistrationListing,
       		resolve:{}
       	});
       };
       
       function ApproveRegistrationListing($scope, $modalInstance) {
    	   
    	   $scope.checkOnlineClient = {};
    	   $scope.tempData = [];
    	   $scope.name = scope.clientNameForOnlineUser;
    	   resourceFactory.radiusOnlineUser.get({checkOnline:true,userName:scope.clientNameForOnlineUser},function(data) {
    		   $scope.checkOnlineClient = data.onlineUsersdata;
    		 //  $scope.count = $scope.checkOnlineClient[0].count;
    		   console.log($scope.checkOnlineClient[0].count);
    		   $scope.onlineUserName = scope.clientNameForOnlineUser;
           });
    	  
    	  /* $scope.registrationListData.push({
    			   "name" : key,
    			   "value" :$scope.tempData[key].toString(),
    	   });*/
    	   
    	   $scope.approve = function (name, value) {
    		   scope.approveData = {};
    		   scope.clientConfigChange(name, value , 'onlineuser.html');
    		   $modalInstance.close('delete');
    	   };
    	   $scope.cancel = function () {
    		   $modalInstance.dismiss('cancel');
    	   };
       }
       
    }
  });
  mifosX.ng.application.controller('ClientController', ['$scope', 'ResourceFactory', 'PaginatorService','$location','PermissionService','webStorage','$modal',mifosX.controllers.ClientController]).run(function($log) {
    $log.info("ClientController initialized");
  });
}(mifosX.controllers || {}));
