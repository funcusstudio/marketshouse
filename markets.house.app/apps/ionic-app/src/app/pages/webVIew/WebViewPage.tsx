import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonProgressBar,
} from '@ionic/react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const WebViewPage: React.FC = () => {
  const query = useQuery();
  const url = query.get('url');

  const [loading, setLoading] = useState(true);

  if (!url) {
    return (
      <IonPage>

      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle></IonTitle>
        </IonToolbar>
        {/* Прогресс-бар загрузки */}
        {loading && <IonProgressBar type="indeterminate" />}
      </IonHeader>

      <IonContent fullscreen>
        <iframe
          src={url}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          onLoad={() => setLoading(false)} // когда iframe загрузится — скрываем прогресс
          onError={() => setLoading(false)} // если ошибка — тоже скрываем
          title="Embedded WebView"
        />
      </IonContent>
    </IonPage>
  );
};

export default WebViewPage;