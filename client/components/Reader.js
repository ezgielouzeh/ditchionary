import React from "react";
import axios from "axios";
import {connect} from 'react-redux'
import FrogBook from "../books/frog";
import Pagination from "react-pagination-js";
import API_KEY from "../secrets";

class Reader extends React.Component {
  constructor() {
    super();
    this.voiceNumber = 2;
    this.tts = window.speechSynthesis;
    this.state = {
      text: "",
      voices: [],
      selected: "",
      visible: "hidden",
      translation: "",
      currentPage: 1,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.hidePopup = this.hidePopup.bind(this);
    this.translate = this.translate.bind(this);
    this.changeCurrentPage = this.changeCurrentPage.bind(this);
  }

  componentDidMount() {
    let voices = this.tts.getVoices();
    this.setState({ voices: voices });
  }

  changeCurrentPage(numPage) {
    this.setState({ currentPage: numPage });
  }

  async translate(q) {
    let res = await axios.post(
      `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
      { q: q, target: "tr" }
    );
    let translation = res.data.data.translations[0].translatedText;
    return translation;
  }

  async onMouseUp(e) {
    let selected = window.getSelection().toString();
    if (selected) {
      let toSpeak = new SpeechSynthesisUtterance(selected);
      toSpeak.voice = this.state.voices[this.voiceNumber];
      this.tts.speak(toSpeak);
      let translation = await this.translate(selected);
      this.setState({
        visible: "visible",
        selected: selected,
        translation: translation,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    let toSpeak = new SpeechSynthesisUtterance(
      FrogBook[this.state.currentPage - 1].text
    );
    toSpeak.voice = this.state.voices[this.voiceNumber];
    this.tts.speak(toSpeak);
  }

  hidePopup() {
    this.setState({ visible: "hidden" });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            alt="frog"
            src={FrogBook[this.state.currentPage - 1].imageURL}
            style={{ width: "350px" }}
          />
          <form onSubmit={this.onSubmit}>
            <textarea
              className="editable"
              onMouseUp={this.onMouseUp}
              type="text"
              value={FrogBook[this.state.currentPage - 1].text}
              readOnly
              align="center"
            ></textarea>
            <div className="popup">
              <span
                onClick={this.hidePopup}
                className="popuptext"
                id="myPopup"
                style={{ visibility: this.state.visible }}
              >
                {this.state.translation}
              </span>
            </div>
            <input className="read" align="center" type="submit" value="READ" />
          </form>
          <Pagination
            currentPage={this.state.currentPage}
            totalSize={10}
            sizePerPage={1}
            changeCurrentPage={this.changeCurrentPage}
            theme="bootstrap"
          />
        </header>
      </div>
    );
  }
}

export default connect(null)(Reader);
