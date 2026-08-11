import FeatureCard from "./FeatureCard";

function Hero() {
  return (
    <section className="hero">

      <h1>CampusAI 🚀</h1>

      <h2>The Future of Student Intelligence</h2>

      <p>
        One AI assistant to manage attendance,
        assignments, notes, exams, and your academic life.
      </p>

      <div className="buttons">
  <button>Get Started</button>

  <button className="secondary">
    Learn More
  </button>

  <a
    href="/CampusAI.apk"
    download
    className="download-app-btn"
  >
    📱 Download CampusAI
  </a>
</div>

      <div className="features">

        <FeatureCard
          emoji="📚"
          title="Smart Notes"
          description="Generate notes instantly using AI."
          link="/notes"
        />

        <FeatureCard
          emoji="🗓️"
          title="Attendance"
          description="Track attendance automatically."
          link="/attendance"
        />

        <FeatureCard
          emoji="🤖"
          title="AI Assistant"
          description="Get personalized help with your studies."
          link="/assistant"
        />

        

         <FeatureCard
    emoji="📝"
    title="Exam Planner"
    description="Track your upcoming exams."
    link="/exams"
/>

      </div>

    </section>
  );
}

export default Hero;