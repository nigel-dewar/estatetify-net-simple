import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Grid } from "semantic-ui-react";
import {
  PropertyFormValues
} from "../../../app/models/property";
import { v4 as uuid } from "uuid";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { propertyTypeIds } from "../../../app/common/options/propertyTypeOptions";
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan } from 'revalidate';
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate = combineValidators({
  name: isRequired({ message: "The Name is required" }),
  description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description needs to be at least 5 characters",})
  )(),
  propertyTypeId: isRequired('Property Type Id'),
  landSize: isRequired('Land Size'),
  bedrooms: isRequired("Bedrooms"),
  bathrooms: isRequired("Bathrooms"),
  parkingSpaces: isRequired("Parking Spaces"),
  streetNumber: isRequired("Street Number"),
  route: isRequired("Route"),
  locality: isRequired("Locality"),
  suburb: isRequired("Suburb"),
  postCode: isRequired("Post Code"),
  country: isRequired("Country")
});

interface DetailParams {
  id: string;
}

const PropertyForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);
  const {
    createProperty,
    editProperty,
    submitting,
    loadProperty
  } = rootStore.propertyStore;

  const [property, setProperty] = useState(new PropertyFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      loadProperty(match.params.id)
        .then(property => setProperty(new PropertyFormValues(property)))
        .finally(() => setLoading(false));
    }
  }, [loadProperty, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    if (!property.id) {
      let newProperty = {
        ...property,
        id: uuid()
      };
      createProperty(newProperty);
    } else {
      editProperty(values);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={property}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="name"
                  placeholder="Name"
                  value={property.name}
                  component={TextInput}
                />
                <Field
                  name="suburb"
                  placeholder="Suburb"
                  value={property.suburb}
                  component={TextInput}
                />
                <Field
                  name="postCode"
                  placeholder="Post Code"
                  value={property.postCode}
                  component={TextInput}
                />
                {/* <Field<Date>
                  name="availableDate"
                  date={true}
                  placeholder="Date Available"
                  value={property.availableDate!}
                  component={DateInput}
                /> */}
                <Field
                  name="description"
                  rows={2}
                  placeholder="Description"
                  value={property.description}
                  component={TextAreaInput}
                />
                <Field
                  name="propertyTypeId"
                  placeholder="Property Type Id"
                  options={propertyTypeIds}
                  value={property.propertyTypeId}
                  component={SelectInput}
                />
                <Field
                  name="bedrooms"
                  placeholder="Bedrooms"
                  value={property.bedrooms}
                  component={TextInput}
                />
                <Field
                  name="bathrooms"
                  placeholder="Bathrooms"
                  value={property.bathrooms}
                  component={TextInput}
                />
                <Field
                  name="parkingSpaces"
                  placeholder="Parking Spaces"
                  value={property.parkingSpaces}
                  component={TextInput}
                />
                <Field
                  name="landSize"
                  placeholder="Land Size"
                  value={property.landSize}
                  component={TextInput}
                />
                <Field
                  name="streetNumber"
                  placeholder="Street Number"
                  value={property.streetNumber}
                  component={TextInput}
                />
                <Field
                  name="route"
                  placeholder="Route"
                  value={property.route}
                  component={TextInput}
                />
                <Field
                  name="locality"
                  placeholder="Locality"
                  value={property.locality}
                  component={TextInput}
                />
                <Field
                  name="country"
                  placeholder="Country"
                  value={property.country}
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading || invalid || pristine}
                  floated="right"
                  positive
                  type="submit"
                  content="Submit"
                />
                <Button
                  disabled={loading}
                  onClick={() => history.push("/properties")}
                  floated="right"
                  content="Cancel"
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(PropertyForm);
