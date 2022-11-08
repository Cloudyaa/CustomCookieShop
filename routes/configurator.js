import express from "express";
import {COOKIE_BASES, COOKIE_TOPPINGS} from "../data/cookies-data.js";
import {getToppings} from "../utils/get-toppings.js";
import {showErrorPage} from "../utils/show-error-page.js";

export const configRouter = express.Router();

configRouter
    .get('/base/:selected', (req, res) => {
        const {selected} = req.params;

        if (!COOKIE_BASES[selected]) {
            return showErrorPage(res,`We don't have that kind of base as ${selected}`);
        }

        res
            .cookie('cookieBase', selected)
            .render('config/base-selected', {
                selected,
            });
    })

    .get('/topping/:selected', (req, res) => {
        const {selected} = req.params;

        if (!COOKIE_TOPPINGS[selected]) {
            return showErrorPage(res, `We don't have that kind of topping as ${selected}`);
        }

        const toppings = getToppings(req);
        if (toppings.includes(selected)) {
            return showErrorPage(res,`You have already added ${selected}`);
        } else toppings.push(selected);


        res
            .cookie('cookieToppings', JSON.stringify(toppings))
            .render('config/topping-added', {
                selected,
            });
    })


    .get('/remove/:selected', (req, res) => {
        const {selected} = req.params;

        const oldToppings = getToppings(req);

        if(!oldToppings.includes(selected)){
            return showErrorPage(res,`Cannot remove ${selected} because it is not added to your cookie.`);
        }

        const toppings = oldToppings.filter(topping => topping !== selected);

        res
            .cookie('cookieToppings', JSON.stringify(toppings))
            .render('config/removed', {
                selected,
            });
    })
