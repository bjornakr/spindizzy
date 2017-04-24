import * as React from "react"
import * as redux from "redux"
import { connect } from "react-redux"
import { Store } from "../store/store"
import { selectMulti } from "../actions/question"
import { Map } from "immutable"

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
    currentIndex: state.session.currentIndex,
    currentQuestion: state.session.questionnaire.get(state.session.currentIndex),
    responses: state.session.responses
})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
})

interface OwnProps {
}

interface ConnectedState {
    currentIndex: number,
    currentQuestion: Store.Question,
    responses: Map<string, string>
}

interface ConnectedDispatch {
}

class DebugComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {
    render() {
        const { responses } = this.props


        // const choiceLines = choices.map((a, i) => <li key={i}><span onClick={() => this._onClickSelectChoice(i)}>{a[0]} / {a[1]}</span></li>)
        // const choiceLines = choices.map((a) => <li key={a[0]}>{a[0]}<label onClick={() => this.onClickSelectMulti(a[0])}><input type="checkbox" />{a[1]}</label></li>)
        // const keys = responses.keys()
        // const strs = keys.map(k => k + ": " + responses.get(k))
        const responseLines = responses.map((val, key) => <tr key={key}><td>{key}</td><td>{val}</td></tr>).toArray();
        // const responseLines = strs.map(a => <li>{a}</li>)
        //  responses.entrySeq().foreach((a) => <li>{a[0]}: {a[1]})</li>)

        return <div>
            <table>
                <tbody>                
                    {responseLines}
                </tbody>
            </table>
        </div>
    }
}


export const Debug: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(DebugComponent)