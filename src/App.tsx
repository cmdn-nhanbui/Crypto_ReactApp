import { BrowserRouter } from 'react-router-dom';

import { ToastProvider } from '@/shared/contexts/toast.context';
import { Storage } from '@/shared/contexts/storage.context';
import { Theme } from '@/shared/contexts/theme.context';

import { RouterOutlet } from '@/core/modules/custom-router-dom/RouterOutlet';
import appRoutes from '@/app.route';

import './stylesheet/scss/style.scss';

function App() {
  return (
    <ToastProvider>
      <Storage>
        <Theme>
          <BrowserRouter>
            <RouterOutlet routes={appRoutes} />
          </BrowserRouter>
        </Theme>
      </Storage>
    </ToastProvider>
  );
}
export default App;
