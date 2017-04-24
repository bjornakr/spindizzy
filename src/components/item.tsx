import * as React from "react"
import * as redux from "redux"
import { connect } from "react-redux"
import { Store as S } from "../store/store"
import { Store as SSS} from "../store/store"
import { Ruru } from "../store/constants"
import { selectChoice, next, previous } from "../actions/question"
import { SingleChoice } from "./SingleChoice"
import { MultiChoice } from "./MultiChoice"
import { Debug } from "./Debug"
import { TextLine} from "./TextLine"

const mapStateToProps = (state: S.All, ownProps: OwnProps): ConnectedState => ({
    previousIsDisabled: state.session.currentIndex === 0,
    currentQuestion: state.session.questionnaire.get(state.session.currentIndex)
})

const mapDispatchToProps = (dispatch: redux.Dispatch<S.All>): ConnectedDispatch => ({
  next: () => {
      dispatch(next())
  },
  previous: () => {
      dispatch(previous())
  }
})

interface OwnProps {
    // title: string,
    // choices: [string, string][]
}

interface ConnectedState {
    previousIsDisabled: boolean,
    currentQuestion: S.Question
}

interface ConnectedDispatch {
    next: () => void,
    previous: () => void
}

interface OwnState {}

class ItemComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {

    private onClickNext = () => {
        this.props.next()
    }

    private onClickPrevious = () => {
        this.props.previous()
    }

    private selectQuestionComponent = (question: S.Question) => {
        console.log("selectQuestionComponent");
        console.log(question);

        if (question.type === "SINGLE") {
            let params = question.params as S.SingleParams
            return <SingleChoice choices={params.choices} />
        }
        else if (question.type === "MULTI") {
            let params = question.params as S.SingleParams
            return <MultiChoice choices={params.choices} />
        }
        else if (question.type === "TEXT") {
            return <TextLine />
        }
    }

    private selectControlComponent = () => {
        const { currentQuestion, previousIsDisabled } = this.props

        if (currentQuestion.type === "END") {
            return  <div><button onClick={this.onClickPrevious} disabled={previousIsDisabled}>⯇</button><button>Submit</button></div>
        }
        else {
            return <div><button onClick={this.onClickPrevious} disabled={previousIsDisabled}>⯇</button><button onClick={this.onClickNext}>⯈</button></div>
        }
    }

    render() {
        const { currentQuestion, previousIsDisabled } = this.props

        return <div>
                <h3>{currentQuestion.text}</h3>
                {this.selectQuestionComponent(currentQuestion)}
                {this.selectControlComponent()}
                <hr />
                <Debug />
            </div>
    }
}

export const Item: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(ItemComponent)