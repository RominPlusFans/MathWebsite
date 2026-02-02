import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Navigation } from '@/components/Navigation';
import { Home } from '@/pages/Home';
import { NotesList } from '@/pages/NotesList';
import { NoteDetail } from '@/pages/NoteDetail';
import { Videos } from '@/pages/Videos';
import { VideoDetail } from '@/pages/VideoDetail';
import { Support } from '@/pages/Support';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#1a1a1a]">
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/notes" element={<NotesList />} />
            <Route path="/notes/:id" element={<NoteDetail />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/videos/:id" element={<VideoDetail />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
