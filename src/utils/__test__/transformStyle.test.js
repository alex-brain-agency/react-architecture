import {expect} from 'chai';
import {inspect} from 'util';
import transformStyle from '../transformStyle';

describe('transformStyle', () => {
  const format = (src, expected) => `transformStyle(${inspect(src)}) === ${JSON.stringify(expected)}`;
  const test = (src, expected) => expect(transformStyle(src).transform).to.equal(expected, format(src, expected));

  it('works with nothing', () => {
    test({}, '');
    test({is3d: true}, '');
  });

  it('basics', () => {
    test({translate: {x: '5px'}}, 'translate(5px, 0)');
    test({translate: {x: '5px'}, is3d: true}, 'translate3d(5px, 0, 0)');
  });
});
