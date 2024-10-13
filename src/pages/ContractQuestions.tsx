import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonButton,
} from "@ionic/react";

const ContractQuestions: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [responses, setResponses] = useState<any>({});

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

  useEffect(() => {
    const selectedContractId = Number(localStorage.getItem("selectedContract"));
    if (data) {
      const contract = data.contracts.find(
        (c: any) => c.id === selectedContractId
      );
      if (contract) {
        setQuestions(
          contract.questions.map((qId: any) =>
            data.questions.find((q: any) => q.id === qId)
          )
        );
      }
    }
  }, [data]);

  const handleResponseChange = (questionId: number, value: string) => {
    setResponses((prev: string) => ({
      ...responses,
      [questionId]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Respuestas:", responses);
  };

  if (!questions.length) {
    return <div>Cargando preguntas...</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Preguntas del Contrato</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {questions.map((question) => (
          <IonItem key={question.id}>
            <IonLabel>{question.text}</IonLabel>
            <IonSelect
              placeholder="Seleccionar respuesta"
              onIonChange={(e) =>
                handleResponseChange(question.id, e.detail.value)
              }
            >
              <IonSelectOption value="SI">SI</IonSelectOption>
              <IonSelectOption value="NO">NO</IonSelectOption>
              <IonSelectOption value="NO APLICA">NO APLICA</IonSelectOption>
            </IonSelect>
          </IonItem>
        ))}
        <IonButton onClick={handleSubmit}>Enviar Respuestas</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ContractQuestions;
