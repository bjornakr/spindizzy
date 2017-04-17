import * as React from "react"
import * as redux from "redux"
import { connect } from "react-redux"
import { Store } from "../store/store"
import { selectChoice } from "../actions/question"

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
    selectChoice: (key: string) => {
        dispatch(selectChoice(key))
    }
})

interface OwnProps {
    choices: [string, string][]
}

interface ConnectedState {
}

interface ConnectedDispatch {
    selectChoice: (key: string) => void
}

class SingleChoiceComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {
    private onClickSelectChoice = (key: string) => {
        console.log("KEY " + key);
        this.props.selectChoice(key);
    }

    render() {
        const { choices } = this.props


        // const choiceLines = choices.map((a, i) => <li key={i}><span onClick={() => this._onClickSelectChoice(i)}>{a[0]} / {a[1]}</span></li>)
        const choiceLines = choices.map(a => <li key={a[0]}><span onClick={() => this.onClickSelectChoice(a[0])}>{a[0]} - {a[1]}</span></li>)

        return <div>
            <ul>
                {choiceLines}
            </ul>
        </div>
    }
}


export const SingleChoice: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(SingleChoiceComponent)