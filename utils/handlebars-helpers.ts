import {Entries} from "../types/entries";

export const handlebarsHelpers = {
    findPrice: (entries: Entries, selectedItem: string): number => {
        const found = entries.find(el => el[0] === selectedItem);

        if (!found){
            throw new Error(`Cannot find price of ${selectedItem}`);
        }

        const [, price] = found;
        return price;
    },

    // change to real price (x.xx GBP)
    priceFixed: (price: number): string => price.toFixed(2) + ' GBP',

    // chosen and not chosen toppings
    chosen: <T>(arr: T[], el: T): boolean => arr.includes(el),
    notChosen: <T>(arr: T[], el: T): boolean => !arr.includes(el),

    chosenBase: (base: string, selected: string) => base === selected,
}
