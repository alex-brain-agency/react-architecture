import React, {PropTypes} from 'react';
import {Link as ReactRouterLink} from 'react-router';
import './Link.scss';
import classnames from 'classnames';

export default class LinkAtom extends React.Component {
  static propTypes = Object.assign({}, ReactRouterLink.propTypes, {
    unstyled: PropTypes.bool,
    color: PropTypes.string,
    activeClassName: PropTypes.string,
    external: PropTypes.bool,
    null: PropTypes.bool,
  });

  static defaultProps = Object.assign({}, ReactRouterLink.defaultProps, {
    unstyled: false
  });

  static contextTypes = {
    history: PropTypes.any,
  };

  render(){
    var className = classnames(
      'LinkAtom',
      this.props.unstyled ? 'LinkAtom--unstyled' : 'LinkAtom--styled'
    );

    var style = {};
    if (this.props.style) Object.assign(style, this.props.style);
    if (this.props.color) style.color = this.props.color;

    if (this.context.history && !this.props.external && !this.props.null) {
      return <ReactRouterLink
        {...this.props}
        style={style}
        className={classnames(className, 'LinkAtom--react-router')}
        activeClassName={classnames('LinkAtom--active')} />;
    }
    else {
      var target = this.props.to != null ? this.props.to : '/404';
      if (target[0] !== '/' && target.indexOf('http') !== 0) target = '/' + target;

      return <a
        href={target}
        {...this.props}
        style={style}
        onClick={this.props.null ? (e) => {
          e.preventDefault();
          this.props.onClick();
        } : undefined}
        className={classnames(className, 'LinkAtom--hard-link')} />;
    }
  }
}
