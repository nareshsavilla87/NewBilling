(function(module) {
  mifosX.controllers = _.extend(module, {
	  EditDiscountsController: function(scope, resourceFactory, location, routeParams,dateFilter,$rootScope) {
        
        scope.reportParameters = [];
        scope.discountTypeDatas = [];
        scope.statuses = [];
        scope.start = {};
        scope.date= {};
        resourceFactory.discountsResource.getDiscountDetails({discountId : routeParams.id, template : 'true'}, function(data) {
            scope.discountdetail = data;
            scope.discountTypeDatas = data.discounTypeData;
            scope.statuses = data.status;
            scope.formData =  data;
            var actDate = dateFilter(data.discountStartDate,'dd MMMM yyyy');
            scope.start.startDate = new Date(actDate);            		
            
        });
        
        scope.submit = function() {
        	this.formData.locale = $rootScope.locale.code;
            this.formData.dateFormat = "dd MMMM yyyy";
            this.formData.startDate = dateFilter(scope.start.startDate,'dd MMMM yyyy');
            //this.formData.discountType="Percentage";
            //this.formData.status="ACTIVE";
            
            var status = this.formData.discountstatus;
            
            this.formData.status=status;
            var discountType=this.formData.discounType;
            this.formData.discountType=discountType;
            //this.formData.status=discountdetail.discountstatus;
          //this.formData.reportParameters = scope.temp;
           
            delete this.formData.discountMasterId;
            delete this.formData.discountAmount;
            delete this.formData.discountedChargeAmount;
            delete this.formData.id;
            delete this.formData.discounTypeData;
            //delete this.formData.status;
            delete this.formData.discounType;
            delete this.formData.discountstatus;
            delete this.formData.discountStartDate;
          resourceFactory.discountsResource.update({discountId: routeParams.id}, this.formData,function(data){
            location.path('/viewdiscounts/'+data.resourceId);
          });
        };
    }
  });
  mifosX.ng.application.controller('EditDiscountsController', ['$scope', 'ResourceFactory', '$location', '$routeParams','dateFilter','$rootScope', mifosX.controllers.EditDiscountsController]).run(function($log) {
    $log.info("EditDiscountsController initialized");
  });
}(mifosX.controllers || {}));
