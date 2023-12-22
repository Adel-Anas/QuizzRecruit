import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Home.css";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("Front-End");
  const navigate = useNavigate();

  const handleSectorChange = (e) => {
    setSector(e.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    // Get the input value and remove non-numeric characters
    const inputValue = event.target.value.replace(/\D/g, "");

    // Limit the number of digits to, for example, 10
    const maxLength = 10;
    const truncatedValue = inputValue.slice(0, maxLength);

    // Update the state with the sanitized and truncated value
    setPhoneNumber(truncatedValue);
  };

  const handleStartQuiz = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      phoneNumber === "" ||
      email === ""
    ) {
      return toast.error("Complete The Form !", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else if (sector === "Front-End") {
      navigate("/FrontQuizz");
    } else if (sector === "Back-End") {
      navigate("/BackEndQuizz");
    } else if (sector === "FullStack") {
      navigate("/FullStackQuizz");
    } else {
      // Handle the case where no sector is selected
      console.error("Please choose a sector before starting the quiz.");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
      <div className="home-page-body">
        <div className="landing-page-info-container">
          <div className="landing-page-container">
            <div className="landing-page-title">
              <h1>DevRecruit</h1>
            </div>
            <div className="informations-input">
              {/* <p>First Name</p> */}
              <div className="obligatory">
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <p>*</p>
              </div>
            </div>
            <div className="informations-input">
              {/* <p>Last Name</p> */}
              <div className="obligatory">
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
                <p>*</p>
              </div>
            </div>
            <div className="informations-input">
              {/* <p>Phone Number</p> */}
              <div className="obligatory">
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter phone number"
                />
                <p>*</p>
              </div>
            </div>
            <div className="informations-input">
              {/* <p>Email</p> */}
              <div className="obligatory">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <p>*</p>
              </div>
            </div>
            <div className="select-options">
              <div className="obligatory">
                <select
                  name=""
                  id=""
                  value={sector}
                  onChange={handleSectorChange}
                >
                  <option value="Front-End">Front-End</option>
                  <option value="Back-End">Back-End</option>
                  <option value="FullStack">FullStack</option>
                </select>
                <p>*</p>
              </div>
            </div>
            <div>
              <button onClick={handleStartQuiz} className="launch-quizz-button">Start Quizz</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
