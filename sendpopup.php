<?php

require_once __DIR__ . '/vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;

$message = '';
if (isset($_POST["submit"])) {

  $path = 'upload/' . $_FILES['attachment']['name'];
  // перемещаем загруженный файл
  move_uploaded_file($_FILES['attachment']['tmp_name'], $path);

  // формируем шаблон
  $message = '<h3 align="center">Заявка стать поставщиком</h3>
		<table border="1" width="100%" cellpadding="5" cellspacing="5">
		<tr>
				<td width="30%">Имя</td>
				<td width="70%">'. $_POST["name"] .'</td>
			</tr>
			<tr>
				<td width="30%">Телефон</td>
				<td width="70%">'. $_POST["phone"] .'</td>
			</tr>
			<tr>
				<td width="30%">Email</td>
				<td width="70%">'. $_POST["email"] .'</td>
			</tr>
			<tr>
				<td width="30%">Отправление</td>
				<td width="70%">'. $_POST["departure"] .'</td>
			</tr>
			<tr>
				<td width="30%">Назначение</td>
				<td width="70%">'. $_POST["destination"] .'</td>
			</tr>
			<tr>
				<td width="30%">Объем</td>
				<td width="70%">'. $_POST["amount"] .'</td>
			</tr>
			<tr>
				<td width="30%">Комментарий</td>
				<td width="70%">'. $_POST["comment"] .'</td>
			</tr>
		</table>';


  $mail = new PHPMailer();

  //$mail->isSMTP();

  //$mail->Host = 'smtp.gmail.com';

  //$mail->SMTPAuth = true;

  //$mail->Username = "***";
  //$mail->Password = "***";

  //$mail->SMTPSecure = 'ssl';

  //$mail->Port = '465';

// от кого отправляем
  $mail->From = $_POST['email'];
// имя кто отправляет
  $mail->FromName  = $_POST['user'];

// кому отправляем
  $mail->addAddress('sergey_bobkov@inbox.ru', 'Сергей');
  //$mail->addAddress('mister-shcustrik@yandex.ru');

// копия
  //$mail->addCC('info@sitesdevelopment.ru');

// скрытая копия
  //$mail->addBCC('info@sitesdevelopment.ru');

// письмо в формате html
  $mail->isHTML(true);
  $mail->CharSet = 'UTF-8';

// тема письма
  $mail->Subject = 'ЗАЯВКА С САЙТА НА ПЕРЕВОЗКУ';




  // прикрепленный файл
  $mail->addAttachment($path);

  // тело письма
  $mail->Body = $message;

  // если сообщение отправлено
  if ($mail->send()) {
    echo $message = '<div class="alert alert-success">Сообщение успешно отправлено</div>';
    // удаляем файл
    if (!empty($_FILES['attachment']['name'])) {
      unlink($path);
    }

  } else {
    echo $message = '<div class="alert alert-danger">Что то пошло не так</div>';
  }

}