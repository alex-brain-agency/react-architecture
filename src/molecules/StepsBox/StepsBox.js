import React, {PropTypes} from 'react';
import Box from '@atoms/Box/Box';
import StepBox from '@atoms/StepBox/StepBox';

const bem = require('bem-class');
const cx = bem.block('StepsBox');

import './StepsBox.scss';

/**
 StepsBox
 **/
export default
class StepsBox extends React.Component {

  constructor() {
    super();

    this.state = {
      stepsBox: []
    };
  }

  static defaultProps = {
  };


  renderStepsBox(stepsBox) {
    return (
        <div className={cx + ' m-auto'}>
          <Box direction="row" className="steps">

            {/* Step Number one with data: classIco, title, text. */}
            <StepBox text="Kies een van onze workshops over een onderwerp waar je meer over wilt leren" title="Kies een workshop"/>

            <div className="colors-arrow">
              <span></span>
            </div>

            { /* Step Number two with data: classIco, title, text */}
            <StepBox classIco="big-ico-location" text="Selecteer een van onze winkels waar je de workshop wilt volgen" title="Vind een winkel"/>

            <div className="colors-arrow-2">
              <span></span>
            </div>

            {/* Step Number three with data: classIco, title, text */}
            <StepBox classIco="big-ico-ticket" text="Kies een tijd en datum en reserveer een plek bij de door jou gekozen workshop" title="Reserveer en volg workshop"/>

          </Box>
        </div>
    )
  }

  render() {
    return (
        <Box direction="column">
          {this.renderStepsBox(this.state.stepsBox)}
        </Box>
    );
  }
}
