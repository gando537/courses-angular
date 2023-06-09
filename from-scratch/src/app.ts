import { CreditCardDirective } from "./directives/credit-card.directive";
import { PhoneNumberDirective } from "./directives/phone-number.directive";
import { Angular } from "./framework/framework";
import { ProvidersMetadata } from "./framework/types";
import { CreditCardVerifier } from "./services/credit-card-verifier";
import { Formatter } from "./services/formatter";

Angular.bootstrapApplication({
    declarations: [PhoneNumberDirective, CreditCardDirective],
    providers: [
        {
            provide: "formatter",
            constructor: () => new Formatter("global"),
        },
        {
            provide: "verifier",
            constructor: () => new CreditCardVerifier(),
        },
    ]
})
