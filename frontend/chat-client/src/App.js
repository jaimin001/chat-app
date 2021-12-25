import "./App.css";
import Chat from "./Components/Chat/Chat";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import io from "socket.io-client";

const socket = io.connect("/");
function App(props) {
	return (
		<>
			<Router>
				<div className="App">
					<Routes>
						<Route path="/" element={<Home socket={socket} />} />
						<Route
							path="/chat/:roomname/:username"
							element={
								<Chat
									username="jaimin"
									roomname="gajjar"
									socket={socket}
								/>
							}
						/>
					</Routes>
				</div>
			</Router>
		</>
	);
}

export default App;
