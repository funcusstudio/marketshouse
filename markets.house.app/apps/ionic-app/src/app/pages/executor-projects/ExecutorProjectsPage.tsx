import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonText,
  IonList,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonAlert,
  IonToast
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { houseProjectsService, UserHouseProject } from '../../services/house-projects.service';
import { calendarOutline, homeOutline, personOutline } from 'ionicons/icons';
import './ExecutorProjectsPage.css';
import { useIonRouter } from '@ionic/react';

export const ExecutorProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [userProjects, setUserProjects] = useState<UserHouseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const router = useIonRouter();

  const loadUserProjects = async () => {
    if (!user || user.userType !== 'executor') {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await houseProjectsService.getProjectForExecutor();
      console.log("response - ", response)
      setUserProjects(response.data.data);
    } catch (error) {
      console.error('Ошибка загрузки выбранных проектов:', error);
      setToastMessage('Не удалось загрузить выбранные проекты');
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserProjects();
  }, [user]);

  const handleRefresh = async (event: CustomEvent) => {
    await loadUserProjects();
    event.detail.complete();
  };

  const formatDate = (dateString: Date | string) => {
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const onSelectProject = async (idProject: number) => {
    await houseProjectsService.selectProjectByExecutor(idProject)
    setToastMessage("Вы выбрали проект!")
    router.push('/my-projects', 'forward', 'pop');
  }

  if (!user) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Заказы для исполнения</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <IonText color="medium">
                Пожалуйста, войдите в систему, чтобы увидеть выбранные проекты.
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }

  if (user.userType !== 'executor') {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Заказы для исполнения</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <IonText color="medium">
                Функция доступна только для Исполнителей.
              </IonText>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Заказы для исполнения</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {loading ? (
          <div className="spinner-container">
            <IonSpinner name="crescent" />
            <p>Загрузка проектов...</p>
          </div>
        ) : userProjects.length === 0 ? (
          <IonCard>
            <IonCardContent className="empty-list">
              <IonIcon icon={homeOutline} size="large" color="medium" />
              <IonText color="medium">
                У вас пока нет выбранных проектов.
              </IonText>
              <IonButton routerLink="/" fill="outline">
                Перейти к выбору проектов
              </IonButton>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonList>
            {userProjects.map((userProject) => (
              <div
                style={{
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  padding: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  margin: '12px',
                }}
              >
                <h2
                  style={{
                    fontSize: '20px',
                    fontWeight: 600,
                    marginBottom: '12px',
                  }}
                >
                  Заказ №{userProject.id}
                </h2>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <IonIcon icon={homeOutline} style={{ marginRight: '8px' }} />
                  <span>Проект: {userProject.houseProject?.name}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}
                >
                  <IonIcon
                    icon={personOutline}
                    style={{ marginRight: '8px' }}
                  />
                  <span>Клиент: {userProject.user?.firstName}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '16px',
                  }}
                >
                  <IonIcon
                    icon={calendarOutline}
                    style={{ marginRight: '8px' }}
                  />
                  <span>Создан: {formatDate(userProject.createdAt)}</span>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <IonButton
                    expand="block"
                    color="danger"
                    style={{
                      width: '100%',
                      maxWidth: '240px',
                      borderRadius: '10px',
                    }}
                    onClick={() => {
                      onSelectProject(userProject.id)
                    }}
                  >
                    Принять заказ
                  </IonButton>
                  <IonButton
                    expand="block"
                    color="danger"
                    routerLink={`/executor-projects-details/${userProject.id}`}
                    style={{
                      width: '100%',
                      maxWidth: '240px',
                      borderRadius: '10px',
                    }}
                  >
                    Подробнее
                  </IonButton>
                </div>
              </div>
            ))}
          </IonList>
        )}

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Подтверждение"
          message="Вы уверены, что хотите удалить этот проект из избранного?"
          buttons={[
            {
              text: 'Отмена',
              role: 'cancel',
            },
            {
              text: 'Удалить',
              role: 'destructive',
              handler: () => {
                // Здесь будет логика удаления проекта
                // Реализация будет добавлена в будущем
                setToastMessage(
                  'Функция удаления будет доступна в следующем обновлении'
                );
                setShowToast(true);
              },
            },
          ]}
        />

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="bottom"
        />
      </IonContent>
    </IonPage>
  );
};