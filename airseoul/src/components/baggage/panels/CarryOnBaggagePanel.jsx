import BaggageIntro from '../BaggageIntro';
import { BAGGAGE_IMAGE_PATH } from '../baggageGuideData';

export default function CarryOnBaggagePanel() {
  return (
    <article className="baggage-guide-panel" role="tabpanel">
      <BaggageIntro
        title="기내 휴대 수하물"
        description="고객이 직접 기내에 휴대하여 전적으로 보관하고 책임지는 수하물입니다."
      />

      <section className="baggage-guide-highlight baggage-guide-highlight--with-image">
        <div>
          <h3>무료 허용 기준</h3>
          <dl className="baggage-guide-metrics">
            <div><dt>개수</dt><dd>1개</dd></div>
            <div><dt>무게</dt><dd>10kg 이하</dd></div>
            <div><dt>크기</dt><dd>세 변의 합 115cm 이하</dd></div>
          </dl>
          <p>가로 55cm, 세로 40cm, 높이 20cm 이내이며 손잡이와 바퀴를 포함합니다.</p>
        </div>
        <img
          src={`${BAGGAGE_IMAGE_PATH}/carry-on-dimensions.png`}
          alt="기내 휴대 수하물 크기 측정 안내"
        />
      </section>

      <section>
        <h3>추가로 휴대할 수 있는 물품 1개</h3>
        <p>기내 휴대 수하물과 아래 물품 중 1개를 추가로 휴대할 수 있으며, 두 물품의 합계 무게는 10kg을 초과할 수 없습니다.</p>
        <ul>
          <li>소형 서류가방, 핸드백, 노트북 컴퓨터, 도서류 또는 작은 면세품</li>
          <li>비행 중 사용할 유아용 음식물</li>
          <li>몸이 불편한 승객이 사용하는 지팡이·목발 및 시각장애인 안내견</li>
          <li>일자형 접이식 유모차 1개(기내 보관 공간이 있는 경우)</li>
        </ul>
        <p className="baggage-guide-note">보관 공간이 부족한 유모차는 위탁 수하물로 처리됩니다. 1열과 비상구열 앞 좌석 하단에는 수하물을 보관할 수 없습니다.</p>
      </section>

      <section>
        <h3>악기류</h3>
        <ul>
          <li>바이올린처럼 세 변의 합이 115cm 이하인 악기는 무료 휴대할 수 있으며 선반 또는 좌석 밑에 보관해야 합니다.</li>
          <li>첼로·기타·거문고 등 115cm를 초과하는 악기는 예약센터에서 별도 좌석을 구매한 경우 반입할 수 있습니다.</li>
          <li>별도 좌석에 보관하는 악기는 최대 높이 155cm까지 허용됩니다.</li>
        </ul>
      </section>

      <section>
        <h3>기내 사용 제한 및 유의사항</h3>
        <ul>
          <li>BedBox, Fly Legs Up, Fly-Tot, Plane Pal, Inflatable Cube 등 통로나 주변 승객에게 불편을 줄 수 있는 여행 편의용품은 사용할 수 없습니다.</li>
          <li>허용 규격에 맞더라도 기내 적재 공간이 부족하면 탑승구에서 위탁될 수 있습니다.</li>
          <li>수하물은 선반이나 앞 좌석 아래에 안전하게 보관하고 비상구와 통로를 막지 않아야 합니다.</li>
        </ul>
      </section>
    </article>
  );
}
