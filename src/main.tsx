import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// AOS (Animate On Scroll)
import AOS from 'aos'
import 'aos/dist/aos.css'

createRoot(document.getElementById("root")!).render(<App />);

// initialize AOS after initial render
setTimeout(() => AOS.init({ duration: 600, once: true }), 0);
