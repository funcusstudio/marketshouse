import { 
  List, 
  Datagrid, 
  TextField, 
  DateField, 
  NumberField, 
  BooleanField, 
  ShowButton, 
  EditButton,
  ImageField,
  FilterButton,
  SearchInput,
  BooleanInput,
  Filter
} from 'react-admin';

const HouseProjectFilter = (props: any) => (
  <Filter {...props}>
    <SearchInput source="name" alwaysOn />
  </Filter>
);

export const HouseProjectList = () => (
  <List filters={<HouseProjectFilter />}>
    <Datagrid rowClick="show">
      <TextField source="id" />
      <TextField source="name" label="Название" />
      <NumberField source="price" label="Цена" options={{ style: 'currency', currency: 'RUB' }} />
      <TextField source="area" label="Площадь (м²)" />
      <BooleanField source="isActive" label="Активен" />
      <DateField source="dateCreated" label="Дата добавления" />
      <ImageField source="mainImage" label="Изображение" />
    </Datagrid>
  </List>
); 