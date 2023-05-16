import {$, useComputed$, useSignal } from "@builder.io/qwik";


export const useCounter = (initialValue: number) => {

    const counter = useSignal(initialValue);

    const increment = $(() => {
        counter.value++;
    });

    const decrement = $(() => {
        counter.value--;
    });

    return {
        //counter, //de esta forma se podria acceder al valor del counter desde fuera
        counter: useComputed$(() => counter.value), //de esta NO forma se podria acceder al valor del counter desde fuera, es decir seria de solo lectura
        increment,
        decrement
    };
}