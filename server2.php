<?php
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$fileData = base64_decode($img);
//saving
$directory='./quotes/photo';
$number=(string)rand();
$ext='.png';
$fileName = $directory.$number.$ext;
file_put_contents($fileName, $fileData);
echo "http://z9111854.beget.tech/$fileName";
?>