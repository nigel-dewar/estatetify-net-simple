import React from 'react'
import { Item, Button, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IProperty } from '../../../app/models/property';



export const PropertyListItem: React.FC<{property: IProperty}> = ({property}) => {


    return (
      <Segment.Group>
        <Segment>
          <Item.Image size="tiny" circular src="/assets/user.png" />
          <Item.Group>
            <Item>
              <Item.Content>
                <Item.Header as="a">{property.name}</Item.Header>
                <Item.Description>
                  <div>{property.description}</div>
                  <div>
                    {property.suburb}, {property.postCode}
                  </div>
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <Icon name="clock" /> {property.availableDate}
        </Segment>
        <Segment clearing>
          <span>{property.description}</span>
          <Button
            as={Link}
            to={`/properties/${property.id}`}
            floated="right"
            content="View"
            color="blue"
          />
        </Segment>
      </Segment.Group>
    );
}
