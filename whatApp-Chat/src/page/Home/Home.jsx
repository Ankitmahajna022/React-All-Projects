import { useSelector } from "react-redux";
import User from "../../components/User/User";
import ChatBox from "../../components/ChatBox/ChatBox";
import "./Home.css"
function Home() {
  const { currentUser } = useSelector((state) => state.users);

  return (
     <div>
      <h2 style={{ textAlign: "center", margin: "10px 0" }}>Home Page</h2>
      {currentUser ? (
        <p style={{ textAlign: "center" }}>Welcome, {currentUser.email}</p>
      ) : (
        <p style={{ textAlign: "center" }}>Please login first.</p>
      )}
      <div className="main">
        <div className="user">
          <User />
        </div>
        <div className="chatBox">
          <ChatBox />
        </div>
      </div>
    </div>
    
  );
}

export default Home;







<div className='main'>
      <div className='user'>
         <User/>
      </div>
       <div className='chatBox'>
         <ChatBox/>
       </div>
       
    </div>