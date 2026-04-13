import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка письма с формы обратной связи на support@dkuban.ru"""
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body", "{}"))
        name = body.get("name", "")
        surname = body.get("surname", "")
        phone = body.get("phone", "")
        email = body.get("email", "")
        topic = body.get("topic", "")
        comment = body.get("comment", "")

        smtp_host = os.environ["SMTP_HOST"]
        smtp_port = int(os.environ["SMTP_PORT"])
        smtp_user = os.environ["SMTP_USER"]
        smtp_password = os.environ["SMTP_PASSWORD"]

        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"Обращение с сайта: {topic}"
        msg["From"] = smtp_user
        msg["To"] = "support@dkuban.ru"
        msg["Reply-To"] = email

        text_body = (
            f"Имя: {name} {surname}\n"
            f"Телефон: {phone}\n"
            f"Email: {email}\n"
            f"Тема: {topic}\n\n"
            f"Комментарий:\n{comment}"
        )
        html_body = f"""
        <html><body style="font-family: Arial, sans-serif; color: #333;">
          <h2 style="color: #7C3AED;">Новое обращение с сайта «Моя Кубань»</h2>
          <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
            <tr><td style="font-weight:bold;">Имя:</td><td>{name} {surname}</td></tr>
            <tr><td style="font-weight:bold;">Телефон:</td><td>{phone}</td></tr>
            <tr><td style="font-weight:bold;">Email:</td><td>{email}</td></tr>
            <tr><td style="font-weight:bold;">Тема:</td><td>{topic}</td></tr>
          </table>
          <h3>Комментарий:</h3>
          <p style="background:#f5f5f5;padding:12px;border-radius:8px;">{comment}</p>
        </body></html>
        """

        msg.attach(MIMEText(text_body, "plain", "utf-8"))
        msg.attach(MIMEText(html_body, "html", "utf-8"))

        if smtp_port == 465:
            with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
                server.login(smtp_user, smtp_password)
                server.sendmail(smtp_user, "support@dkuban.ru", msg.as_string())
        else:
            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_password)
                server.sendmail(smtp_user, "support@dkuban.ru", msg.as_string())

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps({"success": True}),
        }
    except KeyError as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"success": False, "error": f"Не настроен секрет: {str(e)}"}),
        }
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"success": False, "error": str(e)}),
        }
