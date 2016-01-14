import React, {PropTypes} from 'react';
import tinycolor from 'tinycolor2';
import propMatch from 'react-propmatch';

const themeProp = propMatch('theme');
export const propType = themeProp.propType;

export let CONTEXT_KEY = 'THEME_PROVIDER_CONTEXT_KEY';
export let getColor = function getColor(instance){
  return instance
};

const CONTEXT_TYPES = {
  [CONTEXT_KEY]: PropTypes.any
}

export let ThemeProvider = function makeThemeProvider(Component) {
  const makeThemeProp = themeProp.makeFactory(Component);

  return class ThemeProvider extends React.Component {
    constructor(){
      super();
      this.state = {
        theme: null
      };
    }

    static contextTypes = CONTEXT_TYPES;
    static childContextTypes = CONTEXT_TYPES;

    getColor(){
      return this.state.theme && this.state.theme.color || this.context[CONTEXT_KEY] || 'red';
    }

    getChildContext(){
      return {[CONTEXT_KEY]: this.getColor()};
    }

    render(){
      return <Component
        {...this.props}
        setTheme={(theme) => this.setState({theme})}
        {...makeThemeProp(this.getTheme())} />;
    }

    getTheme(){
      const color = this.getColor();
      const gradientTarget = tinycolor(color).darken(10).toString();

      const theme = {
        primaryColor: color,
        getPrimary: () => tinycolor(color),
        getGradient: (dirTo='bottom', color=theme.primaryColor) => {
          return `linear-gradient(to ${dirTo}, ${color}, ${gradientTarget})`;
        }
      };

      return theme;
    }
  }
}
