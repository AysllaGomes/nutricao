<?php

return [
   'driver' => env('MAIL_DRIVER', 'smtp'),
   'host' => env('MAIL_HOST', ''),
   'port' => env('MAIL_PORT', 25),
   'encryption' => env('MAIL_ENCRYPTION', 'tls'),
   'username' => env('MAIL_USERNAME'),
   'password' => env('MAIL_PASSWORD'),
   'sendmail' => '/usr/sbin/sendmail -bs',
];
