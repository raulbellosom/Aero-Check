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
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const SelectUserAndCompany: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
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
    }
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
      <IonContent>
        <IonSelect
          placeholder="Seleccionar Usuario"
          onIonChange={(e) => setSelectedUser(e.detail.value)}
        >
          {data.users.map((user: any) => (
            <IonSelectOption key={user.id} value={user.name}>
              {user.name}
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonSelect
          placeholder="Seleccionar Empresa"
          onIonChange={(e) => setSelectedCompany(e.detail.value)}
        >
          {data.companies.map((company: any) => (
            <IonSelectOption key={company.id} value={company.name}>
              {company.name}
            </IonSelectOption>
          ))}
        </IonSelect>

        <IonButton onClick={handleNext}>Siguiente</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default SelectUserAndCompany;
