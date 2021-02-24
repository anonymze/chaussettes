import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from "react-google-recaptcha"
import Header from '../components/layout/Header'

//api
import emailjs_api from '../api/emailjs'


export default function Contact() {
    const [inputs, setInputs] = useState({
        firstname: '',
        email: '',
        message: '',
    })

    const [captcha, setCaptcha] = useState('')

    const handle_submit = async (e) => {
        e.preventDefault();
        if (!inputs.firstname || !inputs.email || !inputs.message || !captcha) return;
        
        const mail_send = await emailjs_api(inputs, captcha, e);
        if (mail_send) toast[mail_send.status](mail_send.message);
    }

    const handle_change = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => {
            return {
                ...prevInputs,
                [name]: value
            }
        });
    }

    return (
        <>
            <Header />
            <form onSubmit={handle_submit}>

                <ToastContainer autoClose={3000} />
                <fieldset>
                    <legend>Informations personnelles</legend>
                    <label id="firstname" htmlFor="firstname">Prénom</label>
                    <input onChange={handle_change} placeholder="Entrer votre prénom..." id="firstname" name="firstname" type="text" required />
                    <label htmlFor="email">Email</label>
                    <input onChange={handle_change} placeholder="Entrer votre email..." id="email" name="email" type="text" required />
                </fieldset>

                <label htmlFor="message">Message</label>
                <textarea onChange={handle_change} placeholder="Écriver votre message..." name="message" id="message" required></textarea>

                <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_GOOGLE_SITE_KEY}
                    onChange={(e) => setCaptcha(e)}
                />

                <button type="submit">Envoyer votre message</button>
            </form>
        </>
    )
}
