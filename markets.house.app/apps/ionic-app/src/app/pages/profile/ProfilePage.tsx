import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonBackButton,
  useIonToast,
} from '@ionic/react';
import { useState, useEffect } from 'react';
import { apiService } from '../../services/api.service';

export const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [present] = useIonToast();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFirstName(parsedUser.firstName);
      setLastName(parsedUser.lastName);
      setPhoneNumber(parsedUser.phoneNumber || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/auth';
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await apiService.updateProfile(user.id, {
        firstName,
        lastName,
        phoneNumber,
      });

      localStorage.setItem('user', JSON.stringify({
        ...user,
        ...response.data,
      }));

      present({
        message: 'Профиль успешно обновлен',
        duration: 2000,
        color: 'success',
      });
    } catch (error) {
      present({
        message: 'Ошибка при обновлении профиля',
        duration: 2000,
        color: 'danger',
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="app-header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Профиль</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="stacked">Имя</IonLabel>
          <IonInput
            value={firstName}
            onIonChange={e => setFirstName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Фамилия</IonLabel>
          <IonInput
            value={lastName}
            onIonChange={e => setLastName(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="stacked">Телефон</IonLabel>
          <IonInput
            type="tel"
            value={phoneNumber}
            onIonChange={e => setPhoneNumber(e.detail.value!)}
          />
        </IonItem>

        <IonItem lines="none">
          <IonLabel>Тип пользователя</IonLabel>
          <IonLabel slot="end">
            {user?.userType === 'client' ? 'Клиент' : 'Исполнитель'}
          </IonLabel>
        </IonItem>

        <div className="ion-padding">
          <IonButton expand="block" onClick={handleUpdateProfile}>
            Сохранить изменения
          </IonButton>
          {/*<IonButton expand="block" color="danger" routerLink={`/personalCabinet`} >*/}
          {/*  Личный кабинет*/}
          {/*</IonButton>*/}
          <IonButton expand="block" color="danger" onClick={handleLogout}>
            Выйти
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}; 