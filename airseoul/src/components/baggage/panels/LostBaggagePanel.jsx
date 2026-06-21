import BaggageIntro from '../BaggageIntro';
import BaggageTable from '../BaggageTable';

const CONTACT_ROWS = [
  ['국내선 수하물', 'rsbag@flyairseoul.com'],
  ['국제선 수하물', 'rsbagintl@flyairseoul.com'],
  ['인천공항 유실물 관리소(T2)', '032-741-8988, 8989'],
  ['인천공항 경찰대', '032-740-0112'],
  ['인천공항 세관', '032-723-5113'],
];

const DAMAGE_CONTACT_ROWS = [
  ['국내선 파손 문의', 'rsbag@flyairseoul.com'],
  ['국제선 파손 문의', 'rsbagintl@flyairseoul.com'],
];

export default function LostBaggagePanel() {
  return (
    <article className="baggage-guide-panel" role="tabpanel">
      <BaggageIntro title="수하물 분실 및 보상" description="수하물 분실·지연·파손 발생 시 신고 방법과 항공사의 배상 책임을 안내합니다." />

      <section>
        <h3>수하물 분실</h3>
        <ul>
          <li>습득한 물품은 등록일로부터 30일 동안 보관한 후 관련 규정에 따라 폐기됩니다.</li>
          <li>부패성 물품은 즉시 폐기될 수 있습니다.</li>
          <li>출발지 또는 도착지에서 습득한 물품은 해당 공항 유실물 센터로 인계됩니다.</li>
          <li>여권, 신분증, 현금 등 개인 신상과 관련된 물품이나 귀중품은 공항 경찰대 또는 세관으로 인계됩니다.</li>
        </ul>
        <a className="baggage-guide-link" href="#">기내 물품 분실 신고 양식</a>
        <BaggageTable
          caption="유실물 문의처"
          columns={['구분', '연락처']}
          rows={CONTACT_ROWS}
          variant="contact"
        />
      </section>

      <section>
        <h3>수하물 지연·파손 신고</h3>
        <ul>
          <li>수하물 파손 또는 내용물 분실은 수하물을 인도받은 날부터 7일 이내에 신고해야 합니다.</li>
          <li>수하물 지연 또는 분실은 수하물을 위탁한 날부터 21일 이내에 항공사에 서면으로 신고해야 합니다.</li>
          <li>사전에 고가품을 신고하고 종가 요금을 지불하지 않은 경우 배상은 관련 국제협약과 운송약관의 책임 한도 내에서 이루어집니다.</li>
        </ul>
        <a className="baggage-guide-link" href="#">수하물 파손 접수 양식</a>
        <BaggageTable
          caption="파손 수하물 문의처"
          columns={['구분', '연락처']}
          rows={DAMAGE_CONTACT_ROWS}
          variant="contact"
        />
      </section>

      <section>
        <h3>배상이 제한되는 경우</h3>
        <ul>
          <li>법령 준수를 위한 조치, 불가항력 또는 고객의 과실로 손해가 발생한 경우</li>
          <li>23kg을 초과한 수하물의 과중량으로 가방이나 내용물이 파손된 경우</li>
          <li>보안 검색 과정의 잠금장치 파손이나 X-ray 통과로 인한 필름 손상</li>
          <li>정상적인 취급 과정에서 발생한 긁힘, 마모, 눌림, 흠집과 얼룩</li>
          <li>액세서리, 외부 자물쇠, 이름표, 커버, 벨트 등 분리가 가능한 부착물의 분실·손상</li>
          <li>액체류, 부패성 물품, 하드케이스 없이 접수한 스포츠·악기류의 파손</li>
          <li>현금, 귀금속, 유가증권, 계약서, 여권, 신분증, 열쇠, 전자기기와 데이터 등 기내에 휴대해야 하는 귀중품</li>
        </ul>
      </section>
    </article>
  );
}
