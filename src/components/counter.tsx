import * as React from "react"
import * as redux from "redux"
import { connect } from "react-redux"
import { incrementCounter, decrementCounter } from "../actions/counter"
import { Store } from "../store/store"

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
    counter: state.counter
})


const mapDispatchToProps = (dispatch: redux.Dispatch<Store.All>): ConnectedDispatch => ({
    increment: () => {
        dispatch(incrementCounter())
    },
    decrement: () => {
        dispatch(decrementCounter())
    }
})

interface OwnProps {
    label: string
}

interface ConnectedState {
    counter: { value: number }
}

interface ConnectedDispatch {
    increment: () => void,
    decrement: () => void
}

interface OwnState {}

class CounterComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, OwnState> {
    _onClickIncrement = () => {
        this.props.increment()
    }

    _onClickDecrement = () => {
        this.props.decrement()
    }

    render() {
        const { counter, label } = this.props

        return <div>
                <label>{label}</label>
                <pre>counter = { counter.value }</pre>
                <button ref="increment" onClick={this._onClickIncrement}>++</button>
                <button ref="increment" onClick={this._onClickDecrement}>--</button>
            </div>
    }
}

export const Counter: React.ComponentClass<OwnProps> =
    connect(mapStateToProps, mapDispatchToProps)(CounterComponent)