import {
  List,
  Datagrid,
  TextField,
  ReferenceField,
  DateField,
  BooleanField,
  EditButton,
  ShowButton,
  FilterButton,
  SearchInput,
  ReferenceInput,
  SelectInput,
  Filter,
  BooleanInput,
  FilterProps
} from 'react-admin';

const UserHouseProjectFilter = (props) => (
  <Filter {...props}>
    <SearchInput source="notes" alwaysOn />
  </Filter>
);

export const UserHouseProjectList = () => (
  <List filters={<UserHouseProjectFilter />}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <ReferenceField source="userId" reference="users" label="Пользователь">
        <TextField source="email" />
      </ReferenceField>
      <ReferenceField source="houseProjectId" reference="house-projects" label="Проект дома">
        <TextField source="name" />
      </ReferenceField>
      <TextField source="notes" label="Заметки" />
      <BooleanField source="isConfirmed" label="Подтвержден" />
      <DateField source="createdAt" label="Дата выбора" />
    </Datagrid>
  </List>
); 