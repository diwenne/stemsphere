import React from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

export default function ImagePlaceholder({
  className = "w-full h-64",
  style = {},
}: Props) {
  return <div className={`bg-gray-300 animate-pulse rounded-lg ${className}`} style={style} />;
}