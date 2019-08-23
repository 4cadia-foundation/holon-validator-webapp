import Welcome from './modules/Welcome/Welcome';
import ChooseCreateIdentityOrHome from './modules/ChooseCreateIdentityOrHome/ChooseCreateIdentityOrHome';
import ImportWallet from './modules/ImportWallet/ImportWallet';
import Notfound from './modules/Notfound/Notfound';
import Home from './modules/Home/Home';
import Menu from  './modules/Menu/Menu';
import BackupPhrase from './modules/BackupPhrase/BackupPhrase';
import WelcomeBack from './modules/WelcomeBack/WelcomeBack';
import Profile from './modules/Profile/Profile';
import Validation from './modules/Validation/Validation';
import HistoryValidations from './modules/HistoryValidations/HistoryValidations';
import DepositStake from './modules/DepositStake/DepositStake';

let routers = [
  {
    path: '/',
    exact: true,
    component: Welcome
  },
  {
    path: '/importwallet',
    component: ImportWallet,
    exact: false
  },
  {
    path: '/historyvalidations',
    component: HistoryValidations,
    exact: false
  },
  {
    path: '/choosecreateidentityorhome',
    component: ChooseCreateIdentityOrHome,
    exact: false
  },
  {
    path: '/welcomeback',
    component: WelcomeBack,
    exact: false
  },
  {
    path: '/menu',
    component: Menu,
    exact: false
  },
  {
    path: '/backupphrase',
    component: BackupPhrase,
    exact: false
  },
  {
    path: '/home',
    component: Home,
    exact: false
  },
  {
    path: '/profile',
    component: Profile,
    exact: false
  },
  {
    path: '/menu',
    component: Menu,
    exact: false
  },
  {
    path: '/validation',
    component: Validation,
    exact: false
  },
  {
    path: '/depositstake',
    component: DepositStake,
    exact: false
  },
  {
    component: Notfound,
    exact: false
  },
];

export default routers;
