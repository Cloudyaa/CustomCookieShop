export const handlebarsHelpers = {
    findPrice: (entries, selectedItem) => {
        const found = entries.find(el => el[0] === selectedItem);

        if (!found){
            throw new Error(`Cannot find price of ${selectedItem}`);
        }

        const [, price] = found;
        return price;
    },

    // change to real price (x.xx GBP)
    priceFixed: price => price.toFixed(2) + ' GBP',

    // chosen and not chosen toppings
    chosen: (arr, el) => arr.includes(el),
    notChosen: (arr, el) => !arr.includes(el),

    chosenBase: (base, selected) => base === selected,
}
