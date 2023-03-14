export type ProviderMetadata = {
    /**
     * Le nom du service à fournir
     * 
     * par exemple: "CreditCardVerifier"
     */
    provide: string;

    /**
     * La fonction qui permet d'instancier le service
     *
     * par exemple: () => new CreditCardVerifier()
     */
    constructor: Function ;
}

export type ProvidersMetadata = ProviderMetadata[];

export type ServicesInstance = {
    /**
     * Le nom du service
     */
    name: string;

    /**
     * L'instance du service
     */
    instance: any;
}

export type ServicesInstances = ServicesInstance[];

export type Module = {
    /**
     * Les directives du module (un tableau qui contient les classes de mes directives)
     */
    declarations : any[];

    /**
     * Le tableau qui contient les définitions de mes services pour les directives
     */
    providers?: ProvidersMetadata;
}