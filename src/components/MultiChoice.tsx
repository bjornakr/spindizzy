import * as React from "react"
import * as redux from "redux"
import { connect } from "react-redux"
import { Store } from "../store/store"
import { selectMulti } from "../actions/question"

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
    selectMulti: (key: string) => {
        dispatch(selectMulti(key))
    }
})

interface OwnProps {
    choices: [string, string][]
}

interface ConnectedState {
}

interface ConnectedDispatch {
    selectMulti: (key: string) => void
}

class MultiChoiceComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {
    private onClickSelectMulti = (key: string) => {
        console.log("KEY " + key);
        this.props.selectMulti(key);
    }

    render() {
        const { choices } = this.props


        // const choiceLines = choices.map((a, i) => <li key={i}><span onClick={() => this._onClickSelectChoice(i)}>{a[0]} / {a[1]}</span></li>)
        const choiceLines = choices.map((a) => <li key={a[0]}>{a[0]}<label onClick={() => this.onClickSelectMulti(a[0])}><input type="checkbox" />{a[1]}</label></li>)

        return <div>
            <ul>
                {choiceLines}
            </ul>
        </div>
    }
}


export const MultiChoice: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(MultiChoiceComponent)