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
  IonGrid,
  IonRow,
  IonCol,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom"; // Importa useHistory

const ContractQuestions: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [responses, setResponses] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const history = useHistory(); // Crea el history

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
    setResponses((prev: any) => ({
      ...responses,
      [questionId]: value,
    }));
    setError(null); // Limpiar el mensaje de error si el usuario selecciona una respuesta
  };

  const handleSubmit = () => {
    if (questions.length !== Object.keys(responses).length) {
      setError("Por favor responde todas las preguntas antes de enviar.");
      return;
    }
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
      <IonContent className="ion-padding">
        <IonGrid>
          {questions.map((question) => (
            <IonRow key={question.id}>
              <IonCol>
                <IonItem>
                  <IonLabel>{question.text}</IonLabel>
                  <IonSelect
                    placeholder="Seleccionar respuesta"
                    onIonChange={(e) =>
                      handleResponseChange(question.id, e.detail.value)
                    }
                  >
                    <IonSelectOption value="SI">SI</IonSelectOption>
                    <IonSelectOption value="NO">NO</IonSelectOption>
                    <IonSelectOption value="NO APLICA">
                      NO APLICA
                    </IonSelectOption>
                  </IonSelect>
                </IonItem>
              </IonCol>
            </IonRow>
          ))}

          {error && (
            <IonRow>
              <IonCol>
                <IonText color="danger">{error}</IonText>
              </IonCol>
            </IonRow>
          )}

          {/* Botón para regresar al paso anterior */}
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                color="medium"
                onClick={() => history.goBack()}
              >
                Regresar
              </IonButton>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                onClick={handleSubmit}
                disabled={questions.length !== Object.keys(responses).length}
              >
                Enviar Respuestas
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ContractQuestions;
