import React, { Fragment, useContext, useEffect} from "react";
import { Container } from "semantic-ui-react";
import NavBar from "../../features/nav/NavBar";
import PropertyDashboard from "../../features/properties/dashboard/PropertyDashboard";
import {observer} from 'mobx-react-lite';
import { Route, withRouter, RouteComponentProps, Switch } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import PropertyForm from "../../features/properties/form/PropertyForm";
import PropertyDetails from "../../features/properties/details/PropertyDetails";
import NotFound from "./NotFound";
import {ToastContainer} from 'react-toastify'
import LoginForm from "../../features/user/LoginForm";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from '../common/modals/ModelContainer';
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ProfilePage from "../../features/profiles/ProfilePage";

const App: React.FC<RouteComponentProps> = ({location}) => {

  const rootStore = useContext(RootStoreContext);

  const {setAppLoaded, token, appLoaded} = rootStore.commonStore;
  const {getUser} = rootStore.userStore;


  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [getUser, setAppLoaded, token]);
  
  if (!appLoaded) return <LoadingComponent content='Loading Application...' />

  return (
    <Fragment>
      <ModalContainer />
      <ToastContainer position="bottom-right" />
      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <NavBar></NavBar>
            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route exact path="/properties" component={PropertyDashboard} />
                <Route
                  exact
                  path="/properties/:id"
                  component={PropertyDetails}
                />
                {/*<Route path="/properties/:id/activities" component={PropertyActivities} />*/}
                {/*<Route path="/properties/:id/activities/:id" component={PropertyActivity} />*/}
                <Route
                  exact
                  key={location.key}
                  path={["/createProperty", "/properties/manage/:id"]}
                  component={PropertyForm}
                />
                <Route exact path="/activities" component={ActivityDashboard} />
                <Route
                  exact
                  path="/activities/:id"
                  component={ActivityDetails}
                />
                <Route
                  exact
                  key={location.key}
                  path={["/createActivity", "/activities/manage/:id"]}
                  component={ActivityForm}
                />
                <Route exact path="/profile/:username" component={ProfilePage} />
                {/* <Route exact path="/login" component={LoginForm} /> */}
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
