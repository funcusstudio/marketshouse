import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';
import { home, person, heart } from 'ionicons/icons';
import './app.css';

import { LoginPage } from './pages/auth/LoginPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { HomePage } from './pages/home/HomePage';
import { ProjectDetailsPage } from './pages/project-details/ProjectDetailsPage';
import { MyProjectsPage } from './pages/my-projects/MyProjectsPage';
import { PrivateRoute } from './components/PrivateRoute';
import { PersonalCabinet } from './pages/profile/personalCabinet/PersonalCabinet';
import { MyProjectDetailsPage } from './pages/my-projects-details/MyProjectsDetailsPage';
import { ExecutorProjectsPage } from './pages/executor-projects/ExecutorProjectsPage';
import { ExecutorProjectsDetailsPage } from './pages/executor-projects-details/ExecutorProjectsDetailsPage';
import ConstructionTrackingPage from './pages/construction-tracking/ConstructionTrackingPage';
import { SignatureIssue } from './pages/signatureIssue/SignatureIssue';

import { useEffect } from 'react';
import WebViewPage from './pages/webVIew/WebViewPage';
import LocationSearchPage from './pages/locationSearch/LocationSearchPage';
import TxScreen from './pages/txScreen/TxScreen';

export function App() {

  useEffect(() => {
    console.log('pathname:', location.pathname, 'type:', typeof location.pathname);
    if (!location.pathname || typeof location.pathname !== 'string') {
      console.error('Invalid pathname:', location.pathname);
    }
  }, [location.pathname]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/" render={() => <HomePage />} />
            <Route path="/profile" render={() => <PrivateRoute component={ProfilePage} />} />
            <Route path="/personalCabinet" render={() => <PrivateRoute component={PersonalCabinet} />} />
            <Route path="/auth" render={() => <LoginPage />} />
            <Route path="/projects/:id" render={() => <PrivateRoute component={ProjectDetailsPage} />} />
            <Route path="/my-projects-details/:id" render={() => <PrivateRoute component={MyProjectDetailsPage} />} />
            <Route path="/my-projects" render={() => <PrivateRoute component={MyProjectsPage} />} />
            <Route path="/executor-projects" render={() => <PrivateRoute component={ExecutorProjectsPage} />} />
            <Route path="/executor-projects-details/:id" render={() => <PrivateRoute component={ExecutorProjectsDetailsPage} />} />
            <Route path="/construction-tracking/:id" render={() => <PrivateRoute component={ConstructionTrackingPage} />} />
            <Route path='/signatureIssue' render={() => <SignatureIssue />} />
            <Route exact path="/search-location" component={LocationSearchPage} />
            <Route exact path="/tx-screen/:id" component={TxScreen} />
            {/* 🔥 Добавленный WebView экран */}
            <Route path="/webview" component={WebViewPage} exact />
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/" className="app-button">
              <IonIcon icon={home} />
              <IonLabel>Главная</IonLabel>
            </IonTabButton>
            <IonTabButton tab="my-projects" href="/my-projects" className="app-button">
              <IonIcon icon={heart} />
              <IonLabel>Мои проекты</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile" className="app-button">
              <IonIcon icon={person} />
              <IonLabel>Профиль</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;