(function(module) {
  mifosX.controllers = _.extend(module, {
	  ImportController: function(scope, resourceFactory,paginatorService,route,API_VERSION,$rootScope,PermissionService) {
        scope.imports = [];
        scope.PermissionService = PermissionService;
        
       /* var getAllFiles = function(){
        	if(PermissionService.showMenu('READ_UPLOADSTATUS'))
        		resourceFactory.importResource.getAllimportfiles(function(data) {
        			scope.imports= data;
        		});
        };*/
        
        scope.importFetchFunction = function(offset, limit, callback) {
			resourceFactory.importResource.getdata({offset: offset, limit: limit} , callback);
		};
		if(PermissionService.showMenu('READ_UPLOADSTATUS'))
		scope.imports = paginatorService.paginate(scope.importFetchFunction, 14);
        
       // getAllFiles();
       
        
        scope.getProcessStatus = function(impprocess){
        	if(impprocess == 'NEW')
        		return true;
        	else
        		return false;
        };
        scope.getLogStatus = function(impprocess){
        	if(impprocess != 'NEW' && impprocess != 'Running...')
        		return true;
        	else
        		return false;
        };
        
        scope.processFile = function (id){    	                   
                resourceFactory.importProcessResource.update({uploadfileId: id} , {} , function(data) {
              	  route.reload();
                },function(errorData){
                	route.reload();
                });
                route.reload();     
        }; 
        
        
        scope.downloadFile = function (id){ 
            	 window.open($rootScope.hostUrl+ API_VERSION +'/datauploads/print/'+id+'?tenantIdentifier=default');
        };
             
        scope.logFile = function (id){ 
        		window.open($rootScope.hostUrl+ API_VERSION +'/datauploads/printlog/'+id+'?tenantIdentifier=default');
        };
    }
  });
  mifosX.ng.application.controller('ImportController', ['$scope', 'ResourceFactory','PaginatorService','$route','API_VERSION','$rootScope','PermissionService', mifosX.controllers.ImportController]).run(function($log) {
    $log.info("ImportController initialized");
  });
}(mifosX.controllers || {}));
