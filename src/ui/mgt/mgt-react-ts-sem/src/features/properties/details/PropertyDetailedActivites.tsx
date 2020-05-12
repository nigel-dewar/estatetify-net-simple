import React, { Fragment } from "react";
import { Segment, Header} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import {IProperty} from "../../../app/models/property";
import PropertyActivity from "./PropertyActivity";

const PropertyDetailedActivities: React.FC<{ property: IProperty }> = ({property}) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        color="teal"
        style={{ border: "none" }}
      >
        <Header>Events for this Property</Header>
      </Segment>
      {property.activities?.map((activity) => (
        <PropertyActivity activity={activity} />
      ))}
    </Fragment>
  );
};

export default observer(PropertyDetailedActivities);
