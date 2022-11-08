import {getToppings} from "./get-toppings.js";
import {handlebarsHelpers} from "./handlebars-helpers.js";
import {COOKIE_BASES, COOKIE_TOPPINGS} from "../data/cookies-data.js";

export const getCookieSettings = (req) => {
    // getting cookie "cookieBase" but under name "base"
    const {cookieBase: base} = req.cookies;
    // getting toppings from request
    const toppings = getToppings(req);

    const availableBases = Object.entries(COOKIE_BASES);
    const availableToppings = Object.entries(COOKIE_TOPPINGS);

    // total price
    const summary = (base ?  handlebarsHelpers.findPrice(availableBases, base) : 0) + toppings.reduce((prev, curr) => (
        prev + handlebarsHelpers.findPrice(availableToppings, curr)
    ), 0);
    return {
        // selected
        base,
        toppings,

        // price of selected
        summary,

        // all available 'things'
        availableBases,
        availableToppings
    }
}
