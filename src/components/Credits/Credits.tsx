import React from "react";

export default function Credit() {
  return (
    <div className="credit-background" style={styles}>
      <span>
        Image by{" "}
        <a href="https://chekavo.artstation.com/" style={{ color: "orange" }}>
          Egor Klyuchnyk
        </a>
      </span>
    </div>
  );
}

const styles: React.CSSProperties = {
  position: "absolute",
  backgroundColor: "rgba(0,0,0, 0.3)",
  color: "white",
  fontWeight: 600,
  fontSize: "1.2vw",
  bottom: "12px",
  left: "12px",
  borderRadius: "10px",
  padding: "0.8vw 1vw",
};
