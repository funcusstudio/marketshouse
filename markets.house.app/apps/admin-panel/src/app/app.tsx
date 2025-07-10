// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import { Admin, Resource } from 'react-admin';
import { authProvider } from './authProvider';
import { dataProvider } from './dataProvider';
import { People } from '@mui/icons-material';
import { DataProvider } from 'react-admin';

// Users resources
import { UserList } from './resources/users/UserList';
import { UserEdit } from './resources/users/UserEdit';
import { UserCreate } from './resources/users/UserCreate';

// House Projects resources
import { HouseProjectList } from './resources/house-projects/HouseProjectList';
import { HouseProjectShow } from './resources/house-projects/HouseProjectShow';
import { HouseProjectEdit } from './resources/house-projects/HouseProjectEdit';

// User House Projects resources
import { UserHouseProjectList } from './resources/user-house-projects/UserHouseProjectList';
import { UserHouseProjectShow } from './resources/user-house-projects/UserHouseProjectShow';
import { UserHouseProjectEdit } from './resources/user-house-projects/UserHouseProjectEdit';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';

function App() {
  return (
    <Admin 
      authProvider={authProvider}
      dataProvider={dataProvider as DataProvider}
      requireAuth
    >
      <Resource 
        name="users" 
        list={UserList} 
        edit={UserEdit} 
        create={UserCreate}
        icon={People}
        options={{ label: 'Пользователи' }}
      />
      <Resource 
        name="house-projects" 
        list={HouseProjectList} 
        show={HouseProjectShow} 
        edit={HouseProjectEdit} 
        icon={HomeIcon} 
        options={{ label: 'Проекты домов' }}
      />
      <Resource 
        name="user-house-projects" 
        list={UserHouseProjectList} 
        show={UserHouseProjectShow} 
        edit={UserHouseProjectEdit} 
        icon={FavoriteIcon} 
        options={{ label: 'Выбранные проекты' }}
      />
      {/* Добавьте другие ресурсы по мере необходимости */}
    </Admin>
  );
}

export default App;
