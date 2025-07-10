import {
  Show,
  SimpleShowLayout,
  TextField,
  DateField,
  NumberField,
  BooleanField,
  ArrayField,
  Datagrid,
  UrlField,
  RichTextField,
  ImageField,
  TabbedShowLayout,
  Tab
} from 'react-admin';

export const HouseProjectShow = () => (
  <Show>
    <TabbedShowLayout>
      <Tab label="Основная информация">
        <TextField source="name" label="Название" />
        <RichTextField source="shortDescription" label="Краткое описание" />
        <NumberField source="price" label="Цена" options={{ style: 'currency', currency: 'RUB' }} />
        {/* Условное отображение, если есть скидка */}
        <NumberField source="salePrice" label="Цена со скидкой" options={{ style: 'currency', currency: 'RUB' }} />
        <BooleanField source="onSale" label="Акция" />
        <UrlField source="permalink" label="Ссылка на сайт" />
        <BooleanField source="isActive" label="Активен" />
        <DateField source="dateCreated" label="Дата создания" />
        <DateField source="dateModified" label="Дата изменения" />
        <DateField source="syncedAt" label="Последняя синхронизация" />
      </Tab>
      
      <Tab label="Характеристики">
        <ArrayField source="attributes">
          <Datagrid bulkActionButtons={false}>
            <TextField source="name" label="Название" />
            <TextField source="options" label="Значения" />
          </Datagrid>
        </ArrayField>
        
        <TextField label="Габариты" source="dimensions.length" />
        <TextField label="Ширина" source="dimensions.width" />
        <TextField label="Высота" source="dimensions.height" />
        
        <ArrayField source="categories">
          <Datagrid bulkActionButtons={false}>
            <TextField source="name" label="Категория" />
          </Datagrid>
        </ArrayField>
      </Tab>
      
      <Tab label="Описание">
        <RichTextField source="description" label="Описание" />
      </Tab>
      
      <Tab label="Изображения">
        <ArrayField source="images">
          <Datagrid bulkActionButtons={false}>
            <TextField source="name" label="Название" />
            <ImageField source="src" label="Изображение" />
          </Datagrid>
        </ArrayField>
      </Tab>
    </TabbedShowLayout>
  </Show>
); 