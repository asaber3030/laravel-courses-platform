<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Password Reset Code</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      color: #333;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .header {
      text-align: center;
      background-color: #007bff;
      color: #fff;
      padding: 20px;
      border-radius: 8px;
    }

    .header h1 {
      margin: 0;
    }

    .content {
      padding: 20px;
    }

    .reset-code {
      font-size: 24px;
      font-weight: bold;
      color: #007bff;
      text-align: center;
      margin: 20px 0;
    }

    .footer {
      text-align: center;
      font-size: 14px;
      color: #999;
      margin-top: 30px;
    }

    .footer a {
      color: #007bff;
      text-decoration: none;
    }

    .footer p {
      margin: 5px 0;
    }
  </style>
</head>

<body>
  <div class="container">
    <div class="header">
      <h1>Password Reset Request</h1>
    </div>

    <div class="content">
      <p>Hello</p>
      <p>You requested a password reset for your account. To reset your password, please use the following code:</p>

      <div class="reset-code">
        {{ $code }}
      </div>

      <p>If you didn't request this, please ignore this email. Your password will not be changed.</p>

      <p>For any assistance, please contact our support team at <a
          href="mailto:abdulrahmansaber120@gmail.com">abdulrahmansaber120@gmail.com</a>.</p>
    </div>

    <div class="footer">
      <p>Thank you for using our service!</p>
      <p>&copy; {{ date('Y') }} ASaber. All rights reserved.</p>
      <p>Visit our <a href="https://asaber.vercel.app">Website</a> for more information.</p>
    </div>
  </div>
</body>

</html>
