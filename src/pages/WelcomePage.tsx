import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const history = useHistory();

  const handleCreateForm = () => {
    history.push("/select-user"); // Redirige a la pantalla de selección de empresa o cualquier otra vista inicial
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Bienvenido</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid className="ion-text-center">
          <IonRow>
            <IonCol>
              <IonText>
                <h1>¡Bienvenido a la aplicación de formularios!</h1>
              </IonText>
              <IonText>
                <p>Presiona el botón para crear un nuevo formulario</p>
              </IonText>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleCreateForm}>
                Crear nuevo formulario
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default WelcomePage;
