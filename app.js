import express from "express";
import cookieParser from "cookie-parser";
import {engine} from "express-handlebars";
import {HomeRouter} from "./routes/home.js";
import {ConfigRouter} from "./routes/configurator.js";
import {OrderRouter} from "./routes/order.js";
import {handlebarsHelpers} from "./utils/handlebars-helpers.js";
import {COOKIE_BASES, COOKIE_TOPPINGS} from "./data/cookies-data.js";

class CookieShopApp {
    constructor() {
        this._loadData();
        this._configApp();
        this._setRoutes();
        this._run();
    }

    _loadData() {
        this.data = {
            COOKIE_BASES,
            COOKIE_TOPPINGS
        }
    }

    _configApp() {
        this.app = express();

        this.app.use(express.static('public'));
        this.app.use(cookieParser());
        this.app.engine('.hbs', engine({
            extname: '.hbs',
            helpers: handlebarsHelpers,
        }));
        this.app.set('view engine', '.hbs');
    }

    _setRoutes(){
        this.app.use('/', new HomeRouter(this).router);
        this.app.use('/config', new ConfigRouter(this).router);
        this.app.use('/order', new OrderRouter(this).router);
    }

    _run(){
        this.app.listen(3000, 'localhost', () => {
            console.log('Listening on http://localhost:3000/');
        });
    }

    /* static */ showErrorPage (res, message){
        res.render('error', {
            message,
        });
    }

    // get toppings from request
    getToppings(req) {
        const {cookieToppings} = req.cookies;
        return cookieToppings ? JSON.parse(cookieToppings) : [];
    }

    getCookieSettings(req) {
        // getting cookie "cookieBase" but under name "base"
        const {cookieBase: base} = req.cookies;
        // getting toppings from request
        const toppings = this.getToppings(req);

        const availableBases = Object.entries(this.data.COOKIE_BASES);
        const availableToppings = Object.entries(this.data.COOKIE_TOPPINGS);

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

}

new CookieShopApp();
