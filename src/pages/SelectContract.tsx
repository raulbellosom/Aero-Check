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
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";

const SelectContract: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [selectedContract, setSelectedContract] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    const storedCompany = localStorage.getItem("selectedCompany");
    if (storedCompany) {
      setSelectedCompany(storedCompany);
    }

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
    if (selectedContract) {
      localStorage.setItem("selectedContract", String(selectedContract));
      history.push("/contract-questions");
    } else {
      setError("Por favor selecciona un contrato.");
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  if (!data || !selectedCompany) {
    return <div>Cargando...</div>;
  }

  const company = data.companies.find((c: any) => c.name === selectedCompany);
  const contracts = data.contracts.filter(
    (contract: any) => contract.companyId === company.id
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seleccionar Contrato</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonSelect
                placeholder="Seleccionar Contrato"
                onIonChange={(e) => {
                  setSelectedContract(e.detail.value);
                  setError(null); // Limpiar el error al seleccionar un contrato
                }}
              >
                {contracts.map((contract: any) => (
                  <IonSelectOption key={contract.id} value={contract.id}>
                    {contract.name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              {selectedContract && (
                <IonImg
                  src={`path/to/contract_image_${selectedContract}.jpg`}
                />
              )}
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
              <IonButton expand="block" onClick={handleBack} color="medium">
                Atrás
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" onClick={handleNext}>
                Siguiente
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default SelectContract;
