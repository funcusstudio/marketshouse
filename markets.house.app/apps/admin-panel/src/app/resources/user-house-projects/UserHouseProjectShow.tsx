import {
  Show,
  SimpleShowLayout,
  TextField,
  ReferenceField,
  DateField,
  BooleanField,
  RichTextField
} from 'react-admin';

export const UserHouseProjectShow = () => (
  <Show>
    <SimpleShowLayout>
      <ReferenceField source="userId" reference="users" label="Пользователь">
        <TextField source="firstName" />{" "}<TextField source="lastName" />
      </ReferenceField>
      <ReferenceField source="houseProjectId" reference="house-projects" label="Проект">
        <TextField source="name" />
      </ReferenceField>
      <RichTextField source="notes" label="Примечания" />
      <BooleanField source="isConfirmed" label="Подтвержден" />
      <DateField source="createdAt" label="Дата выбора" />
      <DateField source="updatedAt" label="Дата обновления" />
    </SimpleShowLayout>
  </Show>
); 