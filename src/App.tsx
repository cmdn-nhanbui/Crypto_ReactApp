import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from '@/shared/contexts/toast.context';
import { Storage } from '@/shared/contexts/storage.context';
import { Theme } from '@/shared/contexts/theme.context';

import { RouterOutlet } from '@/core/modules/custom-router-dom/RouterOutlet';
import appRoutes from '@/app.route';

import './stylesheet/scss/style.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <ToastProvider>
      <Storage>
        <Theme>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <RouterOutlet routes={appRoutes} />
            </BrowserRouter>
          </QueryClientProvider>
        </Theme>
      </Storage>
    </ToastProvider>
  );
}
export default App;
