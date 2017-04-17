export enum Actions {
    SELECT_CHOICE,    
    SELECT_MULTI,
    NEXT,
    PREVIOUS
}

export type Action = {
    type: Actions.SELECT_CHOICE,
    value: string
} |
{
    type: Actions.SELECT_MULTI,
    key: string
} |
{
    type: Actions.NEXT,
} |
{
    type: Actions.PREVIOUS
}

export const selectChoice = (key: string) => ({
    type: Actions.SELECT_CHOICE,
    value: key
})

export const selectMulti = (key: string) => ({
    type: Actions.SELECT_MULTI,
    key: key
})

export const next = () => ({
    type: Actions.NEXT
})

export const previous = () => ({
    type: Actions.PREVIOUS
})