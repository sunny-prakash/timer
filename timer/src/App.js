import React from "react";
import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            days: "",
            hours: "",
            minutes: "",
            seconds: "",
            input: "",
            countDownDate: "",
            showInput: "",
        };
    }
    onChangeInput = (e) => {
        this.setState({ input: e.target.value });
    };
    getInput = async () => {
        await this.setState({ showInput: this.state.input, countDownDate: new Date(this.state.input).getTime(), input: "" });
        this.countDownStart();
    };

    countDownStart = () => {
        setInterval(() => {
            var presentTime = new Date().getTime();
            var distance = this.state.countDownDate - presentTime;
            this.setState({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);
    };
    render() {
        return (
            <div>
                <h1>{"CountDown Timer"}</h1>
                <h3>{`Timer ends on ${this.state.showInput}`}</h3>
                <h5>{`${this.state.days}Days ${this.state.hours}Hours ${this.state.minutes}mins ${this.state.seconds}sec`}</h5>
                <input onChange={this.onChangeInput} type="text" name="timerInput" id="timerInput" value={this.state.input} />
                <button onClick={this.getInput}>{"Start Countdown"}</button>
            </div>
        );
    }
}

export default App;
