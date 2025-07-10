import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import {
  houseProjectsService,
  HouseProject,
  UserHouseProject,
} from '../../services/house-projects.service';
import './HomePage.css';
import ImgPlace1 from '../../../assets/place_f1.png';
import ImgPlace2 from '../../../assets/place_f2.jpg';
import ImgPlace3 from '../../../assets/place_f3.jpg';
import ImgPlace4 from '../../../assets/place_f4.png';
import { useHistory } from 'react-router-dom';

const items = [
  {
    image: ImgPlace1,
    title: 'Коттеджный посёлок Хрустали',
    price: '33,000 ₽',
  },
  {
    image: ImgPlace2,
    title: 'Стол “Лайт” EGGER 25 мм',
    price: '4,036 ₽',
  },
  {
    image: ImgPlace3,
    title: 'Стол “Эстет” ЛДСП 22 мм',
    price: '4,680 ₽',
  },
  {
    image: ImgPlace4,
    title: 'Автосервис из сэндвич-панелей',
    price: '489,000 ₽',
  },
];

export const HomePage: React.FC = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<HouseProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<HouseProject[]>([]);
  const [userProjects, setUserProjects] = useState<UserHouseProject[]>([]);
  const loadProjects = async () => {
    try {
      setLoading(true);
      if (user?.userType === 'client') {
        const response = await houseProjectsService.getProjects();
        setProjects(response.data.data);
        setFilteredProjects(response.data.data);
        const responseUserProject = await houseProjectsService.getUserProjects();
        setUserProjects(responseUserProject.data.data);
      }
    } catch (error) {
      console.error('Ошибка загрузки проектов:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, [user]);

  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(
        (project) =>
          project.name.toLowerCase().includes(searchText.toLowerCase()) ||
          project.shortDescription.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchText, projects]);

  const handleRefresh = async (event: CustomEvent) => {
    await loadProjects();
    event.detail.complete();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const history = useHistory();

  const openWebView = (url: string) => {
    history.push(`/webview?url=${encodeURIComponent(url)}`);
  };

  const goToLocationSearch = () => {
    history.push('/search-location');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="app-header">
          <IonTitle>Главная</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonCard className="welcome-card">
          <IonCardHeader>
            <IonCardTitle>Добро пожаловать {user?.firstName}!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {user ? (
              <p>
                Вы вошли как{' '}
                {user?.userType === 'client' ? 'клиент' : 'исполнитель'}.
                {user?.userType === 'client' &&
                  ' Здесь вы можете выбрать проект дома для строительства.'}
              </p>
            ) : (
              <p>
                Пожалуйста, войдите в систему для полного доступа к возможностям
                приложения.
              </p>
            )}
          </IonCardContent>
        </IonCard>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '10px',
            margin: '10px 0',
          }}
        >
          <IonButton expand="block" color="danger" routerLink={"/tx-screen/1"}>Онлайн сделки</IonButton>
          <IonButton expand="block" color="danger" routerLink={`/webview?url=https://markets.house/affiliate-register/`}>Цифровая ипотека</IonButton>
          <IonButton expand="block" color="danger" routerLink={`/webview?url=https://sign.me/promo/`}>Выпуск подписи</IonButton>
          <IonButton expand="block" color="danger" routerLink={"/tx-screen/2"}>Безопасная сделка</IonButton>
        </div>

        <h2>Спецпредложения</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            justifyContent: 'space-between',
          }}
        >
          {items.map((item, index) => (
            <ProductCard
              key={index}
              image={item.image}
              title={item.title}
              price={item.price}
              handleOnClick={openWebView}
            />
          ))}
        </div>

        {user?.userType === 'executor' && (
          <IonCard className="card-my-zakaz">
            <IonCardHeader>
              <IonCardTitle>Мои текущие заказы</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton
                expand="block"
                className="select-button"
                color="danger"
                routerLink="/my-projects"
              >
                Посмотреть мои заказы
              </IonButton>
            </IonCardContent>
            <IonCardContent>
              <IonButton
                expand="block"
                className="select-button"
                color="danger"
                routerLink="/executor-projects"
              >
                Доступные для исполнения заказы
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}

        {user?.userType === 'client' && userProjects.length > 0 && (
          <IonCard className="card-my-zakaz">
            <IonCardHeader>
              <IonCardTitle>Мои текущие заказы</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton
                expand="block"
                className="select-button"
                color="danger"
                routerLink="/my-projects"
              >
                Посмотреть мои заказы
              </IonButton>
            </IonCardContent>
          </IonCard>
        )}
        {user?.userType === 'client' && (
          <>
            <div className="search-container">
              <IonSearchbar
                value={searchText}
                onIonChange={(e) => setSearchText(e.detail.value!)}
                placeholder="Что строим?"
              />
            </div>
            <div className="search-container">
              <IonSearchbar
                placeholder="Где строим?"
                onClick={goToLocationSearch}
                onFocus={goToLocationSearch}
              />
            </div>
            <h2>Проекты домов</h2>

            {loading ? (
              <div className="spinner-container">
                <IonSpinner name="crescent" />
                <p>Загрузка проектов...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <IonCard>
                <IonCardContent>
                  <IonText color="medium">
                    Проекты не найдены. Пожалуйста, попробуйте изменить критерии
                    поиска или обновите страницу.
                  </IonText>
                </IonCardContent>
              </IonCard>
            ) : (
              <IonGrid>
                <IonRow>
                  {filteredProjects.map((project) => (
                    <IonCol
                      size="12"
                      sizeMd="6"
                      sizeLg="4"
                      key={project.externalId}
                    >
                      <IonCard className="project-card">
                        {project.images && project.images.length > 0 && (
                          <div className="project-image-container">
                            <IonImg
                              src={project.images[0].src}
                              alt={project.name}
                              className="project-image"
                            />
                            {project.onSale && (
                              <div className="sale-badge">
                                <IonText color="light">АКЦИЯ</IonText>
                              </div>
                            )}
                          </div>
                        )}
                        <IonCardHeader>
                          <IonCardTitle>{project.name}</IonCardTitle>
                          <IonCardSubtitle>
                            <div className="price-container">
                              {project.onSale && project.salePrice ? (
                                <>
                                  <span className="original-price">
                                    {formatPrice(project.price)}
                                  </span>
                                  <span className="sale-price">
                                    {formatPrice(project.salePrice)}
                                  </span>
                                </>
                              ) : (
                                <span>{formatPrice(project.price)}</span>
                              )}
                            </div>
                          </IonCardSubtitle>
                        </IonCardHeader>
                        <IonCardContent>
                          <div
                            dangerouslySetInnerHTML={{ __html: project.shortDescription }}
                            className="project-description"
                          />
                          <div className="card-actions">
                            <IonButton
                              routerLink={`/projects/${project.externalId}`}
                              expand="block"
                              color="danger"
                            >
                              Подробнее
                            </IonButton>
                          </div>
                        </IonCardContent>
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

interface ProductCardProps {
  image: string;
  title: string;
  price: string;
  handleOnClick: (url: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
                                                   image,
                                                   title,
                                                   price,
                                                   handleOnClick,
                                                 }) => {
  return (
    <div
      style={{
        width: 'calc(50% - 10px)',
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
        overflow: 'hidden',
        marginBottom: '20px',
        display: 'flex',
        flexDirection: 'column',
      }}
      onClick={() => {
        if (title === 'Коттеджный посёлок Хрустали') {
          handleOnClick('https://markets.house/product/kottedzhnyj-poselok-kadricza/');
        } else {
          handleOnClick('https://markets.house/shop/');
        }
      }}
    >
      <img
        src={image}
        alt={title}
        style={{ width: '100%', height: '140px', objectFit: 'cover' }}
      />
      <div style={{ padding: '10px' }}>
        <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>
          {title}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#d62828' }}>
          Цена: {price}
        </div>
      </div>
    </div>
  );
};