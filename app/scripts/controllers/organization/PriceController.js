(function(module) {
  mifosX.controllers = _.extend(module, {
	  PriceController: function(scope,routeParams, resourceFactory,location,route) {
        scope.prices = [];
        scope.planId=routeParams.id;
        
        scope.routeTo = function(priceId,planId){
            location.path('/viewprice/'+priceId+"/"+planId);
         };
         
        resourceFactory.priceResource.get({planId: routeParams.id, template: 'true'} , function(data) {
            scope.prices= data.serviceData;
        });
        
        scope.deletePrice = function (priceid,planid){
            resourceFactory.deletePriceResource.delete({priceId: priceid} , {} , function(data) {
                  location.path('/prices/'+planid);
                  route.reload();
                  // added dummy request param because Content-Type header gets removed 
                  // if the request does not contain any data (a request body)        
            });
       };
    }
  });
  mifosX.ng.application.controller('PriceController', ['$scope', '$routeParams','ResourceFactory', '$location','$route', mifosX.controllers.PriceController]).run(function($log) {
    $log.info("PriceController initialized");
  });
}(mifosX.controllers || {}));
