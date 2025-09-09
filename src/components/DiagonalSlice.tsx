import React from "react";

interface Props {
  tone?: "soft" | "blue" | "plain";
  top?: boolean;
  bottom?: boolean;
  children: React.ReactNode;
}

export default function DiagonalSlice({ tone="plain", top=false, bottom=false, children }: Props){
  const toneClass =
    tone === "soft" ? "slice slice--soft" :
    tone === "blue" ? "slice slice--blue" : "slice";
  const edges = `${top ? " slice--diag-top" : ""}${bottom ? " slice--diag-bottom" : ""}`;

  return (
    <section className={toneClass + edges}>
      <div className="container slice-inner">{children}</div>
    </section>
  );
}