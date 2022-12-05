import { Handler, HandlerEvent } from "@netlify/functions";
import { db } from "../../src/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const handler: Handler = async (
  event: HandlerEvent
) => {
  const id = event.queryStringParameters!.id;
  const clickedX = Number(event.queryStringParameters!.clickedX!);
  const clickedY = Number(event.queryStringParameters!.clickedY!);
  const width = Number(event.queryStringParameters!.width);
  const height = Number(event.queryStringParameters!.height);
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
        return {
          statusCode: 200,
          body: JSON.stringify(docSnap.data().name),
        };
      }
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(null),
  };
};

export { handler };
