import { Handler, HandlerEvent } from "@netlify/functions";
import { db } from "../../src/firebase-config";
import { doc, getDoc } from "firebase/firestore";

const handler: Handler = async (
  event: HandlerEvent
) => {
  const id = event.queryStringParameters!.id;
  const clickedX = Number(event.queryStringParameters!.clickedX!);
  const clickedY = Number(event.queryStringParameters!.clickedY!);

  if (id) {
    const docRef = doc(db, "Characters", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { posX, posY } = docSnap.data();
      if (
        clickedX < posX.max &&
        clickedX > posX.min &&
        clickedY < posY.max &&
        clickedY > posY.min
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
