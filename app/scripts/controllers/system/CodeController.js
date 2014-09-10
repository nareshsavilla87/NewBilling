(function(module) {
    mifosX.controllers = _.extend(module, {
        CodeController: function(scope, resourceFactory,paginatorService,location,PermissionService) {
            scope.codes = [];
            scope.PermissionService = PermissionService;
            
            scope.codesFetchFunction = function(offset, limit, callback) {
   				resourceFactory.codeResources.getData({offset: offset, limit: limit} , callback);
   		   	};
   		   
           if(PermissionService.showMenu('READ_CODE')){
        	   resourceFactory.codeResources.getAllCodes(function(data){
        		   scope.codes = data.pageItems;
        		   
        	   });
        	   /**
        	    * This commented line used for pagination
        	    * If you need uncomment it
        	    * */
        	   /*scope.codes = paginatorService.paginate(scope.codesFetchFunction, 14);*/
           }
           
            scope.routeTo = function(id){
            	if(PermissionService.showMenu('READ_CODEVALUE'))
            		location.path('/viewcode/'+ id);
              };
       }
     });
    mifosX.ng.application.controller('CodeController', ['$scope', 'ResourceFactory','PaginatorService','$location','PermissionService', mifosX.controllers.CodeController]).run(function($log) {
        $log.info("CodeController initialized");
    });
}(mifosX.controllers || {}));
