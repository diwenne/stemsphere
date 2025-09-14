import React from 'react';
import './Tag.css';

interface TagProps {
  label: string;
}

const Tag: React.FC<TagProps> = ({ label }) => {
  return <span className="tag">{label}</span>;
};

export default Tag;