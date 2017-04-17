import { List, Map, fromJS } from "immutable"

export namespace Store {
    export type Counter = { value: number }
    export type SingleChoice = [string, string]

    /// <reference path="dts/typescript/lib.es6.d.ts" />
    // export type Response 

    export interface SingleParams {
        choices: SingleChoice[]
    }

    export interface TextParams { }

    export interface Question {
        id: string,
        touched: boolean
        text: string,
        type: "SINGLE" | "MULTI" | "TEXT",
        params: SingleParams | TextParams
    }

    export type Session = {
        currentIndex: number,
        questionnaire: List<Question>,
        responses: Map<string, string>
    }

    export type All = {
        counter: Counter,
        session: Session
    }
}
