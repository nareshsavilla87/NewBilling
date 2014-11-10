(function(module) {
  mifosX.controllers = _.extend(module, {
	  MessageController: function(scope, resourceFactory,location,PermissionService,$modal,route) {
	        scope.message = [];
	        scope.PermissionService = PermissionService;
	        resourceFactory.messageSaveResource.query(function(data) {
	            scope.message = data;
	        });
	        scope.routeTo = function(id){
	            location.path('/viewmessage/'+ id);
	          };
	          
	          /**
	          * Delete message template 
	         * */
	        scope.deletemessage = function (id){
	          	scope.msgId=id;
	           	 $modal.open({
	   	                templateUrl: 'messagetemplate.html',
	   	                controller: messagetemplate,
	   	                resolve:{}
	   	        });
	           };
	           
	       	function  messagetemplate($scope, $modalInstance) {
	       		$scope.messagetemplate = function () {
	       			resourceFactory.messageSaveResource.remove({messageId: scope.msgId} , {} , function() {
	                   route.reload();     
	               });
	               	 $modalInstance.dismiss('delete');
	            };
	             $scope.cancel = function () {
	                   $modalInstance.dismiss('cancel');
	             };
	           }        
	    }
  });
  mifosX.ng.application.controller('MessageController', [
    '$scope', 
    'ResourceFactory',
    '$location',
    'PermissionService',
    '$modal',
    '$route',
    mifosX.controllers.MessageController]).run(function($log) {
    $log.info("MessageController initialized");
  });
}(mifosX.controllers || {}));