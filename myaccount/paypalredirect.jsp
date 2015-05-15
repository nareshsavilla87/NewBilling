
<%
String txnId = request.getParameter("txn_id");
String paymentDate = request.getParameter("payment_date");
String amount = request.getParameter("mc_gross");
String name = request.getParameter("address_name");
String payerEmail = request.getParameter("payer_email");
String currency = request.getParameter("mc_currency");
String receiverEmail = request.getParameter("receiver_email");
String payerStatus = request.getParameter("payer_status");
String paymentStatus = request.getParameter("payment_status");
String pendingReason = request.getParameter("pending_reason");
String customData = request.getParameter("custom");

System.out.println("*******txnId--------------->"+txnId);
System.out.println("*******paymentDate------------>"+paymentDate);
System.out.println("*******amount------------>"+amount);
System.out.println("*******name------------>"+name);
System.out.println("*******payerEmail----------->"+payerEmail);
System.out.println("*******customData----------->"+customData); 
System.out.println("*******currency-------------->"+currency);
System.out.println("*******receiverEmail-------------->"+receiverEmail);
System.out.println("*******payerStatus-------------->"+payerStatus);
System.out.println("*******paymentStatus-------------->"+paymentStatus);
System.out.println("*******pendingReason-------------->"+pendingReason);



 String selfcareAppURL = customData+"#/paypalredirection?txnId="+txnId+"&payDate="+paymentDate+"&amnt="+amount+"&name="+name+"&pyrEmail="+payerEmail+"&currency="+currency+"&recvEmail="+receiverEmail+"&pyrStatus="+payerStatus+"&payStatus="+paymentStatus+"&pendingReason="+pendingReason;
	 response.sendRedirect(selfcareAppURL); 
%>
