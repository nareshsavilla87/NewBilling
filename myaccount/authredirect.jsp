<%
String clientId = request.getParameter("x_cust_id");
String cardNo = request.getParameter("x_account_number");
String amount = request.getParameter("x_amount");
String emailId = request.getParameter("x_email");
String transId = request.getParameter("x_trans_id");
String cardtype = request.getParameter("x_card_type");
String name = request.getParameter("x_first_name");
String customUrl = request.getParameter("custom");


System.out.println("*******clientId--------------->"+clientId);
System.out.println("*******cardno--------------->"+cardNo);
System.out.println("*******amount--------------->"+amount);
System.out.println("*******emailId--------------->"+emailId);
System.out.println("*******transId--------------->"+transId);
System.out.println("*******cardtype--------------->"+cardtype);
System.out.println("*******customUrl--------------->"+customUrl);

 String selfcareAppURL = customUrl+"#/authorizenetredirection?clientId="+clientId+"&cardno="+cardNo+"&amount="+amount+"&emailId="+emailId+"&transId="+transId+"&cardtype="+cardtype+"&name="+name;
	 response.sendRedirect(selfcareAppURL); 
 
 %>
