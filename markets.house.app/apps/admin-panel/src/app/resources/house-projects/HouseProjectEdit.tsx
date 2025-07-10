import {
  Edit,
  SimpleForm,
  BooleanInput,
  TextInput,
  required
} from 'react-admin';

export const HouseProjectEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput disabled source="externalId" label="ID" />
      <TextInput disabled source="name" label="Название" />
      <BooleanInput source="isActive" label="Активен" />
    </SimpleForm>
  </Edit>
); 