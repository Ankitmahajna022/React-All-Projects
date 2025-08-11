import { createRoot } from 'react-dom/client';
import '../src/index.css';
import App from '../src/App.jsx';
import { store } from '../store/store.js'; 
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);