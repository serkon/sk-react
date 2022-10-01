import '@fontsource/prompt';
import './App.scss';

import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { ErrorBoundary } from './common/component/error-boundary/ErrorBoundary';
import { useTranslate } from './common/component/translate/translate.component';
import { useMobile } from './common/hooks/mobile.hook';

function App(): JSX.Element {
  const { translate } = useTranslate();

  useMobile();

  return (
    <ErrorBoundary>
      <Suspense fallback={<div>{translate('loading')}</div>}>
        <Outlet />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
