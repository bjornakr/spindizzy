import { combineReducers } from "redux"
import { List, Map } from "immutable"
import { Store } from "../store/Store"
import { Action as CounterAction, Actions as CounterActions } from "../actions/counter"
import { Action as QuestionAction, Actions as QuestionActions } from "../actions/question"

const counterInitialState: Store.Counter = {
    value: 0
}

function counter(state: Store.Counter = counterInitialState, action: CounterAction): Store.Counter {
    const { value } = state

    switch (action.type) {
        case CounterActions.INCREMENT_COUNTER:
            return { value: value + 1 }
        case CounterActions.DECREMENT_COUNTER:
            return { value: value - 1 }
    }

    return state
}

const q1: Store.Question = {
    id: "cbcl001",
    touched: false,
    text: "How are you?",
    type: "MULTI",
    params: {
        choices: [
            ["1", "Good"],
            ["2", "Great"],
            ["3", "Bad"]
        ]
    }
}

const q2: Store.Question = {
    id: "cbcl002",
    touched: false,
    text: "Looking forward to the weekend?",
    type: "SINGLE",
    params: {
        choices: [
            ["0", "No"],
            ["1", "Yes"]
        ]
    }
}

const q3: Store.Question = {
    id: "cbclother",
    touched: false,
    text: "Describe your interests:",
    type: "TEXT",
    params: []
}


const questionnaire: List<Store.Question> = List([q1, q2, q3])


function initializeMulti(currentQuestion: Store.Question, session: Store.Session): Store.Session {
    const params = currentQuestion.params as Store.SingleParams
    const newResponses = params.choices.map(choice => [currentQuestion.id + "_" + choice[0], 0])
    const m = Map<string, string>(newResponses);

    return {
        currentIndex: session.currentIndex,
        questionnaire: session.questionnaire,
        responses: session.responses.merge(m)
    }
}

function goToQuestion(index: number, session: Store.Session): Store.Session {
    console.log(session.responses);
    const currentQuestion = session.questionnaire.get(index);
    const newQuestion: Store.Question =
        {
            id: currentQuestion.id,
            touched: true,
            type: currentQuestion.type,
            text: currentQuestion.text,
            params: currentQuestion.params
        };
    // const newQuestionnaire: List<Store.Question> 
    const newQuestionnaire: List<Store.Question> = questionnaire; //session.questionnaire.splice(index, 1, newQuestion).toList();
    const newSession: Store.Session = //fromJS(session).updateIn("questionnaire", newQuestionnaire)
        {
            currentIndex: index,
            questionnaire: newQuestionnaire,
            responses: session.responses
        };

    // console.log(newSession);
    if (currentQuestion.type === "MULTI" && !currentQuestion.touched) {
        return initializeMulti(currentQuestion, newSession)
    }
    else {
        return newSession
        // {
        //     currentIndex: session.currentIndex,
        //     questionnaire:  newQuestionnaire,
        //     responses: session.responses
        // }
    }
}

const sessionInitialState: Store.Session = goToQuestion(0, {
    currentIndex: 0,
    questionnaire: questionnaire,
    responses: Map<string, string>()
})

function session(state: Store.Session = sessionInitialState, action: QuestionAction): Store.Session {

    const { currentIndex, questionnaire, responses } = state
    const currentQuestion = questionnaire.get(currentIndex)    
    const id = currentQuestion.id
    // console.log(responses)

    switch (action.type) {
        case QuestionActions.SELECT_CHOICE:
            return goToQuestion(currentIndex + 1, {
                currentIndex: currentIndex,
                questionnaire: questionnaire,
                responses: responses.set(id, action.value)
            })
        case QuestionActions.SELECT_MULTI:
            return {
                currentIndex: currentIndex,
                questionnaire: questionnaire,
                responses: responses.set(id + "_" + action.key, "1")
            }
        case QuestionActions.NEXT:
            return goToQuestion(currentIndex + 1, state)
        case QuestionActions.PREVIOUS:
            return goToQuestion(currentIndex - 1, state)
    }

    return state
}


export const reducers = combineReducers<Store.All>({
    counter, session
})