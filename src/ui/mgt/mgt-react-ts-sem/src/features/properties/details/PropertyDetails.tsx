import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps} from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import PropertyDetailedHeader from "./PropertyDetailedHeader";
import PropertyDetailedInfo from "./PropertyDetailedInfo";
import PropertyDetailedSideBar from "./PropertyDetailedSideBar";
import { RootStoreContext } from "../../../app/stores/rootStore";
import PropertyDetailedActivities from "./PropertyDetailedActivites";

interface DetailParams {
  id: string;
}

const PropertyDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    property,
    loadProperty,
    loadingInitial
  } = rootStore.propertyStore;

  useEffect(() => {
    loadProperty(match.params.id);
  }, [loadProperty, match.params.id, history]);

  if (loadingInitial) 
    return <LoadingComponent content='Loading Property...' />

  if (!property){
    return <h2>Property not found</h2>
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <PropertyDetailedHeader property={property} />
        <PropertyDetailedInfo property={property} />
        <PropertyDetailedActivities property={property} />
      </Grid.Column>
      <Grid.Column width={6}>
        <PropertyDetailedSideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(PropertyDetails);
