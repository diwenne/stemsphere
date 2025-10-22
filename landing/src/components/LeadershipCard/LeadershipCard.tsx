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
  linkedinUrl?: string; // Optional property
}

const LeadershipCard: React.FC<LeadershipCardProps> = ({ name, title, affiliation, bio, avatarUrl, tags, linkedinUrl }) => {
  return (
    <div className="leadership-card">
      {/* Conditionally render the LinkedIn link */}
      {linkedinUrl && (
        <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="card-linkedin-link">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.62 1.62 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.1 1.16 3.1 3.46z"></path>
          </svg>
        </a>
      )}
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