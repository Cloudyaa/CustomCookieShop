import express from "express";
import {getCookieSettings} from "../utils/get-cookie-settings.js";

export const orderRouter = express.Router();

orderRouter
    .get('/checkout', (req, res) => {
        const {base, toppings, availableBases, availableToppings, summary} = getCookieSettings(req);
        res.render('order/checkout', {
            cookie: {
                base,
                toppings,
            },
            summary,
            availableBases,
            availableToppings,
        });
    })

    .get('/thanks', (req, res) => {
        const {summary} = getCookieSettings(req);
        res
            .clearCookie('cookieBase')
            .clearCookie('cookieToppings')
            .render('order/thanks', {
            summary,
        });
    })
