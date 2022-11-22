import React from "react";
import List from '@mui/material/List';
import { ListItem, ListItemText } from '@mui/material';

export default function DropdownList() {
  return (
    <>
      <List sx={{ position: "absolute", right: 0, top: "50px", backgroundColor: "grey" }}>
        <ListItem alignItems="flex-start">
          <ListItemText primary="Something here" />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemText primary="Something here" />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemText primary="Something here" />
        </ListItem>
      </List>
    </>
  );
}