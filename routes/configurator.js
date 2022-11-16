import express from "express";

export class ConfigRouter{
    constructor(cookieMakerApp) {
        this.cmapp = cookieMakerApp;
        this.router = express.Router();
        this.setRoutes();
    }

    setRoutes() {
        this.router.get('/base/:selected', this.selectBase);
        this.router.get('/topping/:selected', this.selectTopping);
        this.router.get('/remove/:selected', this.removeTopping);
    }

    //arrow function protect us of change of 'this' context
    selectBase = (req, res) => {
        const {selected} = req.params;

        if (!this.cmapp.data.COOKIE_BASES[selected]) {
            return this.cmapp.showErrorPage(res,`We don't have that kind of base as ${selected}`);
        }

        res
            .cookie('cookieBase', selected)
            .render('config/base-selected', {
                selected,
            });
    };

    selectTopping = (req, res) => {
        const {selected} = req.params;

        if (!this.cmapp.data.COOKIE_TOPPINGS[selected]) {
            return this.cmapp.showErrorPage(res, `We don't have that kind of topping as ${selected}`);
        }

        const toppings = this.cmapp.getToppings(req);
        if (toppings.includes(selected)) {
            return this.cmapp.showErrorPage(res,`You have already added ${selected}`);
        } else toppings.push(selected);


        res
            .cookie('cookieToppings', JSON.stringify(toppings))
            .render('config/topping-added', {
                selected,
            });
    };

    removeTopping = (req, res) => {
        const {selected} = req.params;

        const oldToppings = this.cmapp.getToppings(req);

        if(!oldToppings.includes(selected)){
            return this.cmapp.showErrorPage(res,`Cannot remove ${selected} because it is not added to your cookie.`);
        }

        const toppings = oldToppings.filter(topping => topping !== selected);

        res
            .cookie('cookieToppings', JSON.stringify(toppings))
            .render('config/removed', {
                selected,
            });
    };
}
