import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import PropertyList from "./PropertyList";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";


const PropertyDashboard: React.FC = ({}) => {

  const rootStore = useContext(RootStoreContext);
  const {loadProperties, loadingInitial} = rootStore.propertyStore;

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Data..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <PropertyList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Property Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PropertyDashboard);
