(function(module) {
  mifosX.models = _.extend(module, {
	    url : "https://www.sandbox.paypal.com/cgi-bin/webscr?rm=2&cmd=_xclick&business",	  
	   mail : "lingala.ashokreddy@gmail.com",
	   
	 //for Adapter Changes
	   AdapterStartCommand : "sh /home/spicenet/obsadapter/adapter.sh start",
	   AdapterStopCommand : "sh /home/spicenet/obsadapter/adapter.sh stop",  
	   AdapterStatusCommand : "sh /home/spicenet/obsadapter/adapter.sh status",
	   AdapterLogFileCommand : "/home/spicenet/NetSpanLogFiles/PacketspanIntegratorerr.log",
	   AdapterLogFileDateFormat : "yyyy-MM-dd",
	   AdapterLogFileIntervelDays : 7,
	   
	   AdapterStatusStopedResponse : "Adapter is not running",
	   AdapterStatusStartingResponse   : "Adapter is running",
	   
	   AdapterStopedResponse : "Adapter stopped",
	   AdapterStartingResponse   : "Adapter started",
	   
	   AdapterProvSystem : "PacketSpan",
	   AdapterFileName : "adapter"
  });
}(mifosX.models || {}));
