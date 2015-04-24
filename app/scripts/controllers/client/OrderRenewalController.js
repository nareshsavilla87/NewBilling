
(function(module) {
    mifosX.controllers = _.extend(module, {
        OrderRenewalController: function(scope,routeParams,resourceFactory, location,dateFilter,$rootScope) {
            scope.subscriptiondatas = [];
            scope.clientId=routeParams.clientId;
            scope.formData=[];
            scope.start={};
            scope.start.date = new Date();
            scope.paymodes=[];
            
            resourceFactory.OrderrenewalResourceTemplate.get(function(data) {
                scope.subscriptiondatas = data.subscriptiondata;
                scope.formData=data;
                scope.paymodes=data.paymodes;
            });

    scope.submit = function() {
    	 this.formData.locale = $rootScope.locale.code;
         this.formData.dateFormat = "dd MMMM yyyy";
         var paymentDate = dateFilter(scope.start.date,'dd MMMM yyyy');
         this.formData.paymentDate= paymentDate;
         //this.formData.ispaymentEnable= this.formData.globalconfig;
       //  delete this.formData.globalconfig;
         delete this.formData.subscriptiondata;
         delete this.formData.flag;
         delete this.formData.paymodes;
         delete this.formData.price;
         
        resourceFactory.OrderrenewalResource.save({'orderId': routeParams.id},this.formData,function(data){
            location.path('/vieworder/'+data.resourceId+'/'+routeParams.clientId);
        });
    };
        }
    });
    mifosX.ng.application.controller('OrderRenewalController', ['$scope','$routeParams','ResourceFactory', '$location','dateFilter','$rootScope', mifosX.controllers.OrderRenewalController]).run(function($log) {
        $log.info("OrderRenewalController initialized");
    });
}(mifosX.controllers || {}));

