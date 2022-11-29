import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  collection,
  DocumentData,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase-config";
import "./leaderboard.css";
import TableSortLabel from "@mui/material/TableSortLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Icon from "@mdi/react";
import {mdiTrophyVariant, mdiArrowLeftThick } from "@mdi/js";

type Order = "asc" | "desc";

interface Player {
  name: string;
  time: string;
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<DocumentData[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderDataBy, setOrderDataBy] = useState<keyof Player>("time");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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

  const handleSortClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.target as HTMLElement;
    if (target.dataset.category) {
      const sortedPlayers = [...players];
      const category = target.dataset.category as keyof Player;
      const orderSign: number = order === "asc" ? -1 : 1;
      sortedPlayers.sort(
        (a, b) => a[category].localeCompare(b[category]) * orderSign
      );
      setPlayers(sortedPlayers);
      setOrder(order === "asc" ? "desc" : "asc");
      setOrderDataBy(category);
    }
  };

  return (
    <div className="leaderboard-page">
      <Link to="/" className="home-link">
        <Icon path={mdiArrowLeftThick} size={1} style={{marginBottom: "2px"}}/>
        Back to Home
      </Link>
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
              <TableCell sx={{ fontWeight: "bold" }}>
                <TableSortLabel
                  active={orderDataBy === "name"}
                  direction={orderDataBy === "name" ? order : "asc"}
                  onClick={handleSortClick}
                  data-category="name"
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="right">
                <TableSortLabel
                  active={orderDataBy === "time"}
                  direction={orderDataBy === "time" ? order : "asc"}
                  onClick={handleSortClick}
                  data-category="time"
                >
                  Time
                </TableSortLabel>
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
