<?php
$request = file_get_contents("http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en");
$decoded_request = json_decode($request);
echo $decoded_request->quoteText;
?>