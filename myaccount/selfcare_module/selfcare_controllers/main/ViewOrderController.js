(function(selfcare_module) {
  selfcare.controllers = _.extend(selfcare_module, {
	  ViewOrderController: function(scope,RequestSender,location,routeParams,$modal,dateFilter,route) {
		  scope.orderData = {};
		  scope.orderId = routeParams.orderId;
		  scope.clientId = routeParams.clientId;
		  
		  
		  RequestSender.getSingleOrderResource.get({orderId: routeParams.orderId},function(data){
			  scope.orderData=data.orderData;
			  if(data.orderData.isPrepaid == 'Y'){
	            	scope.orderData.isPrepaid="Pre Paid";
	            }else{
	            	scope.orderData.isPrepaid="Post Paid";
	            }
		  });
		  
		 var OrderDisconnectPopupController = function ($scope, $modalInstance) {
              
			  $scope.flagOrderDisconnect=false;
        	  $scope.disconnectDetails = [{'id':1,'mCodeValue':'Not Interested'},
        	                              {'id':2,'mCodeValue':'Plan Change'},
							        	  {'id':3,'mCodeValue':'Wrong plan'}];
        	  $scope.start = {};
        	  $scope.start.date = new Date();
        	  $scope.formData = {};
        	  
        	  /*RequestSender.OrderDisconnectResource.get(function(data) {
                  $scope.disconnectDetails = data.disconnectDetails;
              });*/
        	  
        	  $scope.approveDisconnection = function () {
        		  $scope.flagOrderDisconnect=true;
        		  
        		  var reqDate = dateFilter($scope.start.date,'dd MMMM yyyy');
        	        $scope.formData.dateFormat = 'dd MMMM yyyy';
        	        $scope.formData.disconnectionDate = reqDate;
        	        $scope.formData.locale = "en";
        		  
        	        RequestSender.bookOrderResource.update({'orderId': scope.orderDataId},$scope.formData,function(data){
        	        	$modalInstance.close('delete');
        	        	route.reload();
        			    console.log(data.resourceId);
        	        },function(orderErrorData){
        	        	 $scope.flagOrderDisconnect=false;
        	        	$scope.orderError = orderErrorData.data.errors[0].userMessageGlobalisationCode;
        	        });
        		  
              };
              $scope.cancelDisconnection = function () {
                  $modalInstance.dismiss('cancel');
              };
              
              
          };
          
          /*var ApproveReconnectPopupController = function ($scope, $modalInstance) {
        	  $scope.flagApproveReconnect=false;
        	  $scope.formData = {};
        	  
              $scope.approveReconnect = function () {

              	$scope.flagApproveReconnect=true;
              	RequestSender.OrderreconnectResource.update({orderId: routeParams.orderId} ,$scope.formData,function(data) {              	
              		$modalInstance.close('delete');
    	        	route.reload();
                  },function(errData){
  	        		$scope.flagApproveReconnect = false;
  		          });
              	
              };
              $scope.cancelReconnect = function () {
                  $modalInstance.dismiss('cancel');
              };
          };*/
		  
		  scope.orderDisconnect = function(orderId){
			  scope.orderDataId = orderId;
			  scope.errorStatus=[];scope.errorDetails=[];
        	  $modal.open({
                  templateUrl: 'OrderDisconnect.html',
                  controller: OrderDisconnectPopupController,
                  resolve:{}
              });
          };
          
          /*scope.reconnect = function (){
          	scope.errorStatus=[];scope.errorDetails=[];
          	 $modal.open({
                   templateUrl: 'ApproveReconnect.html',
                   controller: ApproveReconnectPopupController,
                   resolve:{}
               });
            };*/
    }
  });
  selfcare.ng.application.controller('ViewOrderController', ['$scope','RequestSender','$location','$routeParams','$modal','dateFilter','$route', selfcare.controllers.ViewOrderController]);
}(selfcare.controllers || {}));
