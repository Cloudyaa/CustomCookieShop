import express from "express";
import {getCookieSettings} from "../utils/get-cookie-settings.js";

export const homeRouter = express.Router();

homeRouter
    .get('/', (req, res) => {
        const {base, toppings, availableBases, availableToppings, summary} = getCookieSettings(req);
        res.render('home', {
            cookie: {
                base,
                toppings,
            },
            summary,
            availableBases,
            availableToppings,
        });
    })
