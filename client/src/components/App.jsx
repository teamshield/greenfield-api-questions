/* eslint no-shadow: "off" */
import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';

const AppBarStyled = styled(AppBar)`
  padding: 1.5rem;
`;

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <h4>Questions API</h4>
      </React.Fragment>
    );
  }
}

export default App;
