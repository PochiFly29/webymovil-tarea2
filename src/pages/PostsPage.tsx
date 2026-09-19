import { useState, useRef } from "react";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonBadge,
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonFooter,
  IonInput
} from "@ionic/react";

import "./PostsPage.css";

interface LocationInfo {
  name: string;
  url: string;
}

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: LocationInfo;
  location: LocationInfo;
  image: string;
}

const PostsPage: React.FC = () => {
  const contentRef = useRef<HTMLIonContentElement | null>(null);

  const [personajes, setPersonajes] = useState<Character[]>([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState<number>(1);
  const [inputPagina, setInputPagina] = useState<string>("1");
  const [totalPaginas, setTotalPaginas] = useState<number>(1);

  const cargarPosts = (numPagina: number = 1) => {
    if (numPagina < 1 || (totalPaginas > 1 && numPagina > totalPaginas)) return;

    setCargando(true);
    setError("");

    fetch(`https://rickandmortyapi.com/api/character?page=${numPagina}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Respuesta no válida del servidor");
        }
        return response.json();
      })
      .then((datos) => {
        setPersonajes(datos.results);
        setTotalPaginas(datos.info.pages);
        setPagina(numPagina);
        setInputPagina(String(numPagina));
        contentRef.current?.scrollToTop(300);
      })
      .catch(() => {
        setError("Ocurrió un error al cargar los personajes.");
      })
      .finally(() => {
        setCargando(false);
      });
  };

  const manejarSaltoPagina = () => {
    const num = parseInt(inputPagina, 10);
    if (!isNaN(num) && num >= 1 && num <= totalPaginas) {
      if (num !== pagina) {
        cargarPosts(num);
      }
    } else {
      setInputPagina(String(pagina));
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tarea 2: Ionic + React (Rick and Morty Edition)</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} className="ion-padding">
        <div className="intro">
          <h1>Personajes</h1>
          <p>
            Presiona el botón para obtener información desde la API de Rick and Morty.
          </p>

          <IonButton onClick={() => cargarPosts(1)} disabled={cargando}>
            Cargar personajes
          </IonButton>
        </div>

        {cargando && (
          <div className="estado">
            <IonSpinner />
            <p>Cargando publicaciones...</p>
          </div>
        )}

        {error && (
          <IonText color="danger">
            <p>{error}</p>
          </IonText>
        )}

        <div className="posts-container">
          <IonGrid fixed>
            <IonRow>
              {personajes.map((personaje) => (
                <IonCol
                  key={personaje.id}
                  size="12"
                  size-sm="6"
                  size-md="4"
                  size-lg="3"
                >
                  <IonCard style={{ height: "100%", display: "flex", flexDirection: "column", margin: "4px" }}>
                    <img
                      src={personaje.image}
                      alt={personaje.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "https://placehold.co/300x300/222/fff?text=Sin+Imagen";
                      }}
                      style={{ width: "100%", height: "180px", objectFit: "cover" }}
                    />

                    <IonCardHeader>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: "8px"
                        }}
                      >
                        <IonCardTitle
                          style={{
                            fontSize: "1.05rem",
                            lineHeight: "1.2",
                            wordBreak: "break-word"
                          }}
                        >
                          {personaje.name}
                        </IonCardTitle>

                        <IonBadge
                          style={{ flexShrink: 0 }}
                          color={
                            personaje.status === "Alive"
                              ? "success"
                              : personaje.status === "Dead"
                              ? "danger"
                              : "medium"
                          }
                        >
                          {personaje.status}
                        </IonBadge>
                      </div>

                      <IonCardSubtitle style={{ marginTop: "4px" }}>
                        {personaje.species} • {personaje.gender}
                      </IonCardSubtitle>
                    </IonCardHeader>

                    <IonCardContent style={{ flexGrow: 1, fontSize: "0.85rem" }}>
                      <p><strong>Origen:</strong> {personaje.origin.name}</p>
                      <p><strong>Ubicación actual:</strong> {personaje.location.name}</p>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>

      {personajes.length > 0 && (
        <IonFooter>
          <IonToolbar>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 16px"
              }}
            >
              <IonButton
                fill="outline"
                size="small"
                disabled={pagina <= 1 || cargando}
                onClick={() => cargarPosts(pagina - 1)}
              >
                ← Anterior
              </IonButton>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "0.9rem" }}>Pág.</span>
                <IonInput
                  type="number"
                  min={1}
                  max={totalPaginas}
                  value={inputPagina}
                  disabled={cargando}
                  onIonInput={(e) => setInputPagina(e.detail.value ?? "")}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      manejarSaltoPagina();
                    }
                  }}
                  onIonBlur={manejarSaltoPagina}
                  style={{
                    width: "55px",
                    textAlign: "center",
                    border: "1px solid #777",
                    borderRadius: "6px",
                    minHeight: "32px",
                    padding: "0 4px"
                  }}
                />
                <IonText color="medium" style={{ fontSize: "0.9rem" }}>
                  de {totalPaginas}
                </IonText>
              </div>

              <IonButton
                fill="outline"
                size="small"
                disabled={pagina >= totalPaginas || cargando}
                onClick={() => cargarPosts(pagina + 1)}
              >
                Siguiente →
              </IonButton>
            </div>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default PostsPage;