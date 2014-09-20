(function(module) {
  mifosX.models = _.extend(module, {
	    url : "https://www.sandbox.paypal.com/cgi-bin/webscr?rm=2&cmd=_xclick&business",	  
	   mail : "lingala.ashokreddy@gmail.com",
	   
	   //for Adapter Changes
	   AdapterStartCommand : "sh /home/rakesh/BeeniusAdapter/Beeniusadapter.sh start",
	   AdapterStopCommand : "sh /home/rakesh/BeeniusAdapter/Beeniusadapter.sh stop",
	   AdapterStatusCommand : "sh /home/rakesh/BeeniusAdapter/Beeniusadapter.sh status",
	   AdapterLogFileCommand : "BeeniusLogFiles/logs/BeeniusIntegrator.log",
	   AdapterLogFileDateFormat : "yyyy-MM-dd",
	   AdapterLogFileIntervelDays : 7
  });
}(mifosX.models || {}));
