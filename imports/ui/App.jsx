import React from "react";
import { Control } from "./Control";
import Typography from "@material-ui/core/Typography";

export const App = () => (
  <div>
    <Typography variant="h3" gutterBottom>
      Temperature Tapir 🦡
    </Typography>
    <Control />
  </div>
);
