import os
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправляет письмо с данными из формы обратной связи на my.kuban@message.krasnodar.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')

    name = body.get('name', '')
    surname = body.get('surname', '')
    phone = body.get('phone', '')
    email = body.get('email', '')
    topic = body.get('topic', '')
    comment = body.get('comment', '')

    smtp_host = os.environ['SMTP_HOST']
    smtp_port = int(os.environ['SMTP_PORT'])
    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']
    recipient = 'my.kuban@message.krasnodar.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Обращение: {topic}'
    msg['From'] = smtp_user
    msg['To'] = recipient
    msg['Reply-To'] = email

    text_body = f"""Новое обращение с сайта Моя Кубань

Имя: {name}
Фамилия: {surname}
Телефон: {phone}
Email: {email}
Тема: {topic}

Комментарий:
{comment}
"""

    html_body = f"""
<html><body>
<h2>Новое обращение с сайта Моя Кубань</h2>
<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
  <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">Имя</td><td style="padding:6px 12px;">{name}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">Фамилия</td><td style="padding:6px 12px;">{surname}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">Телефон</td><td style="padding:6px 12px;">{phone}</td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">Email</td><td style="padding:6px 12px;"><a href="mailto:{email}">{email}</a></td></tr>
  <tr><td style="padding:6px 12px;font-weight:bold;color:#555;">Тема</td><td style="padding:6px 12px;">{topic}</td></tr>
</table>
<h3 style="margin-top:16px;color:#333;">Комментарий:</h3>
<p style="font-family:Arial,sans-serif;font-size:14px;color:#333;">{comment.replace(chr(10), '<br>')}</p>
</body></html>
"""

    msg.attach(MIMEText(text_body, 'plain', 'utf-8'))
    msg.attach(MIMEText(html_body, 'html', 'utf-8'))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, recipient, msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }
