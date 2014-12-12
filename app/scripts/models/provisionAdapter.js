(function(module) {
  mifosX.models = _.extend(module, {
	  
	 //for Adapter Changes
	   AdapterStartCommand : "sh /home/ashokreddy/Desktop/BeeniusAdapter/adapter.sh start",
	   AdapterStopCommand : "sh /home/ashokreddy/Desktop/BeeniusAdapter/adapter.sh stop",  
	   AdapterStatusCommand : "sh /home/ashokreddy/Desktop/BeeniusAdapter/adapter.sh status",
	   AdapterLogFileCommand : "/home/ashokreddy/Desktop/BeeniusLogFiles/logs/BeeniusIntegrator.log",
	   AdapterLogFileDateFormat : "yyyy-MM-dd",
	   AdapterLogFileIntervelDays : 7,
	   
	   AdapterStatusStopedResponse : "Adapter is not running",
	   AdapterStatusStartingResponse   : "Adapter is running",
	   
	   AdapterStopedResponse : "Adapter stopped",
	   AdapterStartingResponse   : "Adapter started",
	   
	   AdapterProvSystem : "Beenius",
	   AdapterFileName : "adapter"
  });
}(mifosX.models || {}));
