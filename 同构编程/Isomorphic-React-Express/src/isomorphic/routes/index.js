import Home from '../components/home';
import Headlines from '../components/headlines';

export default [{
  path: '/',
  component: Home,
  exact: true
}, {
  path: '/headlines/:country',
  component: Headlines,
  exact: true
}]