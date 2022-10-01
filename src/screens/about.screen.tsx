import { useNavigate } from 'react-router-dom';
import { useTranslate } from 'src/common/component/translate/translate.component';

export const AboutScreen = (): JSX.Element => {
  const { translate } = useTranslate();
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className="page">
          <div className="container section">
            <h1>About</h1>
            <p>{translate('content')}</p>
            <button onClick={(): void => navigate('/')}>Home</button>
          </div>
        </div>
      </div>
    </>
  );
};
