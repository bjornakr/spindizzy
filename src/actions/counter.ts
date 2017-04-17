export enum Actions {
    INCREMENT_COUNTER,
    DECREMENT_COUNTER
}

export type Action = {
    type: Actions
}

export const incrementCounter = (): Action => ({
    type: Actions.INCREMENT_COUNTER
})

export const decrementCounter = (): Action => ({
    type: Actions.DECREMENT_COUNTER
})

