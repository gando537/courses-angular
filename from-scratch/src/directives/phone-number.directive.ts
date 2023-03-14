import { Directive } from "../decorators/directive";
import { Formatter } from "../services/formatter";

@Directive()
export class PhoneNumberDirective {

    static selector = '[phone-number]';

    static providers = [
        {
            provide: "formatter",
            construct: () => new Formatter("spécifique"),
        }
    ]

    willHaveSpaces = true;

    borderColor = "red";

    constructor(public element: HTMLElement, private formatter: Formatter){}

    formatPhoneNumber(element: HTMLInputElement){

        element.value = this.formatter.formatNumber(element.value, 10, 2, this.willHaveSpaces);
    }

    init () {

        if(this.element.hasAttribute('border-color')){
            this.borderColor = this.element.getAttribute('border-color')!;
        }

        if(this.element.hasAttribute('with-spaces')){
            this.willHaveSpaces = this.element.getAttribute('with-spaces') === "true";
        }

        this.element.style.borderColor = this.borderColor;

        this.element.addEventListener('input', (event) => {
            const element = event.target as HTMLInputElement;
            this.formatPhoneNumber(element);
        })
    }
}