import React from "react";

interface Props {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

export default function InfoCard({ icon, title, children }: Props) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center">
      <div className="rounded-full p-4 mb-4 bg-blue-100 text-blue-600">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{children}</p>
    </div>
  );
}