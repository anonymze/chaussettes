export default async function emailjs_api(inputs, captcha, e) {
    const data = {
        service_id: 'service_ix5xsdr',
        template_id: 'template_deha0dw',
        user_id: 'user_59NIFjRQHoYCNj0O4kKMz',
        template_params: {
            'name': inputs.firstname,
            'email': inputs.email,
            'message': inputs.message, 
            'g-recaptcha-response': captcha
        },
        accessToken: process.env.NEXT_PUBLIC_TOKEN_EMAILJS
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'mode': 'cors'
        },
    }).then((res) => {
        if (res.status === 200) {
            e.target.reset();
            return {
                status: "success",
                message: "Votre message est envoyé !"
            }
        }
        return {
            status: "error",
            message: "Une erreur est survenue, avez-vous bien rempli tous les champs ?"
        }
    }).catch(() => {
        return {
            status: "error",
            message: "Une erreur inattendue est survenue, veuillez réessayer ultérieurement"
        }
    })

    return response;
}