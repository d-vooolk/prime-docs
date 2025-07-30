export async function sendSMS(phone, message, notificationFunc) {
    try {
        const response = await fetch('https://sms.prime-auto.by/api/sms/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                phone: phone,
                message: message,
            })
        });

        if (!response.ok) {
            notificationFunc(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Успешно отправлено:', data);
        notificationFunc('Успешно отправлено');
        return data;

    } catch (error) {
        notificationFunc('Ошибка при отправке', error);
        console.error('Ошибка при отправке:', error);
        return { success: false, error: error.message };
    }
}