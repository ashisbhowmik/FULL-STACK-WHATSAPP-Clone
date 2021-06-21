import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

const App = () => {
  const [{ user }, dispatch] = useStateValue();
  return (
    <>
      {/* we should write className app if we were going to make a innner div */}
      {!user ? (
        <Login />
      ) : (
        <div className="app">
          <div className="app__body">
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">
                <Chat />
              </Route>
            </Switch>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
