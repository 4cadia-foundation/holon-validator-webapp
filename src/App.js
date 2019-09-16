import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import routers from "./router";

class App extends Component {

    render () {
      return (
        <div>
         <Switch>
           {routers.map((item, index)=> (<Route key={index} path={item.path} component={item.component} exact={item.exact} />))}
         </Switch>
        </div>
      )
    }
  }

export default App;