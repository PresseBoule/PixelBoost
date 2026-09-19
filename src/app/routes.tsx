import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AgentIAPage from './pages/AgentIAPage';
import FonctionnementPage from './pages/FonctionnementPage';
import TarifsPage from './pages/TarifsPage';
import CasClientPage from './pages/CasClientPage';
import RealisationsPage from './pages/RealisationsPage';
import ProjetPage from './pages/ProjetPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import MentionsLegalesPage from './pages/MentionsLegalesPage';
import PolitiqueConfidentialitePage from './pages/PolitiqueConfidentialitePage';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: 'agent-ia', Component: AgentIAPage },
      { path: 'fonctionnement', Component: FonctionnementPage },
      { path: 'tarifs', Component: TarifsPage },
      { path: 'cas-client', Component: CasClientPage },
      { path: 'realisations', Component: RealisationsPage },
      { path: 'realisations/:slug', Component: ProjetPage },
      { path: 'contact', Component: ContactPage },
      { path: 'mentions-legales', Component: MentionsLegalesPage },
      { path: 'politique-confidentialite', Component: PolitiqueConfidentialitePage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
