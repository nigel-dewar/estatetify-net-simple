import React, { FC } from "react";
import { Segment, Item, Header, Button, Image } from "semantic-ui-react";
import { IProperty } from "../../../app/models/property";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const activityImageStyle = {
  filter: "brightness(30%)"
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const PropertyDetailedHeader: React.FC<{ property: IProperty }> = ({
  property
}) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image
          src={`${property.images?.[0]?.imageUrl}`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={property.name}
                  style={{ color: "white" }}
                />
                <p>{property.availableDate}</p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button as={Link} to={`/properties/manage/${property.id}`} color="orange" floated="right">
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(PropertyDetailedHeader);
