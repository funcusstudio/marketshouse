import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonContent,
  IonButton,
  IonText
} from '@ionic/react';
import { useState } from 'react';


export const SignatureIssue: React.FC = () => {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);


  const pickFile = async () => {
    if (!isReady) {
      console.log('⏳ WebView not ready');
      setError('WebView not ready yet');
      return;
    }


  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="app-header">
          <IonTitle>Подпись документа</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={pickFile} disabled={!isReady}>
          Выбрать файл
        </IonButton>
        {result && (
          <IonText color="success">
            <p>{result}</p>
          </IonText>
        )}
        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};