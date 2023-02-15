import axios from 'axios';
import React from 'react'

const TestFive = () => {
    const token = JSON.parse(window.localStorage.getItem("token"))
    // console.log(typeof token);

    var data = JSON.stringify({
        "apikey": "102219127563b7f7c53a41e9.62135970",
        "site_id": "126127",
        "transaction_id": Math.floor(Math.random() * 100000000).toString(), //
        "amount": 100,
        "currency": "XAF",
        "alternative_currency": "",
        "description": " TEST INTEGRATION ",
        "customer_id": "172",
        "customer_name": "KOUADIO",
        "customer_surname": "Francisse",
        "customer_email": "harrissylver@gmail.com",
        "customer_phone_number": "698118056",
        "customer_address": "Antananarivo",
        "customer_city": "Antananarivo",
        "customer_country": "CM",
        "customer_state": "CM",
        "customer_zip_code": "06510",
        "notify_url": "http://192.168.1.19:3303/api/test/pay/notify",
        "return_url": "http://192.168.1.19:3303/api/test/pay/callback",
        "channels": "ALL",
        "metadata": token,
        "lang": "FR",
        "invoice_data": {
            "Donnee1": "",
            "Donnee2": "",
            "Donnee3": ""
        }
    });

    var config = {
        method: 'post',
        url: 'https://api-checkout.cinetpay.com/v2/payment',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

    return (
        <>
            <main>
                <h1>Test Page</h1>
            </main>
        </>
    )
}

export default TestFive
