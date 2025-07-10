import {
  IonBackButton,
  IonButtons,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useState } from 'react';

export const PersonalCabinet: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [permalink, setPermalink] = useState('');
  const [price, setPrice] = useState(0);
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="app-header">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Личный кабинет</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonItem>
        <IonLabel position="floating">Name</IonLabel>
        <IonInput
          type="text"
          value={name}
          onIonChange={(e) => setName(e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">description</IonLabel>
        <IonInput
          type="text"
          value={description}
          onIonChange={(e) => setDescription(e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">permalink</IonLabel>
        <IonInput
          type="text"
          value={permalink}
          onIonChange={(e) => setPermalink(e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="floating">price</IonLabel>
        <IonInput
          type="number"
          value={price}
          onIonChange={(e) => setPrice(Number(e.detail.value!))}
        />
      </IonItem>


      <IonItem>
        <IonLabel position="floating">Length</IonLabel>
        <IonInput
          type="text"
          value={length}
          onIonChange={(e) => setLength(e.detail.value!)}
        />
      </IonItem>


      <IonItem>
        <IonLabel position="floating">Width</IonLabel>
        <IonInput
          type="text"
          value={width}
          onIonChange={(e) => setWidth(e.detail.value!)}
        />
      </IonItem>


      <IonItem>
        <IonLabel position="floating">Height</IonLabel>

        <IonInput
          type="text"
          value={height}
          onIonChange={(e) => setHeight(e.detail.value!)}
        />
      </IonItem>


    </IonPage>
  );
};
