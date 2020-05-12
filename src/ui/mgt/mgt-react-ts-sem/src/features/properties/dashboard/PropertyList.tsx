import React, { useContext, Fragment } from "react";
import {Item} from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { PropertyListItem } from "./PropertyListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";


const PropertyList: React.FC = ({
}) => {
  const rootStore = useContext(RootStoreContext);
  const { propertiesByDate } = rootStore.propertyStore;
  return (
    <Fragment>
      <Item.Group divided>
        {propertiesByDate.map(property => (
          <PropertyListItem key={property.id} property={property} />
        ))}
      </Item.Group>
    </Fragment>
  );
};

export default observer(PropertyList);

