import * as React from "react"
import * as redux from "redux"
import { connect } from "react-redux"
import { Store } from "../store/store"
import { selectChoice } from "../actions/question"

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({})

const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({})

interface OwnProps {}

interface ConnectedState {}

interface ConnectedDispatch {}

class TextLineComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, {}> {
    render() {
        return <div>
            <input type="text" />
        </div>
    }
}


export const TextLine: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(TextLineComponent)