import { Routes, Route } from "react-router-dom";
import WatchHistoryPage from "./pages/WatchHistory";
import DefaultLayout from "./layouts/DefaultLayout";
import "./App.scss";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route path="/" element={<WatchHistoryPage />} />
                </Route>
                {/* <Route path="about" element={<About />} /> */}
            </Routes>
        </div>
    );
}

export default App;
