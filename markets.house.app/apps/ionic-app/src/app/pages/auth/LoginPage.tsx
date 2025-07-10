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
  useIonToast, IonSelect, IonSelectOption
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthStore } from '../../store/auth.store';

export const LoginPage: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userType, setUserType] = useState<'client' | 'executor'>('client');

  const { login, register } = useAuthStore();
  const history = useHistory();
  const [present] = useIonToast();

  const handleSubmit = async () => {
    try {
      let success;
      
      if (isRegister) {
        success = await register({
          email,
          password,
          phoneNumber,
          userType,
        });
      } else {
        success = await login(email, password);
      }

      if (success) {
        history.replace('/home');
      } else {
        present({
          message: 'Ошибка авторизации',
          duration: 2000,
          color: 'danger',
        });
      }
    } catch (error) {
      present({
        message: 'Произошла ошибка',
        duration: 2000,
        color: 'danger',
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="app-header">
          <IonTitle>{isRegister ? 'Регистрация' : 'Вход'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonItem>
          <IonLabel position="floating">Email</IonLabel>
          <IonInput
            type="email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
          />
        </IonItem>

        <IonItem>
          <IonLabel position="floating">Пароль</IonLabel>
          <IonInput
            type="password"
            value={password}
            onIonChange={(e) => {
              console.log('Пароль:', e.detail.value);
              setPassword(e.detail.value ?? '');
            }}
          />
        </IonItem>

        {isRegister && (
          <>

            <IonItem>
              <IonLabel position="floating">Телефон</IonLabel>
              <IonInput
                type="tel"
                value={phoneNumber}
                onIonChange={e => setPhoneNumber(e.detail.value!)}
              />
            </IonItem>


            <IonItem>
              <IonLabel>Тип пользователя</IonLabel>
              <IonSelect
                value={userType}
                onIonChange={e => setUserType(e.detail.value)}
              >
                <IonSelectOption value="client">Клиент</IonSelectOption>
                <IonSelectOption value="executor">Исполнитель</IonSelectOption>
              </IonSelect>
            </IonItem>

          </>
        )}

        <IonButton expand="block" onClick={handleSubmit} className="ion-margin-top app-button-outline">
          {isRegister ? 'Зарегистрироваться' : 'Войти'}
        </IonButton>

        <IonButton 
          expand="block" 
          fill="clear"
          onClick={() => setIsRegister(!isRegister)}
          className="app-button"
        >
          {isRegister ? 'Уже есть аккаунт?' : 'Создать аккаунт'}
        </IonButton>
      </IonContent>
    </IonPage>
  );
}; 