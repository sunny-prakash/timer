import React from "react";
import "./App.css";
import tachyons from "tachyons";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            days: "0",
            hours: "0",
            minutes: "0",
            seconds: "0",
            input: "",
            countDownDate: 0,
            showInput: "",
            msg: "Timer ends on",
            buttonToggle: true,
        };
    }

    componentDidMount() {
        let userTime = localStorage.getItem("countDownDate") !== null ? JSON.parse(localStorage.getItem("countDownDate")) : "";
        let showMsg = localStorage.getItem("showInput") !== null ? JSON.parse(localStorage.getItem("showInput")) : "";
        let buttonShow = localStorage.getItem("buttonToggle") !== null ? JSON.parse(localStorage.getItem("buttonToggle")) : "";
        this.setState({ countDownDate: userTime, showInput: showMsg, buttonToggle: buttonShow });
        if (this.state.countDownDate !== null && this.state.countDownDate !== "") this.countDownStart();
    }

    componentDidUpdate() {
        localStorage.setItem("countDownDate", JSON.stringify(this.state.countDownDate));
        localStorage.setItem("showInput", JSON.stringify(this.state.showInput));
        localStorage.setItem("buttonToggle", JSON.stringify(this.state.buttonToggle));
    }
    onChangeInput = (e) => {
        this.setState({ input: e.target.value });
    };
    setTimer = async () => {
        let date = await new Date(this.state.input).getTime();
        await this.setState({ buttonToggle: false, showInput: this.state.input, countDownDate: date, input: "" });

        if (isNaN(this.state.countDownDate)) {
            this.resetTimer();
            return;
        }
        this.countDownStart();
    };

    countDownStart = () => {
        if (this.state.countDownDate === "" || this.state.countDownDate === null) {
            return;
        }
        this.startInterval = setInterval(async () => {
            var presentTime = await new Date().getTime();
            var distance = this.state.countDownDate - presentTime;
            if (isNaN(distance)) return;
            distance <= 0
                ? this.setState({ msg: "Invalid date type or Time has already ended on" })
                : this.setState({
                      msg: "Timer ends on",
                      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                      seconds: Math.floor((distance % (1000 * 60)) / 1000),
                  });
        }, 1000);
    };

    resetTimer = () => {
        clearInterval(this.startInterval);
        this.setState({ days: "0", hours: "0", minutes: "0", seconds: "0", input: "", countDownDate: "", showInput: "", msg: "Timer ends on", buttonToggle: true });
    };

    render() {
        return (
            <div className="tc mt4">
                <h1 className="dark-blue">{"Countdown Timer"}</h1>
                <div className="mt5 washed-blue">
                    <h3>{`${this.state.msg} ${this.state.showInput}`}</h3>
                    <h3>{`${this.state.days} Days ${this.state.hours} Hours ${this.state.minutes} Mins ${this.state.seconds} Seconds`}</h3>

                    {this.state.buttonToggle ? (
                        <div>
                            <input className="pa2 br2 bn" onChange={this.onChangeInput} type="text" name="timerInput" id="timerInput" placeholder="Enter date" value={this.state.input} />
                            <button className="ml3 bn br3 pa2 fw5 bg-light-green" onClick={() => this.setTimer()}>
                                {"Start Countdown"}
                            </button>
                        </div>
                    ) : (
                        <button className="ml3 bn br3 pa2 fw5 bg-light-red" onClick={() => this.resetTimer()}>
                            {"Stop Countdown"}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
