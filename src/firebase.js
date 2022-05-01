import { getApp, getApps, initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  getDocFromCache,
  updateDoc,
  getDoc,
} from "firebase/firestore";

const config = {
  apiKey: "AIzaSyDQ1VJnFSJpdIO6reH4IBpxNz8rGzAYE7s",
  appId: "1:643529715159:web:4c405430a17b93c3876f92",
  projectId: "venn-55e57",
};

export const app = getApps().length === 0 ? initializeApp(config) : getApp();

export const db = getFirestore(app);

function parseDocument(document) {
  return { id: document.id, ...document.data() };
}

export async function getAll(name) {
  const snapshot = await getDocs(query(collection(db, name)));
  return snapshot.docs.map(parseDocument);
}

export async function getOne(name, id) {
  const snapshot = await getDocFromCache(doc(db, name, id));
  return parseDocument(snapshot);
}

export async function updateUrl(project, url, title) {
  console.log(project);
  const docRef = doc(db, "projects", project.id);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  console.log("aaaaaaaaaaaaaaaaaaaaaa");
  console.log(data);
  if (data.urls) {
    await updateDoc(docRef, {
      urls: [...data.urls, { url, title }],
    });
  } else {
    await updateDoc(docRef, {
      urls: [{ url, title }],
    });
  }
}
