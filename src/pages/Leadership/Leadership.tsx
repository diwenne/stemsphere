import Section from '../../components/Section/Section';
import LeadershipCard from '../../components/LeadershipCard/LeadershipCard';
import './Leadership.css';
import diwen from '../../assets/diwen.jpg';
import wilson from '../../assets/wilson.png';
import drishya from '../../assets/drishya.jpg';
import tristan from '../../assets/tristan.png';
import zoe from '../../assets/zoe.jpg';

const leaders = [
  {
    name: 'Diwen Huang',
    title: 'President',
    affiliation: 'Coquitlam, BC',
    bio: 'Aspiring AI researcher and software engineer, passionate about making STEM education accessible to all.',
    avatarUrl: diwen,
    tags: ['AI Research @ Stanford', 'Code for Good Lead', 'Robotics Captain'],
    linkedinUrl: 'http://linkedin.com/in/diwenh5',
  },
  {
    name: 'Wilson Huang',
    title: 'Vice President',
    affiliation: 'Maple Ridge, BC',
    bio: 'Dedicated to creating innovative curricula that bridge the gap between classroom theory and real-world application.',
    avatarUrl: wilson,
    tags: ['iGEM Gold Medalist', 'Biotech Startup Intern', 'STEM Tutor'],
    linkedinUrl: 'https://www.linkedin.com/in/wilson-bohan-huang/',
  },
  {
    name: 'Drishya Sharma',
    title: 'Director of Programs',
    affiliation: 'Port Moody, BC',
    bio: 'Exploring the intersection of technology and human-centered design to create impactful community programs.',
    avatarUrl: drishya,
    tags: ['UX Design Award', 'Girls Who Code Mentor', 'Hackathon Organizer'],
    linkedinUrl: 'http://linkedin.com/in/drishya-anonymous-14736a218',
  },
  {
    name: 'Tristan Du',
    title: 'Director of Outreach',
    affiliation: 'Coquitlam, BC',
    bio: 'Exploring the intersection of technology and human-centered design to create impactful community programs.',
    avatarUrl: tristan,
    tags: ['UX Design Award', 'Girls Who Code Mentor', 'Hackathon Organizer'],
    linkedinUrl: '', // No LinkedIn provided, so the icon will not be shown
  },
  {
    name: 'Zoe Zhu',
    title: 'Director of Operations',
    affiliation: 'Coquitlam, BC',
    bio: 'Exploring the intersection of technology and human-centered design to create impactful community programs.',
    avatarUrl: zoe,
    tags: ['UX Design Award', 'Girls Who Code Mentor', 'Hackathon Organizer'],
    linkedinUrl: 'http://linkedin.com/in/zoe-zhu-011551377',
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