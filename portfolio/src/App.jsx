import { Route, Routes } from "react-router-dom";

import SiteChrome from "./components/layout/SiteChrome";
import HomePage from "./pages/Home/HomePage";
import { NotFoundPage } from "./pages/NotFound";
import SeoulYouthCenterDetail from "./pages/Project/SeoulYouthCenter/SeoulYouthCenterDetail";
import ProjectPreviewPage from "./pages/ProjectPreview/ProjectPreviewPage";

const App = () => {
  return (
    <SiteChrome>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/projects/seoul-youth-center"
          element={<SeoulYouthCenterDetail />}
        />

        <Route
          path="/projects/:slug/preview"
          element={<ProjectPreviewPage />}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteChrome>
  );
};

export default App;
