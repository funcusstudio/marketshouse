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
  IonText,
  IonItem,
  IonLabel,
  IonList,
  IonToast,
  IonCardSubtitle, IonButton, IonModal, IonDatetime
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import {
  houseProjectsService,
  ReportModel,
  ReportsResponse,
  UserHouseProject
} from '../../services/house-projects.service';
import './MyProjectsDetailsPage.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

interface ProjectDetailsParams {
  id: string;
}

export const MyProjectDetailsPage: React.FC = () => {
  const { id } = useParams<ProjectDetailsParams>();
  const { user } = useAuth();
  const [project, setProject] = useState<UserHouseProject | null>(null);
  const [reports, setReports] = useState<ReportsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]); // Сегодня
  const [showCalendar, setShowCalendar] = useState(false);




  useEffect(() => {
    const loadProject = async () => {
      try {
        setLoading(true);
        const response = await houseProjectsService.getUserProjectsById(parseInt(id));
        console.log(response);
        setProject(response.data);
        const responseReport = await houseProjectsService.getReport(parseInt(id));
        console.log("responseReport - ", responseReport);
        setReports(responseReport.data);
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



  // Функция для получения отчета за выбранную дату
  const getReportForDate = (date: string): ReportModel | undefined => {
    if (!reports || !reports.reports) return undefined;
    const selected = new Date(date).toISOString().split('T')[0]; // YYYY-MM-DD
    return reports.reports.find((report) => {
      const reportDate = new Date(report.createdAt).toISOString().split('T')[0];
      return reportDate === selected;
    });
  };

  const currentReport = getReportForDate(selectedDate);

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
        <div className="ion-padding">
          <IonCard className="project-details-card">
            <IonCardHeader>
              <IonCardSubtitle>
                Дата создания -{" "}
                {project.createdAt
                  ? (() => {
                    const date = new Date(project.createdAt);
                    const months = [
                      "января",
                      "февраля",
                      "марта",
                      "апреля",
                      "мая",
                      "июня",
                      "июля",
                      "августа",
                      "сентября",
                      "октября",
                      "ноября",
                      "декабря",
                    ];
                    return `${date.getDate().toString().padStart(2, "0")} ${
                      months[date.getMonth()]
                    } ${date.getFullYear()}г`;
                  })()
                  : "Нет даты"}
              </IonCardSubtitle>
              <IonCardTitle>{project.houseProject?.name}</IonCardTitle>
              <IonCardTitle>Заказ -{project.id}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div
                dangerouslySetInnerHTML={{ __html: project.houseProject?.description }}
                className="project-full-description"
              />

              {project.houseProject?.attributes && project.houseProject?.attributes.length > 0 && (
                <div className="attributes-section">
                  <h3>Характеристики</h3>
                  <IonList lines="none">
                    {project.houseProject?.attributes.map((attr) => (
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

              {project.houseProject?.categories && project.houseProject?.categories.length > 0 && (
                <div className="categories-section">
                  <h3>Категории</h3>
                  <div className="categories-list">
                    {project.houseProject?.categories.map((category) => (
                      <div key={category.id} className="category-tag">
                        {category.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{
                display: 'flex',
                flexDirection: 'row'
              }}>
              <IonCardTitle>Календарь строительства</IonCardTitle>
                <img style={{width: '32px', height: '32px'}} onClick={() => (window.location.href = `/construction-tracking/${id}`)}/>
              </div>
              <IonButton expand="block" onClick={() => setShowCalendar(true)}>
                Выбрать дату
              </IonButton>
              <IonCard>
                <IonCardHeader>
                  <IonCardSubtitle>
                    Прогресс на{" "}
                    {new Date(selectedDate).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  {currentReport ? (
                    <IonText>
                      {currentReport.description} (Добавлено:{" "}
                      {new Date(currentReport.createdAt).toLocaleDateString("ru-RU", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })})
                    </IonText>
                  ) : (
                    <IonText color="medium">Нет отчета на выбранную дату</IonText>
                  )}
                </IonCardContent>
              </IonCard>
            </IonCardContent>
          </IonCard>
        </div>

        <IonModal isOpen={showCalendar} onDidDismiss={() => setShowCalendar(false)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => setShowCalendar(false)}>Отмена</IonButton>
              </IonButtons>
              <IonTitle>Выберите дату</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowCalendar(false)}>Готово</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonDatetime
              presentation="date"
              value={selectedDate}
              onIonChange={(e) => {
                if (e.detail.value) {
                  setSelectedDate(e.detail.value);
                  setShowCalendar(false);
                }
              }}
            />
          </IonContent>
        </IonModal>

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