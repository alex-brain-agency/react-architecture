import React, {PropTypes} from 'react';
import Box from '@atoms/Box/Box';

const bem = require('bem-class');
const cx = bem.block('StepBox');

import './StepBox.scss';

/**
 FriendBox
 **/
export default
class StepBox extends React.Component {

    constructor() {
        super();

        this.state = {
            StepBox: []
        };
    }

    static defaultProps = {
        classIco: "big-ico-mark",
        title: "Kies onderwerp",
        text: "Kies een van onze workshops over een onderwerp waar je meer over wilt leren"
    };

    renderStepBox(StepBox) {
        return (
            <div className={cx + ' m20'} key={this.props.title}>
                <a href="#choose-category">
                    <span className={this.props.classIco}></span>
                    <h3>{this.props.title}</h3>
                    <span className="info">{this.props.text}</span>
                </a>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderStepBox(this.state.StepBox)}
            </div>
        );
    }
}
