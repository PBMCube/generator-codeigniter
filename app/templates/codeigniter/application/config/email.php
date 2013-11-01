<?php

//$config["useragent"]        =                             //Default: CodeIgniter              Options: None                           The "user agent".
$config["protocol"]         = "smtp";                       //Default: mail                     Options: mail, sendmail, or smtp        The mail sending protocol.
//$config["mailpath"]         =                             //Default: /usr/sbin/sendmail       Options: None                           The server path to Sendmail.
$config["smtp_host"]        = "ssl://";       				//Default: No Default               Options: None                           SMTP Server Address.
$config["smtp_user"]        = "";      						//Default: No Default               Options: None                           SMTP Username.
$config["smtp_pass"]        = "";                  			//Default: No Default               Options: None                           SMTP Password.
$config["smtp_port"]        = 465;                          //Default: 25                       Options: None                           SMTP Port.
//$config["smtp_timeout"]     =                             //Default: 5                        Options: None                           SMTP Timeout (in seconds).
//$config["wordwrap"]         =                             //Default: TRUE                     Options: TRUE or FALSE (boolean)        Enable word-wrap.
//$config["wrapchars"]        =                             //Default: 76                                                               Character count to wrap at.
$config["mailtype"]         = "html";                       //Default: text                     Options: text or html                   Type of mail.
$config["charset"]          = "utf-8";                      //Default: utf-8                                                            Character set (utf-8, iso-8859-1, etc.).
//$config["validate"]         =                             //Default: FALSE                    Options: TRUE or FALSE (boolean)        Whether to validate the email address.
//$config["priority"]         =                             //Default: 3                        Options: 1, 2, 3, 4, 5                  Email Priority. 1 = highest. 5 = lowest. 3 = normal.
//$config["crlf"]             =                             //Default: \n                       Options: "\r\n" or "\n" or "\r"         Newline character. (Use "\r\n" to comply with RFC 822).
$config["newline"]          = "\r\n";                       //Default: \n                       Options: "\r\n" or "\n" or "\r"         Newline character. (Use "\r\n" to comply with RFC 822).
//$config["bcc_batch_mode"]   =                             //Default: FALSE                    Options: TRUE or FALSE (boolean)        Enable BCC Batch Mode.
//$config["bcc_batch_size"]   =                             //Default: 200                      Options: None                           Number of emails in each BCC batch.

?>
