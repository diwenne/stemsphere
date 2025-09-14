import React from 'react';
import Section from '../../components/Section/Section';
import LeadershipCard from '../../components/LeadershipCard/LeadershipCard';
import './Leadership.css';
import avatar1 from '../../assets/avatar1.png'; // Make sure you have these images
import avatar2 from '../../assets/avatar2.png';
import avatar3 from '../../assets/avatar3.png';

const leaders = [
  {
    name: 'Jasmine Chen',
    title: 'Founder & Executive Director',
    affiliation: 'MIT Computer Science',
    bio: 'Aspiring AI researcher and software engineer, passionate about making STEM education accessible to all.',
    avatarUrl: avatar1,
    tags: ['AI Research @ Stanford', 'Code for Good Lead', 'Robotics Captain'],
  },
  {
    name: 'Leo Rodriguez',
    title: 'Director of Programs',
    affiliation: 'UC Berkeley Bioengineering',
    bio: 'Dedicated to creating innovative curricula that bridge the gap between classroom theory and real-world application.',
    avatarUrl: avatar2,
    tags: ['iGEM Gold Medalist', 'Biotech Startup Intern', 'STEM Tutor'],
  },
  {
    name: 'Aisha Khan',
    title: 'Director of Outreach',
    affiliation: 'Georgia Tech Industrial Design',
    bio: 'Exploring the intersection of technology and human-centered design to create impactful community programs.',
    avatarUrl: avatar3,
    tags: ['UX Design Award', 'Girls Who Code Mentor', 'Hackathon Organizer'],
  },
];

const Leadership = () => {
  return (
    <Section id="leadership">
      <div className="leadership-header">
        <span className="header-subtitle">Chapter Leadership</span>
        <h1 className="header-title">Meet Our Team</h1>
        <p className="header-description">
          Meet the outstanding students who lead Stemsphere Foundation, organizing workshops, developing programs, and driving our mission forward.
        </p>
      </div>
      <div className="leadership-grid">
        {leaders.map((leader, index) => (
          <LeadershipCard key={index} {...leader} />
        ))}
      </div>
    </Section>
  );
};

export default Leadership;