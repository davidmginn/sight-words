import React, { Component, Fragment } from "react";
import _ from 'lodash';

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
]

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
]

class SightWords extends Component{

    constructor(props){
        super(props);
        this.state = {
            colors: colors,
            numbers: numbers
        };
    }

    componentDidMount = () => {
        let words = _.flatten([this.state.colors, this.state.numbers]);
        this.setState({
            words: _.shuffle(words)
        })
    }

    render(){
        return(
            <Fragment>
                {_.map(this.state.words,(word, index) => (
                    <div style={{
                        fontSize:'1.75em'
                    }
                    } key={index}>{word}</div>
                ))}
            </Fragment>
        )
    }
}

export default SightWords;