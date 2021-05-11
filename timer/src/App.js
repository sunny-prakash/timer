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
            msg: "Enter date to start Timer",
            buttonToggle: true,
        };
    }

    
    onChangeInput = (e) => {
        this.setState({ input: e.target.value });
    };
    setTimer = async () => {
        this.setState({msg:""});
        // console.log("inside setTimer");
        let date = await new Date(this.state.input).getTime();
        this.setState({ countDownDate: date });
        // console.log("countDownDate ",this.state.countDownDate);
        if (this.state.countDownDate === "0" || this.state.input ==="0" ||  isNaN(this.state.countDownDate)||this.state.countDownDate === "" || this.state.countDownDate === null) {
            console.log("inside isNaN(this.state.countDownDate)");
            this.setState({msg:"Enter Valid Date",input: "",buttonToggle: false,});
            
            return;
        }
        this.setState({buttonToggle: false, showInput: this.state.input, input: "" });
        this.countDownStart();
    };

    countDownStart = () => {
        // console.log("going to start startInterval");
        this.startInterval = setInterval(() => {
            var presentTime = new Date().getTime();
            var distance = this.state.countDownDate - presentTime;
            if (isNaN(distance)) return;
            distance <= 0
                ? this.setState({ msg: "Time has already ended on" })
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
        this.setState({ days: "0", hours: "0", minutes: "0", seconds: "0", input: "", countDownDate: "", showInput: "", msg: "Enter date to start Timer", buttonToggle: true });
    };

    render() {
        return (
            <div className="tc mt4">
                <h1 className="dark-blue f1">{"Countdown Timer"}</h1>
                <div className="mt5 washed-blue f3">
                    <h3>{`${this.state.msg} ${this.state.showInput}`}</h3>
                    <h3>{`${this.state.days} Days ${this.state.hours} Hours ${this.state.minutes} Mins ${this.state.seconds} Seconds`}</h3>

                    {this.state.buttonToggle ? (
                        <div>
                            <input className="pa2 br2 bn" onChange={this.onChangeInput} type="text" name="timerInput" id="timerInput" placeholder="Ex. 26 may 2022" value={this.state.input} />
                            <button className="ml3 bn br3 pa2 fw5 bg-light-green" onClick={() => this.setTimer()}>
                                {"Start Countdown"}
                            </button>
                        </div>
                    ) : (
                        <button className="ml3 bn br3 pa2 fw5 bg-light-red" onClick={() => this.resetTimer()}>
                            {"RESET"}
                        </button>
                    )}
                </div>
            </div>
        );
    }
}

export default App;
