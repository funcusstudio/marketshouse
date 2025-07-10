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
  IonSearchbar, IonButtons, IonBackButton
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
  houseProjectsService,
  CottageSettlement,
} from '../../services/house-projects.service';

const LocationSearchPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchText, setSearchText] = useState(searchParams.get('query') || '');
  const [settlements, setSettlements] = useState<CottageSettlement[]>([]);
  const [loading, setLoading] = useState(false);

  const searchSettlements = async (query: string) => {
    try {
      setLoading(true);
      const response = await houseProjectsService.searchCottageSettlements(query);
      // Извлекаем массив из response.data.data
      setSettlements(response.data.data || []);
    } catch (error) {
      console.error('Ошибка поиска:', error);
      setSettlements([]); // Очищаем при ошибке
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchText.trim()) {
      searchSettlements(searchText);
      history.replace(`/search-location?query=${encodeURIComponent(searchText)}`);
    } else {
      setSettlements([]);
      history.replace('/search-location');
    }
  }, [searchText, history]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const openWebView = (url: string) => {
    history.push(`/webview?url=${encodeURIComponent(url)}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle>Поиск</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar
          value={searchText}
          onIonChange={(e) => setSearchText(e.detail.value!)}
          placeholder="Введите местоположение"
          debounce={500}
        />
        {loading ? (
          <div className="spinner-container">
            <IonSpinner name="crescent" />
            <p>Идёт поиск...</p>
          </div>
        ) : settlements.length === 0 ? (
          <IonCard>
            <IonCardContent>
              <IonText color="medium">
                Ничего не найдено. Попробуйте другой запрос.
              </IonText>
            </IonCardContent>
          </IonCard>
        ) : (
          <IonGrid>
            <IonRow>
              {settlements.map((settlement) => (
                <IonCol size="12" sizeMd="6" sizeLg="4" key={settlement.id}>
                  <IonCard className="project-card">
                    {settlement.mainImage && (
                      <div className="project-image-container">
                        <IonImg
                          src={settlement.mainImage}
                          alt={settlement.name}
                          className="project-image"
                        />
                      </div>
                    )}
                    <IonCardHeader>
                      <IonCardTitle>{settlement.name}</IonCardTitle>
                      <IonCardSubtitle>
                        <div className="price-container">
                          <span>{formatPrice(settlement.price)}</span>
                        </div>
                      </IonCardSubtitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <div
                        dangerouslySetInnerHTML={{ __html: settlement.shortDescription }}
                        className="project-description"
                      />
                      <div className="card-actions">
                        <IonButton
                          onClick={() => openWebView(settlement.permalink)}
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
      </IonContent>
    </IonPage>
  );
};

export default LocationSearchPage;