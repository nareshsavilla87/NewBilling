(function(module) {
  mifosX.controllers = _.extend(module, {
    MakeDataTableEntryController: function(scope, location, routeParams, resourceFactory,$rootScope,webStorage) {
      scope.tableName = routeParams.tableName;
      scope.entityId = routeParams.entityId;
      scope.columnHeaders = [];
      scope.formData = {};
      
      var clientData = webStorage.get('clientData');
	  scope.hwSerialNumber=clientData.hwSerialNumber;
      scope.displayName=clientData.displayName;
      scope.statusActive=clientData.statusActive;
      scope.accountNo=clientData.accountNo;
      scope.officeName=clientData.officeName;
      scope.balanceAmount=clientData.balanceAmount;
      scope.currency=clientData.currency;
      scope.imagePresent=clientData.imagePresent;
      scope.categoryType=clientData.categoryType;
      scope.email=clientData.email;
      scope.phone=clientData.phone;
      scope.clientId=routeParams.entityId;
      scope.walletConfig = webStorage.get('is-wallet-enable');
     // console.log( scope.clientId);

      resourceFactory.DataTablesResource.getTableDetails({ datatablename:scope.tableName, entityId:scope.entityId, genericResultSet:'true' },function(data) {

        var colName = data.columnHeaders[0].columnName;
        if(colName == 'id') { data.columnHeaders.splice(0,1); }

        colName = data.columnHeaders[0].columnName;
        if(colName == 'client_id' || colName == 'office_id' || colName == 'group_id') {
          data.columnHeaders.splice(0,1);
          scope.isCenter = colName ==  'center_id' ? true : false;
        }
        scope.columnHeaders = data.columnHeaders;
      });
      
      //return input type
      scope.fieldType = function (type) {
          var fieldType = "";
          if (type) {
              if (type == 'STRING' || type == 'INTEGER' || type == 'TEXT' || type == 'DECIMAL') {
                  fieldType = 'TEXT';
              } else if (type == 'CODELOOKUP' || type == 'CODEVALUE') {
                  fieldType = 'SELECT';
              } else if (type == 'DATE') {
                  fieldType = 'DATE';
              }
          }
          return fieldType;
      };
      
      scope.submit = function () {
        var params = {datatablename:scope.tableName, entityId:scope.entityId, genericResultSet: 'true'};
        this.formData.locale = $rootScope.locale.code;
        this.formData.dateFormat =  'dd MMMM yyyy';
        
      //below logic, for the input field if data is not entered, this logic will put "", because
        //if no data entered in input field , that field name won't send to server side.
        //console.log(scope.columnHeaders.length);
        for (var i = 0; i < scope.columnHeaders.length; i++) {
            if (!_.contains(_.keys(this.formData), scope.columnHeaders[i].columnName)) {
                this.formData[scope.columnHeaders[i].columnName] = "";
            }
            if (scope.columnHeaders[i].columnDisplayType == 'DATE') {
                this.formData[scope.columnHeaders[i].columnName] = dateFilter(this.formDat[scope.columnHeaders[i].columnName], 'dd MMMM YYYY');
            }
           //console.log(scope.columnHeaders[i].columnDisplayType);
            
        }
        
        resourceFactory.DataTablesResource.save(params, this.formData, function(data){
          var destination = "";
          if ( data.clientId) {
            destination = '/viewclient/'+data.clientId;
          } else if ( data.groupId) {
              if (scope.isCenter) {
                  destination = '/viewcenter/'+data.groupId;
              } else {
                  destination = '/viewgroup/'+data.groupId;
              }
          } else if ( data.officeId) {
            destination = '/viewoffice/'+data.officeId;
          }
          location.path(destination);
        });
      };
      
      
      scope.cancel=function(){
    	  location.path('/viewclient/'+ scope.entityId); 
      };

    }
  });
  mifosX.ng.application.controller('MakeDataTableEntryController', [
    '$scope', 
    '$location', 
    '$routeParams', 
    'ResourceFactory',
    '$rootScope',
    'webStorage', mifosX.controllers.MakeDataTableEntryController
    ]).run(function($log) {
    $log.info("MakeDataTableEntryController initialized");
  });
}(mifosX.controllers || {}));
