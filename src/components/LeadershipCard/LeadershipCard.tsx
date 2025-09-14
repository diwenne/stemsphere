import React from 'react';
import Tag from '../Tag/Tag';
import './LeadershipCard.css';

interface LeadershipCardProps {
  name: string;
  title: string;
  affiliation: string;
  bio: string;
  avatarUrl: string;
  tags: string[];
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({ name, title, affiliation, bio, avatarUrl, tags }) => {
  return (
    <div className="leadership-card">
      <img src={avatarUrl} alt={name} className="card-avatar" />
      <h3 className="card-name">{name}</h3>
      <p className="card-title">{title}</p>
      <p className="card-affiliation">{affiliation}</p>
      <p className="card-bio">{bio}</p>
      <div className="card-tags">
        {tags.map((tag, index) => (
          <Tag key={index} label={tag} />
        ))}
      </div>
    </div>
  );
};

export default LeadershipCard;