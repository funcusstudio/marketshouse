import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  BooleanInput
} from 'react-admin';

export const UserHouseProjectEdit = () => (
  <Edit>
    <SimpleForm>
      <ReferenceInput source="userId" reference="users" label="Пользователь">
        <SelectInput optionText={record => `${record.firstName} ${record.lastName}`} />
      </ReferenceInput>
      <ReferenceInput source="houseProjectId" reference="house-projects" label="Проект">
        <SelectInput optionText="name" />
      </ReferenceInput>
      <TextInput source="notes" label="Примечания" multiline />
      <BooleanInput source="isConfirmed" label="Подтвержден" />
    </SimpleForm>
  </Edit>
); 