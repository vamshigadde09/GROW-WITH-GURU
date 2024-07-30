import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/StudentPortal.css";
import StudentHeader from "../Header/StudentHeader";
import Footer from "../Footer/Footer";

const StudentPortal = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId"); // Get userId from local storage or use Redux state

  const handleLogout = () => {
    // Clear user token and other local data
    localStorage.removeItem("token");
    localStorage.removeItem("formCompleted"); // Optional: Clear this if you want to reset form status on logout
    navigate("/"); // Redirect to login page after logout
  };

  return (
    <div className="growwithguru-container">
      <StudentHeader userId={userId} />
      <div className="body-box">
        <section className="intro-section">
          <h1>Welcome to GROW WITH GURU - Your Path to Interview Success</h1>
          <p>
            We’re excited to have you here! [Platform Name] is designed to
            support you in preparing for job interviews, providing you with the
            tools and resources you need to excel. Our platform offers
            comprehensive mock interviews that simulate real interview
            experiences, helping you build confidence and improve your skills.
            Get ready to take the next step towards your dream job with our
            expert guidance and support.
          </p>
        </section>
        <section className="features-section">
          <h2>What GROW WITH GURU Offers:</h2>
          <ol>
            <li>
              <strong>Mock Interview Scheduling:</strong> Schedule mock
              interviews with experienced interviewers at your convenience.
            </li>
            <li>
              <strong>Feedback and Improvement:</strong> Receive detailed,
              constructive feedback on your interview performance.
            </li>
            <li>
              <strong>Resources and Tips:</strong> Access a wealth of resources
              including interview tips, sample questions, and best practices.
            </li>
          </ol>
        </section>
        <section className="testimonials-section">
          <h2>Testimonials Section: Hear from our Successful Users:</h2>
          <blockquote>
            <p>
              “The mock interviews on [Platform Name] were a game-changer for
              me. The feedback was incredibly detailed and helped me improve
              significantly. I felt so much more confident during my actual
              interviews.”
            </p>
            <footer>— John Doe, Computer Science Major</footer>
          </blockquote>
          <blockquote>
            <p>
              “Thanks to the personalized coaching sessions, I was able to
              identify and work on my weaknesses. I landed my dream job right
              after graduation!”
            </p>
            <footer>— Jane Smith, Electrical Engineering Graduate</footer>
          </blockquote>
        </section>
        <section className="faq-section">
          <h2>FAQ Section: Frequently Asked Questions:</h2>
          <dl>
            <dt>Q: How do I schedule a mock interview?</dt>
            <dd>
              A: Sign up or log in to your account, navigate to the scheduling
              section, and select a suitable time and interviewer.
            </dd>
            <dt>Q: What kind of feedback will I receive?</dt>
            <dd>
              A: You will receive detailed feedback on various aspects of your
              interview performance, including communication skills, body
              language, and content of your answers.
            </dd>
            <dt>Q: Can I review my interview recordings?</dt>
            <dd>
              A: Yes, all mock interviews are recorded, and you can review the
              recordings to assess your performance.
            </dd>
            <dt>Q: How is my privacy protected?</dt>
            <dd>
              A: Your privacy is our priority. All data, including video
              recordings, are securely stored and only accessible to you and
              your interviewer.
            </dd>
            <dt>Q: What if I need technical support?</dt>
            <dd>
              A: You can reach out to our support team via email or use our
              real-time chat feature for immediate assistance.
            </dd>
          </dl>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default StudentPortal;
