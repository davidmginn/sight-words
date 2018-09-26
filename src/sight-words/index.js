import React, { Component, Fragment } from "react";
import _ from "lodash";
import { ListGroup, ListGroupItem, Button, ButtonGroup } from "react-bootstrap";

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
      numbers: numbers
    };
  }

  componentDidMount = () => {
    let words = _.flatten([this.state.colors, this.state.numbers]);
    this.setState({
      words: _.shuffle(words),
      incorrect: []
    });
  };

  correct = word => {
    let words = _.remove(this.state.words, w => {
      return w !== word;
    });

    this.setState({
      words: words.length > 0 ? words : this.state.incorrect,
      incorrect: words.length > 0 ? this.state.incorrect : []
    });
  };

  incorrect = word => {
    let words = _.remove(this.state.words, w => {
      return w !== word;
    });

    let incorrect = this.state.incorrect;
    incorrect.push(word);

    this.setState({
      words: words.length > 0 ? words : incorrect,
      incorrect: words.length > 0 ? incorrect : []
    });
  };

  render() {
    console.log(this.state.words ? this.state.words.length : "");
    return (
      <Fragment>
        <ListGroup>
          {_.map(this.state.words, (word, index) => (
            <ListGroupItem
              style={{
                fontSize: "1.75em"
              }}
              key={index}
            >
              {word}
              <ButtonGroup className="pull-right">
                <Button bsStyle="success" onClick={() => this.correct(word)}>
                  Correct
                </Button>
                <Button bsStyle="danger" onClick={() => this.incorrect(word)}>
                  Incorrect
                </Button>
              </ButtonGroup>
            </ListGroupItem>
          ))}
        </ListGroup>
      </Fragment>
    );
  }
}

export default SightWords;
