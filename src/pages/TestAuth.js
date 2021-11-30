import axios from "../helpers/axiosInstance";

const TestAuth = () => {
  const handleClick = async () => {
    try {
      const temp = await axios.get("/protectedRoute");
      console.log(temp);
      alert(temp.data);
    } catch (e) {
      alert("Unauthorized");
    }
  };
  const handleClickLogout = async () => {
    try {
      await axios.post("/users/logout", {}, { withCredentials: true });
      alert("Loggedout");
    } catch (e) {
      alert("Error");
    }
  };

  return (
    <>
      <button onClick={handleClick}>Click</button>
      <button onClick={handleClickLogout}>Logout</button>
    </>
  );
};

export default TestAuth;
