import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./componenets/Body"
import Login from "./componenets/Login"
import Profile from "./componenets/Profile"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./componenets/Feed"
import Connections from "./componenets/Connections"
import Requests from "./componenets/Requests"
import Chat from "./componenets/Chat"
function App() {

  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>

          <Route path="/" element={<Body />}>
          <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/connections" element={<Connections />  } />
              <Route path="/requests" element={<Requests />  } />
              <Route path="/chat/:targetUserId" element={<Chat /> } />




            </Route>

            </Routes>
          </BrowserRouter>
          </Provider>
        </>
        )
}

        export default App
