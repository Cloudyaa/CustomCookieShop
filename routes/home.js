import express from "express";

export class HomeRouter {
    constructor(cookieMakerApp) {
        this.cmapp = cookieMakerApp
        this.router = express.Router();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get('/', this.home);
    }

    home = (req, res) => {
        const {base, toppings, availableBases, availableToppings, summary} = this.cmapp.getCookieSettings(req);
        res.render('home', {
            cookie: {
                base,
                toppings,
            },
            summary,
            availableBases,
            availableToppings,
        });
    }
}
