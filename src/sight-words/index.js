import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Button, ButtonGroup, PageHeader } from "react-bootstrap";

const WordCard = ({ word, correct, incorrect, selectedWordCollection }) => {
  if (selectedWordCollection === "") return null;

  return (
    <Fragment>
      <PageHeader>{word}</PageHeader>
      <ButtonGroup bsSize="large">
        <Button bsStyle="success" onClick={correct}>
          YES
        </Button>
        <Button bsStyle="danger" onClick={incorrect}>
          NO
        </Button>
      </ButtonGroup>
    </Fragment>
  );
};

const Complete = ({ reset, selectedWordCollection }) => {
  if (selectedWordCollection === "") return null;

  return (
    <Fragment>
      <PageHeader>Complete!</PageHeader>
      <ButtonGroup bsSize="large">
        <Button onClick={reset}>Start Over?</Button>
      </ButtonGroup>
    </Fragment>
  );
};

const WordSelection = ({ words, onClick, selectedWordCollection }) => {
  if (selectedWordCollection !== "") return null;

  return (
    <Fragment>
      <PageHeader>Select sight word library</PageHeader>
      <ButtonGroup bsSize="large">
        {_.map(words, (word, index) => {
          return (
            <Button key={index} onClick={() => onClick(word)}>
              {word}
            </Button>
          );
        })}
      </ButtonGroup>
    </Fragment>
  );
};

const common = [
  "in",
  "and",
  "that",
  "the",
  "it",
  "of",
  "to",
  "you",
  "is",
  "a"
];

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten"
];

const colors = [
  "red",
  "pink",
  "purple",
  "blue",
  "brown",
  "black",
  "orange",
  "green",
  "white",
  "yellow"
];

class SightWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: colors,
      numbers: numbers,
      common: common,
      words: [],
      incorrect: [],
      wordCollections: ["colors", "numbers", "common", "all"],
      selectedWordCollection: ""
    };
  }

  componentDidMount = () => {
    //const words = _.flatten([this.state.colors, this.state.numbers]);
    //this.shuffleWords(words);
  };

  setWordCollection = name => {
    if (name === "all") {
      const words = _.flatten([this.state.colors, this.state.numbers, this.state.common]);
      this.shuffleWords(words);
    } else {
      const words = _.get(this.state, name);
      this.shuffleWords(words);
    }

    this.setState({
      selectedWordCollection: name
    });
  };

  shuffleWords = words => {
    const shuffledWords = _.shuffle(words);
    this.setState({
      words: shuffledWords,
      incorrect: [],
      selectedWord: shuffledWords[0]
    });
  };

  reset = () => {
    this.setState({
      words: [],
      incorrect: [],
      selectedWordCollection: ""
    });
  };

  correct = word => {
    let words = _.remove(this.state.words, w => {
      return w !== word;
    });

    let incorrect = _.remove(this.state.incorrect, w => {
      return w !== word;
    });

    let nextWords = words.length > 0 ? words : incorrect;

    this.setState({
      words: nextWords,
      incorrect: incorrect,
      selectedWord: nextWords.length > 0 ? nextWords[0] : ""
    });
  };

  incorrect = word => {
    let words = _.remove(this.state.words, w => {
      return w !== word;
    });

    let incorrect = this.state.incorrect;
    incorrect.push(word);

    let nextWords = words.length > 0 ? words : incorrect;
    this.setState({
      words: nextWords,
      incorrect: words.length > 0 ? incorrect : [],
      selectedWord: nextWords.length > 0 ? nextWords[0] : ""
    });
  };

  render() {
    return (
      <Fragment>
        <WordSelection
          words={this.state.wordCollections}
          onClick={this.setWordCollection}
          selectedWordCollection={this.state.selectedWordCollection}
        />
        {this.state.selectedWordCollection !== "" ? null : null}

        {this.state.words.length > 0 ? (
          <WordCard
            word={this.state.selectedWord}
            correct={() => this.correct(this.state.selectedWord)}
            incorrect={() => this.incorrect(this.state.selectedWord)}
            selectedWordCollection={this.state.selectedWordCollection}
          />
        ) : (
          <Complete
            reset={this.reset}
            selectedWordCollection={this.state.selectedWordCollection}
          />
        )}
      </Fragment>
    );
  }
}

export default SightWords;
