import { useState, useEffect } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase-config";

export default function usePlayers() {
  const [players, setPlayers] = useState<DocumentData[]>([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchPlayers = async () => {
      let array: DocumentData[] = [];
      const q = query(collection(db, "Players"), orderBy("time", "asc"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let docObj = { ...doc.data(), id: doc.id };
        array.push(docObj);
      });
      return array;
    };

    fetchPlayers()
      .then((data) => setPlayers(data))
      .catch(() => setIsError(true));
  }, []);

  return { players, setPlayers, isError };
}
