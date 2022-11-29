import React, { useState, useEffect } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "./leaderboard.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Icon from "@mdi/react";
import { mdiTrophyAward, mdiTrophyVariant } from "@mdi/js";

export default function Leaderboard() {
  const [players, setPlayers] = useState<DocumentData[]>([]);

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

    fetchPlayers().then((data) => setPlayers(data));
  }, []);

  return (
    <div className="leaderboard-page">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon path={mdiTrophyVariant} size={1.2} color="gold" />
        <h1 className="title">LEADERBOARD</h1>
        <Icon path={mdiTrophyVariant} size={1.2} color="gold" />
      </div>
      <TableContainer
        component={Paper}
        sx={{
          width: "95%",
          maxWidth: 500,
          border: "8px solid var(--black)",
          borderRadius: "15px",
          outline: "2px solid white",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                Time
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map((player) => (
              <TableRow
                key={player.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {player.name}
                </TableCell>
                <TableCell align="right">{player.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
