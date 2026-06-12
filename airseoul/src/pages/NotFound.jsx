import { Link } from 'react-router-dom';

import { ROUTES } from '../constants/routes';
import './_not-found.scss';

const NotFound = () => {
  return (
    <main className="not-found-page" role="status">
      <h1>페이지를 찾을 수 없습니다</h1>
      <p>
        <span>요청한 페이지가 삭제되었거나 주소가 변경되었을 수 있습니다.</span>
        <span>실제 사이트를 확인하거나 메인으로 돌아가 주세요.</span>
      </p>
      <div className="not-found-page__actions">
        <Link to={ROUTES.home}>메인으로 돌아가기</Link>
        <Link to={ROUTES.booking.root}>항공권 예매</Link>
      </div>
    </main>
  );
};

export default NotFound;
