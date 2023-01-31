import { doc, getDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const validateSelection = async (request: Request) => {
  const firebaseConfig = {
    apiKey: Deno.env.get("REACT_APP_API_KEY"),
    authDomain: Deno.env.get("REACT_APP_AUTH_DOMAIN"),
    projectId: Deno.env.get("REACT_APP_PROJECT_ID"),
    storageBucket: Deno.env.get("REACT_APP_STORAGE_BUCKET"),
    messagingSenderId: Deno.env.get("REACT_APP_MESSAGING_SENDER_ID"),
    appId: Deno.env.get("REACT_APP_APP_ID")
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const params = new URL(request.url).searchParams;

  const id = params.get("id");
  const clickedX = Number(params.get("clickedX"));
  const clickedY = Number(params.get("clickedY"));
  const width = Number(params.get("width"));
  const height = Number(params.get("height"));

  const relativeX = clickedX / width;
  const relativeY = clickedY / height;

  if (id) {
    const docRef = doc(db, "Characters", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { posX, posY } = docSnap.data();
      if (
        relativeX < posX.max &&
        relativeX > posX.min &&
        relativeY < posY.max &&
        relativeY > posY.min
      ) {
        return new Response(JSON.stringify(docSnap.data().name), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    }
  }

  return new Response(JSON.stringify(null), { status: 200 });
};

export default validateSelection;
export const config = { path: "/validate-selection" };
