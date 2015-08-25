(function(module) {
  mifosX.controllers = _.extend(module, {

    ViewReportsController: function(scope, routeParams, resourceFactory, location) {
      scope.reports = [];
      scope.type = routeParams.type;
      scope.routeToviewreport = function(name,id,type){
    	  
          location.url('/run_report/'+name+'?reportId='+id+'&type='+type);
        };

      //to display type of report on breadcrumb
      var typeReport = routeParams.type.replace(routeParams.type[0], routeParams.type[0].toUpperCase()) + " " + "Reports";
      scope.type = typeReport;

      if (routeParams.type == 'all') {
        resourceFactory.runReportsResource.get({reportSource: 'FullReportList', parameterType : true, genericResultSet : false}, function(data){
          scope.reports = scope.getReports(data);
        });
      } else if (routeParams.type == 'clients') {
        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Client', parameterType : true, genericResultSet : false}, function(data){
          scope.reports = scope.getReports(data);
        });
      } else if (routeParams.type == 'Orders') {
        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Orders', parameterType : true, genericResultSet : false}, function(data){
          scope.reports = scope.getReports(data);
        });
      } else if (routeParams.type == 'tickets') {

          resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Tickets', parameterType : true, genericResultSet : false}, function(data){
              scope.reports = scope.getReports(data);
            });
      }
      else if (routeParams.type == 'inventory') {

          resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Inventory', parameterType : true, genericResultSet : false}, function(data){
              scope.reports = scope.getReports(data);
            });
       }
      else if (routeParams.type == 'leads') {

          resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Leads', parameterType : true, genericResultSet : false}, function(data){
              scope.reports = scope.getReports(data);
            });
      }else if (routeParams.type == 'invoice&collections') {

        resourceFactory.runReportsResource.get({reportSource: 'reportCategoryList', R_reportCategory:'Invoice&Collections', parameterType : true, genericResultSet : false}, function(data){
          scope.reports = scope.getReports(data);
        });
      }

      // Remove the duplicate entries from the array. The reports api returns same report multiple times if it have more than one parameter.
      scope.getReports = function(data){
        var prevId = -1;
        var currId;
        var reports = [];
        for (var i = 0; i < data.length; i++) {
          currId = data[i].report_id;
          if (currId != prevId) {
            reports.push(data[i]);
          };
          prevId = currId;
        }
        return reports;
      };


    }
  });
  mifosX.ng.application.controller('ViewReportsController', ['$scope', '$routeParams', 'ResourceFactory', '$location', mifosX.controllers.ViewReportsController]).run(function($log) {
    $log.info("ViewReportsController initialized");
  });
}(mifosX.controllers || {}));
