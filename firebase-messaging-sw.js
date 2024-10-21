// firebase-messaging-sw.js

importScripts("https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js"
);

// Configuration Firebase: remplaces par tes données
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
};

// Initialiser Firebase dans le Service Worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Gérer les messages en arrière-plan
messaging.onBackgroundMessage((payload) => {
  console.log("Message en arrière-plan reçu:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon,
  });
});
