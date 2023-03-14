export function Directive() {
    return function (decoratedClass: any) {
        console.log(decoratedClass);
    }
}