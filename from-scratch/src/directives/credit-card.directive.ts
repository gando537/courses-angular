import { CreditCardVerifier } from "../services/credit-card-verifier";
import { Formatter } from "../services/formatter";

export class CreditCardDirective{

    static selector = '[credit-card]';

    willHaveSpaces = true;

    borderColor = "red";

    constructor(
        public element: HTMLElement,
        private formatter: Formatter,
        private verifier: CreditCardVerifier
    ){}

    formatCreditCard(element: HTMLInputElement){

        element.value = this.formatter.formatNumber(element.value, 16, 4, this.willHaveSpaces);
    }

    init(){

        if(this.element.getAttribute('border-color')){
            this.borderColor = this.element.getAttribute('border-color')!;
        }
        this.element.style.borderColor = this.borderColor;

        if(this.element.getAttribute('with-spaces')){
            this.willHaveSpaces = this.element.getAttribute('with-spaces') === "true";
        }

        this.element.addEventListener('input', (event) => {
            const element = event.target as HTMLInputElement;
            this.formatCreditCard(element);
        })
    }
}