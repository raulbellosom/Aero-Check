import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const SelectUserAndCompany: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleNext = () => {
    if (selectedUser && selectedCompany) {
      localStorage.setItem("selectedUser", selectedUser);
      localStorage.setItem("selectedCompany", selectedCompany);
      history.push("/select-contract");
    } else {
      setError("Por favor selecciona un usuario y una empresa.");
    }
  };

  const handleOut = () => {
    history.push("/");
  };

  if (!data) {
    return <div>Cargando...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seleccionar Usuario y Empresa</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSelect
                placeholder="Seleccionar Usuario"
                onIonChange={(e) => {
                  setSelectedUser(e.detail.value);
                  setError(null); // Limpiar el error si selecciona un valor
                }}
              >
                {data.users.map((user: any) => (
                  <IonSelectOption key={user.id} value={user.name}>
                    {user.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonSelect
                placeholder="Seleccionar Empresa"
                onIonChange={(e) => {
                  setSelectedCompany(e.detail.value);
                  setError(null); // Limpiar el error si selecciona un valor
                }}
              >
                {data.companies.map((company: any) => (
                  <IonSelectOption key={company.id} value={company.name}>
                    {company.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
          </IonRow>

          {error && (
            <IonRow>
              <IonCol>
                <IonText color="danger">{error}</IonText>
              </IonCol>
            </IonRow>
          )}

          <IonRow>
            <IonCol>
              <IonButton expand="block" onClick={handleNext}>
                Siguiente
              </IonButton>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" color="danger" onClick={handleOut}>
                Salir del formulario
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SelectUserAndCompany;
