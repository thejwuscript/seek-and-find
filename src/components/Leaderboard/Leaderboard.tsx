import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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
import { mdiTrophyVariant, mdiArrowLeftThick } from "@mdi/js";
import usePlayers from "../../hooks/usePlayers";
import { DocumentData } from "firebase/firestore";

type Order = "asc" | "desc";

interface Player {
  name: string;
  time: string;
}

export default function Leaderboard() {
  const { players, isError } = usePlayers();
  const [sortedPlayers, setSortedPlayers] = useState<DocumentData[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderDataBy, setOrderDataBy] = useState<keyof Player>("time");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setSortedPlayers(players);
  }, [players]);

  const handleSortClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    const target = e.currentTarget as HTMLElement;
    if (target.dataset.category) {
      const sortedPlayers = [...players];
      const category = target.dataset.category as keyof Player;
      const orderSign: number = order === "asc" ? -1 : 1;
      sortedPlayers.sort(
        (a, b) => a[category].localeCompare(b[category]) * orderSign
      );
      setSortedPlayers(sortedPlayers);
      setOrder(order === "asc" ? "desc" : "asc");
      setOrderDataBy(category);
    }
  };

  return (
    <div className="leaderboard-page">
      <Link to="/" className="home-link">
        <Icon
          path={mdiArrowLeftThick}
          size={1}
          style={{ marginBottom: "2px" }}
        />
        Back to Home
      </Link>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Icon path={mdiTrophyVariant} size={1.2} color="gold" />
        <h1 className="title">LEADERBOARD</h1>
        <Icon path={mdiTrophyVariant} size={1.2} color="gold" />
      </div>
      {isError && (
        <div className="error-message">Cannot retrieve player data.</div>
      )}
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
                  sx={{ position: "relative" }}
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
            {sortedPlayers.map((player) => (
              <TableRow
                key={player.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                role="row"
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
