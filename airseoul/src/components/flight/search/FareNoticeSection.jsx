import { fareNoticeGroups } from '../../../data/fareNotices';
import ChevronDownIcon from '../../icons/ChevronDownIcon';

function FareNoticeSection() {
  return (
    <section className="fare-notice" aria-labelledby="fare-notice-title">
      <div className="fare-notice__header">
        <h2 id="fare-notice-title">운임 안내 및 유의사항</h2>
      </div>

      <div className="fare-notice__details">
        {fareNoticeGroups.map((group) => (
          <details className="fare-notice__detail" key={group.title}>
            <summary>
              {group.title}
              <ChevronDownIcon className="fare-notice__detail-icon" size={18} />
            </summary>

            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}

export default FareNoticeSection;
