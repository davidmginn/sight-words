import React, { Component, Fragment } from "react";
import _ from "lodash";
import {
  Button,
  ButtonGroup,
  PageHeader,
  ButtonToolbar,
  ProgressBar
} from "react-bootstrap";
import speechSynthesis from "speech-synthesis";

const WordProgress = ({ totalWordCount, remainingWordCount }) => {
  var percent = 100 - (remainingWordCount / totalWordCount) * 100;

  return (
    <div className="progress-container">
      <ProgressBar animated="true" active now={percent} />
    </div>
  );
};

const WordCard = ({
  word,
  correct,
  incorrect,
  sayWord,
  selectedWordCollection
}) => {
  if (selectedWordCollection === "") return null;

  return (
    <Fragment>
      <PageHeader className="active-word">{word}</PageHeader>
      <ButtonToolbar className="word-actions">
        <ButtonGroup bsSize="large">
          <Button bsStyle="success" onClick={correct}>
            YES
          </Button>
          <Button bsStyle="danger" onClick={incorrect}>
            NO
          </Button>
        </ButtonGroup>
        <ButtonGroup bsSize="large">
          <Button onClick={sayWord}>Say It!</Button>
        </ButtonGroup>
      </ButtonToolbar>
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
      <PageHeader>Select Sight Word Library</PageHeader>
      <ButtonGroup bsSize="large">
        {_.map(words, (word, index) => {
          return (
            <Button key={index} onClick={() => onClick(word.displayName)}>
              {word.displayName}
            </Button>
          );
        })}
        <Button onClick={() => onClick("All")}>All</Button>
      </ButtonGroup>
    </Fragment>
  );
};

const setOne = {
  displayName: "Set #1",
  words: ["in", "and", "that", "the", "it", "of", "to", "you", "is", "a"]
};

const setTwo = {
  displayName: "Set #2",
  words: ["he", "was", "are", "with", "they", "for", "on", "as", "his", "at"]
};

const setThree = {
  displayName: "Set #3",
  words: ["I", "be", "this", "not", "by", "have", "had", "or", "from"]
};

const setFour = {
  displayName: "Set #4",
  words: [
    "but",
    "all",
    "when",
    "there",
    "an",
    "what",
    "were",
    "we",
    "can",
    "your"
  ]
};

const setFive = {
  displayName: "Set #5",
  words: [
    "which",
    "said",
    "do",
    "each",
    "how",
    "their",
    "if",
    "will",
    "about",
    "up"
  ]
};

const setSix = {
  displayName: "Set #6",
  words: [
    "out",
    "then",
    "many",
    "so",
    "would",
    "them",
    "she",
    "some",
    "these",
    "other"
  ]
};

const setSeven = {
  displayName: "Set #7",
  words: [
    "into",
    "more",
    "two",
    "him",
    "time",
    "has",
    "her",
    "like",
    "see",
    "could"
  ]
};

const setEight = {
  displayName: "Set #8",
  words: [
    "make",
    "first",
    "its",
    "my",
    "no",
    "than",
    "now",
    "been",
    "who",
    "people"
  ]
};

const setNine = {
  displayName: "Set #9",
  words: [
    "made",
    "did",
    "only",
    "find",
    "may",
    "over",
    "down",
    "way",
    "use",
    "water"
  ]
};

const numbers = {
  displayName: "Numbers",
  words: [
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
  ]
};

const colors = {
  displayName: "Colors",
  words: [
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
  ]
};

class SightWords extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordSets: [
        colors,
        numbers,
        setOne,
        setTwo,
        setThree,
        setFour,
        setFive,
        setSix,
        setSeven,
        setEight,
        setNine
      ],
      words: [],
      wordCount: 0,
      incorrect: [],
      selectedWordCollection: ""
    };
  }

  setWordCollection = name => {
    var sets = _.reduce(
      this.state.wordSets,
      (result, value) => {
        if (name === "All") {
          result.push(value.words);
          return result;
        }
        value.displayName === name && result.push(value.words);
        return result;
      },
      []
    );

    var words = _.flatten(sets);

    this.shuffleWords(words);

    this.setState({
      selectedWordCollection: name
    });
  };

  shuffleWords = words => {
    const shuffledWords = _.shuffle(words);
    this.setState({
      words: shuffledWords,
      incorrect: [],
      selectedWord: shuffledWords[0],
      wordCount: shuffledWords.length
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

  sayWord = word => {
    speechSynthesis(word, "en-US");
  };

  render() {
    return (
      <Fragment>
        <WordSelection
          words={this.state.wordSets}
          onClick={this.setWordCollection}
          selectedWordCollection={this.state.selectedWordCollection}
        />
        {this.state.selectedWordCollection !== "" ? null : null}

        {this.state.words.length > 0 ? (
          <Fragment>
            <WordCard
              word={this.state.selectedWord}
              correct={() => this.correct(this.state.selectedWord)}
              incorrect={() => this.incorrect(this.state.selectedWord)}
              sayWord={() => this.sayWord(this.state.selectedWord)}
              selectedWordCollection={this.state.selectedWordCollection}
            />
            <WordProgress
              totalWordCount={this.state.wordCount}
              remainingWordCount={
                this.state.words.length + this.state.incorrect.length
              }
            />
          </Fragment>
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
