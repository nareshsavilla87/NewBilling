(function(module) {
  mifosX.models = _.extend(module, {
	    url : "https://www.sandbox.paypal.com/cgi-bin/webscr?rm=2&cmd=_xclick&business",	  
	   mail : "lingala.ashokreddy@gmail.com",
	   
	 //for Adapter Changes
	   AdapterStartCommand : "sh /home/rakesh/BeeniusLogFiles_and_adapter/BeeniusAdapter/Beeniusadapter.sh start",
	   AdapterStopCommand : "sh /home/rakesh/BeeniusLogFiles_and_adapter/BeeniusAdapter/Beeniusadapter.sh stop",
	   AdapterStatusCommand : "sh /home/rakesh/BeeniusLogFiles_and_adapter/BeeniusAdapter/Beeniusadapter.sh status",
	   AdapterLogFileCommand : "/home/rakesh/BeeniusLogFiles_and_adapter/BeeniusLogFiles/logs/BeeniusIntegrator.log",
	   AdapterLogFileDateFormat : "yyyy-MM-dd",
	   AdapterLogFileIntervelDays : 7,
	   
	   AdapterStatusStopedResponse : "Adapter is not running",
	   AdapterStatusStartingResponse   : "Adapter is running",
	   
	   AdapterStopedResponse : "Adapter stopped",
	   AdapterStartingResponse   : "Adapter started",
	   
	   AdapterProvSystem : "Beenius",
	   AdapterFileName : "BeeniusIntegrator"
  });
}(mifosX.models || {}));
