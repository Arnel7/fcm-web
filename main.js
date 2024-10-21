// Importer les modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getMessaging,
  onMessage,
  getToken,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js";

// Configuration Firebase : remplaces part tes données
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

// Demander l’autorisation pour les notifications
export async function requestPermission() {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      await registerServiceWorkerAndGetToken();
    } else {
      console.warn("Permission denied for notifications.");
    }
  } catch (error) {
    console.error("Erreur lors de la demande de permission:", error);
  }
}

// Enregistrer le Service Worker et récupérer le token FCM
async function registerServiceWorkerAndGetToken() {
  try {
    const registration = await navigator.serviceWorker.register(
      "/fcmweb/firebase-messaging-sw.js"
    );
    console.log("Service Worker enregistré avec succès:", registration);

    const currentToken = await getToken(messaging, {
      serviceWorkerRegistration: registration,
    });
    if (currentToken) {
      console.log("Token FCM récupéré:", currentToken);
      document.getElementById("token").innerText = currentToken;
    } else {
      console.warn(
        "Aucun token disponible. Veuillez autoriser les notifications."
      );
    }
  } catch (error) {
    console.error("Erreur lors de l’enregistrement du Service Worker:", error);
  }
}

// Gérer les messages en premier plan
onMessage(messaging, (payload) => {
  console.log("Message reçu:", payload);
  alert(
    `Notification: ${payload.notification.title} - ${payload.notification.body}`
  );
});
