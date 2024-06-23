import { useState } from "react";
import axios from "axios";

const EmailForm = () => {
  const [email, setEmail] = useState({
    sender: "",
    receiver: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail({ ...email, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:5000/api/emails/send", email);
      alert("Email sent successfully!");
    } catch (error) {
      alert("Error sending email");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="sender"
          placeholder="Sender"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="receiver"
          placeholder="Receiver"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Message"
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default EmailForm;
