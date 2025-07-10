import {
  Create,
  SimpleForm,
  TextInput,
  BooleanInput,
  SelectInput,
  required,
  email
} from 'react-admin';

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="email" validate={[required(), email()]} />
      <TextInput source="password" type="password" validate={[required()]} />
      <TextInput source="firstName" label="Имя" validate={[required()]} />
      <TextInput source="lastName" label="Фамилия" validate={[required()]} />
      <TextInput source="phoneNumber" label="Телефон" />
      <SelectInput source="userType" label="Тип пользователя" choices={[
        { id: 'client', name: 'Клиент' },
        { id: 'executor', name: 'Исполнитель' },
      ]} validate={[required()]} />
      <BooleanInput source="isAdmin" label="Администратор" />
      <BooleanInput source="isActive" label="Активен" defaultValue={true} />
    </SimpleForm>
  </Create>
); 