(function(module) {
  mifosX.controllers = _.extend(module, {
    UserListController: function(scope,route,resourceFactory,location,$modal,PermissionService) {
        scope.users = [];
        scope.PermissionService=PermissionService;
        	resourceFactory.userListResource.getAllUsers(function(data) {
        		scope.users = data;
        	});
        	
        	 scope.open = function (userId) {
        		 scope.userId=userId;
                 $modal.open({
                     templateUrl: 'password.html',
                     controller: ModalInstanceCtrl
                 });
             };
             scope.deleteuser = function (userId){
            	 scope.userId=userId;
                 $modal.open({
                     templateUrl: 'deleteuser.html',
                     controller: UserDeleteCtrl
                 });
             };
             
             var ModalInstanceCtrl = function ($scope, $modalInstance) {
                 $scope.save = function (staffId) {
                     resourceFactory.userListResource.update({'userId': scope.userId},this.formData,function(data){
                         route.reload();
                     });
                     $modalInstance.close('activate');
                 };
                 $scope.cancel = function () {
                     $modalInstance.dismiss('cancel');
                 };
             };

             var UserDeleteCtrl = function ($scope, $modalInstance) {
                 $scope.delete = function () {
                     resourceFactory.userListResource.delete({userId:scope.userId} , {} , function(data) {
                         location.path('/users');
                         // added dummy request param because Content-Type header gets removed
                         // if the request does not contain any data (a request body)
                     });
                     $modalInstance.close('delete');
                 };
                 $scope.cancel = function () {
                     $modalInstance.dismiss('cancel');
                 };
             };
    
        scope.routeTo = function(id){
        	location.path('/viewuser/'+ id);
          };
        
    }
  
  });
  mifosX.ng.application.controller('UserListController', ['$scope', '$route','ResourceFactory','$location','$modal','PermissionService', mifosX.controllers.UserListController]).run(function($log) {
    $log.info("UserListController initialized");
  });
}(mifosX.controllers || {}));
