<?php
  $response = array();
  $config = include('../config.php');

if(isset($_POST['email']) && isset($_POST['name'])) {

    require 'phpMailer/PHPMailerAutoload.php';

    $mail = new PHPMailer;
    $mail->Host = $config['MAILER_HOST'];
    $mail->Port = $config['MAILER_PORT'];
    $mail->SMTPAuth = true;
    $mail->SMTPSecure = 'ssl';
    $mail->Username = $config['MAILER_USERNAME'];
    $mail->Password = $config['MAILER_PASS'];
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($_POST['email'], $_POST['name'], 0);
    $mail->addAddress($config['MAILER_DEST_ADDRESS']);
    $mail->addReplyTo($_POST['email'], $_POST['name']);

    $mail->isHTML(true);
    $mail->Subject = $_POST['name'].' ('.$_POST['email'].')';
    $mail->Body=nl2br($_POST['text']);

    if(!$mail->send()) {
        http_response_code(400);
        echo 'Error: ' . $mail->ErrorInfo;
    } else {
        http_response_code(200);
        echo 'Success!';
    }
}
?>