import Section from '../../components/Section/Section';
import LeadershipCard from '../../components/LeadershipCard/LeadershipCard';
import './Leadership.css';
import diwen from '../../assets/diwen.jpg'; // Make sure you have these images
import wilson from '../../assets/wilson.png';
import drishya from '../../assets/drishya.jpg';
import tristan from '../../assets/tristan.png';

const leaders = [
  {
    name: 'Diwen Huang',
    title: 'President',
    affiliation: '',
    bio: 'Aspiring AI researcher and software engineer, passionate about making STEM education accessible to all.',
    avatarUrl: diwen,
    tags: ['AI Research @ Stanford', 'Code for Good Lead', 'Robotics Captain'],
  },
  {
    name: 'Wilson Huang',
    title: 'Vice President',
    affiliation: 'UC Berkeley Bioengineering',
    bio: 'Dedicated to creating innovative curricula that bridge the gap between classroom theory and real-world application.',
    avatarUrl: wilson,
    tags: ['iGEM Gold Medalist', 'Biotech Startup Intern', 'STEM Tutor'],
  },
  {
    name: 'Drishya Sharma',
    title: 'Director of Programs',
    affiliation: 'Georgia Tech Industrial Design',
    bio: 'Exploring the intersection of technology and human-centered design to create impactful community programs.',
    avatarUrl: drishya,
    tags: ['UX Design Award', 'Girls Who Code Mentor', 'Hackathon Organizer'],
  },
  {
    name: 'Tristan Du',
    title: 'Director of Outreach',
    affiliation: 'Georgia Tech Industrial Design',
    bio: 'Exploring the intersection of technology and human-centered design to create impactful community programs.',
    avatarUrl: tristan,
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