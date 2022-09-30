import { Component, Fragment } from "react";
import "./bot.style.css";

export class Bot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chat: { message: "", reponse: "" },
      input: "",
      allChat: [],
      active: true,
    };

    // questions et réponses
    this.questions = [
      "Hello",
      "How are you",
      "What is your name",
      "I am fine too",
    ];
    this.reponses = [
      "hi !",
      "i am fine what about you",
      "i am a chat boot name sara",
      "Great what can I do for you ? ",
    ];
  }

  /**
   * fonction pour récupérer ce que contient l'input
   * param : event
   * return : nothing
   */
  handleChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let { input, chat: newChat, allChat } = this.state;

    if (input.trim() === "") {
      return;
    }
    newChat.message = input;

    for (let i = 0; i < this.questions.length; i++) {
      const q = this.questions[i];
      if (q.toLowerCase().match(input.toLowerCase())) {
        newChat.reponse = this.reponses[i];
        break;
      } else {
        newChat.reponse = "Sorry, I didn't understand that";
      }
    }

    allChat.push(newChat);

    this.setState({
      input: "",
      chat: { message: newChat.reponse },
      allChat: allChat,
    });
  };

  render() {
    let { allChat, active } = this.state;
    return (
      <>
        <div className={active ? "chat-container active" : "chat-container"}>
          <h2 className="chat-header">Let's Chat</h2>
          <div className="chat-body">
            {allChat.map((item, index) => {
              return (
                <Fragment key={index}>
                  <div className={item.message ? "sent-message" : ""}>
                    {item.message}
                  </div>
                  <div className={item.reponse ? "received-message" : ""}>
                    {item.reponse}
                  </div>
                </Fragment>
              );
            })}
          </div>

          <div className="chat-footer">
            <form onSubmit={this.handleSubmit} className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="new Message"
                value={this.state.input}
                onChange={this.handleChange}
              />

              <button className="btn btn-sm btn-secondary" type="submit">
                <i className="bi bi-send"></i>
              </button>
            </form>
          </div>
        </div>

        <div className="chat-botton rounded-circle">
          <button
            title="Let Us Talk"
            onClick={() => {
              this.setState({ active: !this.state.active });
            }}
            className="btn btn-blue btn-rounded"
          >
            <i className="bi bi-send-plus-fill"></i>
          </button>
        </div>
      </>
    );
  }
}
