import * as React from 'react';
import { Props, State } from './type';

export default class Card extends React.Component<Props, State> {
  public static defaultProps = new Props();
  public state = new State();

  public render() {
    return (
      <div>
        hello card.
      </div>
    );
  }
}
