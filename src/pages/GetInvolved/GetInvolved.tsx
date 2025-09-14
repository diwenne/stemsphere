import Section from '../../components/Section/Section';
import './GetInvolved.css';

const GetInvolved = () => {
  return (
    <Section id="get-involved" className="get-involved-page">
      <div className="get-involved-header">
        <span className="page-pill">Join the Movement</span>
        <h1 className="page-title">Choose Your Path</h1>
        <p className="page-subtitle">
          Whether you're a student eager to lead or a teacher ready to inspire, we have the perfect opportunity for you to make a real impact.
        </p>
      </div>

      <div className="paths-container">
        {/* Path 1: Start a Chapter */}
        <div className="path-card">
          <div className="card-icon-wrapper">
            <span className="card-icon">🌍</span>
          </div>
          <h2 className="card-title">Start a Chapter</h2>
          <p className="card-description">
            Bring Stemsphere to your area by leading a local chapter. You'll gain leadership skills, build a community, and get exclusive access to our network and resources.
          </p>
          <ul className="card-features">
            <li>Lead and mentor students in your community</li>
            <li>Organize workshops, competitions, and events</li>
            <li>Receive a comprehensive startup kit and ongoing support</li>
            <li>Develop valuable project management and leadership skills</li>
          </ul>
          <a href="#" className="btn btn-primary card-cta">Apply to Lead</a>
        </div>

        {/* Path 2: Request a Workshop */}
        <div className="path-card">
          <div className="card-icon-wrapper">
            <span className="card-icon">🏫</span>
          </div>
          <h2 className="card-title">Request a Workshop</h2>
          <p className="card-description">
            Bring our hands-on STEM workshops directly to your classroom or school. Our team provides engaging, curriculum-aligned content for students of all levels.
          </p>
          <ul className="card-features">
            <li>Choose from topics like AI, Robotics, and Web Development</li>
            <li>Workshops are led by our experienced instructors</li>
            <li>All materials and lesson plans are provided</li>
            <li>Spark curiosity and inspire the next generation of innovators</li>
          </ul>
          <a href="#" className="btn btn-primary card-cta">Request Now</a>
        </div>
      </div>
    </Section>
  );
};

export default GetInvolved;