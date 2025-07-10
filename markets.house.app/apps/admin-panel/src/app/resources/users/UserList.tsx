import {
  List,
  Datagrid,
  TextField,
  BooleanField,
  EditButton,
  DeleteButton,
  TextInput,
  SelectInput
} from 'react-admin';

const userFilters = [
  <TextInput source="firstName" label="Поиск по имени" alwaysOn />,
  <SelectInput source="userType" label="Тип пользователя" choices={[
    { id: 'client', name: 'Клиент' },
    { id: 'executor', name: 'Исполнитель' },
  ]} />,
];

export const UserList = () => (
  <List filters={userFilters}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="email" />
      <TextField source="firstName" label="Имя" />
      <TextField source="lastName" label="Фамилия" />
      <TextField source="phoneNumber" label="Телефон" />
      <TextField source="userType" label="Тип пользователя" />
      <BooleanField source="isAdmin" label="Администратор" />
      <BooleanField source="isActive" label="Активен" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
); 