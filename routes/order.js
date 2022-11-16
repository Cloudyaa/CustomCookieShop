import express from "express";


export class OrderRouter {
    constructor(cookieMakerApp) {
        this.cmapp = cookieMakerApp;
        this.router = express.Router();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get('/checkout', this.checkout);
        this.router.get('/thanks', this.thanks);
    }

    checkout = (req, res) => {
        const {base, toppings, availableBases, availableToppings, summary} = this.cmapp.getCookieSettings(req);
        res.render('order/checkout', {
            cookie: {
                base,
                toppings,
            },
            summary,
            availableBases,
            availableToppings,
        });
    };

    thanks = (req, res) => {
        const {summary} = this.cmapp.getCookieSettings(req);
        res
            .clearCookie('cookieBase')
            .clearCookie('cookieToppings')
            .render('order/thanks', {
                summary,
            });
    };
}
