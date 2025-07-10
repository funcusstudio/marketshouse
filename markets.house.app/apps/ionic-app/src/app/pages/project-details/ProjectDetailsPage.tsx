import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonSpinner,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonText,
  IonButton,
  IonTextarea,
  IonItem,
  IonLabel,
  IonList,
  IonToast,
  IonAlert
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { houseProjectsService, HouseProject } from '../../services/house-projects.service';
import './ProjectDetailsPage.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface ProjectDetailsParams {
  id: string;
}

export const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<ProjectDetailsParams>();
  const { user } = useAuth();
  const [project, setProject] = useState<HouseProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 4000,
    },
  };

  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const response = await houseProjectsService.getProject(parseInt(id));
        setProject(response.data);
      } catch (error) {
        console.error('Ошибка загрузки проекта:', error);
        setToastMessage('Не удалось загрузить информацию о проекте');
        setShowToast(true);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSelectProject = async () => {
    if (!user) {
      setToastMessage('Пожалуйста, войдите в систему чтобы выбрать проект');
      setShowToast(true);
      return;
    }

    if (user.userType !== 'client') {
      setToastMessage('Только клиенты могут выбирать проекты');
      setShowToast(true);
      return;
    }

    try {
      if(project) {
        await houseProjectsService.selectProject(project.id, notes);
        setToastMessage('Проект успешно выбран!');
        setShowToast(true);
        setNotes('');
      } else {
        setToastMessage('Проект не выбран!');
      }
    } catch (error) {
      console.error('Ошибка при выборе проекта:', error);
      setToastMessage('Не удалось выбрать проект. Пожалуйста, попробуйте снова.');
      setShowToast(true);
    }
  };

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Загрузка...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <div className="spinner-container">
            <IonSpinner name="crescent" />
            <p>Загрузка информации о проекте...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!project) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" />
            </IonButtons>
            <IonTitle>Проект не найден</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonCard>
            <IonCardContent>
              <IonText color="danger">
                Проект не найден или был удален.
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
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Информация о проекте</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {project.images && project.images.length > 0 && (
          <Swiper 
            modules={[Pagination, Autoplay]}
            pagination={true} 
            autoplay={{ delay: 4000 }}
            className="project-slides"
          >
            {project.images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="slide-image-container">
                  <IonImg src={image.src} alt={image.alt || project.name} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="ion-padding">
          <IonCard className="project-details-card">
            <IonCardHeader>
              <IonCardTitle>{project.name}</IonCardTitle>
              <div className="price-section">
                {project.onSale && project.salePrice ? (
                  <>
                    <div className="original-price">{formatPrice(project.price)}</div>
                    <div className="sale-price">{formatPrice(project.salePrice)}</div>
                    <div className="discount-badge">
                      Скидка {Math.round((1 - project.salePrice / project.price) * 100)}%
                    </div>
                  </>
                ) : (
                  <div className="current-price">{formatPrice(project.price)}</div>
                )}
              </div>
            </IonCardHeader>
            <IonCardContent>
              <div dangerouslySetInnerHTML={{ __html: project.description }} className="project-full-description" />
              
              {project.attributes && project.attributes.length > 0 && (
                <div className="attributes-section">
                  <h3>Характеристики</h3>
                  <IonList lines="none">
                    {project.attributes.map(attr => (
                      <IonItem key={attr.id}>
                        <IonLabel>
                          <h3>{attr.name}</h3>
                          <p>{attr.options.join(', ')}</p>
                        </IonLabel>
                      </IonItem>
                    ))}
                  </IonList>
                </div>
              )}

              {project.categories && project.categories.length > 0 && (
                <div className="categories-section">
                  <h3>Категории</h3>
                  <div className="categories-list">
                    {project.categories.map(category => (
                      <div key={category.id} className="category-tag">
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {user && user.userType === 'client' && (
                <div className="select-project-section">
                  <h3>Выбрать этот проект</h3>
                  <IonItem>
                    <IonLabel position="stacked">Примечания (опционально)</IonLabel>
                    <IonTextarea
                      value={notes}
                      onIonChange={e => setNotes(e.detail.value!)}
                      placeholder="Укажите дополнительные пожелания или комментарии..."
                      rows={4}
                    />
                  </IonItem>
                  <IonButton 
                    expand="block" 
                    onClick={() => setShowAlert(true)}
                    className="select-button"
                    color='danger'
                  >
                    Выбрать проект
                  </IonButton>
                </div>
              )}

              <div className="external-link-section">
                <IonButton 
                  expand="block" 
                  fill="outline" 
                  href={project.permalink} 
                  target="_blank"
                  rel="noopener noreferrer"
                  color="danger"
                >
                  Посмотреть на сайте
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="bottom"
        />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Подтверждение"
          message="Вы уверены, что хотите выбрать этот проект?"
          buttons={[
            {
              text: 'Отмена',
              role: 'cancel',
            },
            {
              text: 'Выбрать',
              handler: handleSelectProject
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
}; 