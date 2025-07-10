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
  IonItem,
  IonLabel,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonNote,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonAlert,
  IonToast,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  houseProjectsService,
  UserHouseProject,
} from '../../services/house-projects.service';
import { calendarOutline, homeOutline } from 'ionicons/icons';
import './MyProjectsPage.css';

export const MyProjectsPage: React.FC = () => {
  const { user } = useAuth();
  const [userProjects, setUserProjects] = useState<UserHouseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const loadUserProjects = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    if (user.userType == 'client') {
      try {
        setLoading(true);
        const response = await houseProjectsService.getUserProjects();
        setUserProjects(response.data.data);
      } catch (error) {
        console.error('Ошибка загрузки выбранных проектов:', error);
        setToastMessage('Не удалось загрузить выбранные проекты');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    }

    if (user.userType == 'executor') {
      try {
        setLoading(true);
        const response = await houseProjectsService.getMyExecutedProjects();
        setUserProjects(response.data.data);
      } catch (error) {
        console.error('Ошибка загрузки выбранных проектов:', error);
        setToastMessage('Не удалось загрузить выбранные проекты');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadUserProjects();
  }, [user]);

  const handleRefresh = async (event: CustomEvent) => {
    await loadUserProjects();
    event.detail.complete();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: Date | string) => {
    const date =
      typeof dateString === 'string' ? new Date(dateString) : dateString;
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  if (!user) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Мои проекты</IonTitle>
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

  // if (user.userType !== 'client') {
  //   return (
  //     <IonPage>
  //       <IonHeader>
  //         <IonToolbar>
  //           <IonTitle>Мои проекты</IonTitle>
  //         </IonToolbar>
  //       </IonHeader>
  //       <IonContent className="ion-padding">
  //         <IonCard>
  //           <IonCardContent>
  //             <IonText color="medium">
  //               Функция доступна только для клиентов.
  //             </IonText>
  //           </IonCardContent>
  //         </IonCard>
  //       </IonContent>
  //     </IonPage>
  //   );
  // }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Мои выбранные проекты</IonTitle>
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
              <IonItemSliding key={userProject.id}>
                <IonItem
                  routerLink={`/my-projects-details/${userProject.id}`}
                  detail={true}
                  className="project-item"
                >
                  {userProject.houseProject?.images?.[0] && (
                    <div className="item-thumbnail" slot="start">
                      <img
                        src={userProject.houseProject.images[0].src}
                        alt={userProject.houseProject.name}
                      />
                    </div>
                  )}
                  <IonLabel>
                    <h2>{userProject.houseProject?.name}</h2>
                    <p className="price-label">
                      {userProject.houseProject?.price &&
                        formatPrice(userProject.houseProject.price)}
                    </p>
                    <div className="meta-info">
                      <span className="date-info">
                        <IonIcon icon={calendarOutline} />
                        Выбран: {formatDate(userProject.createdAt)}
                      </span>
                    </div>
                    {userProject.notes && (
                      <IonNote className="project-notes">
                        {userProject.notes}
                      </IonNote>
                    )}
                  </IonLabel>
                  {userProject.isConfirmed ? (
                    <IonBadge color="success" slot="end">
                      Подтвержден
                    </IonBadge>
                  ) : (
                    <IonBadge color="warning" slot="end">
                      Ожидает
                    </IonBadge>
                  )}
                </IonItem>

                <IonItemOptions side="end">
                  <IonItemOption
                    color="danger"
                    onClick={() => {
                      setSelectedProjectId(userProject.id);
                      setShowDeleteAlert(true);
                    }}
                  >
                    Удалить
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
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
