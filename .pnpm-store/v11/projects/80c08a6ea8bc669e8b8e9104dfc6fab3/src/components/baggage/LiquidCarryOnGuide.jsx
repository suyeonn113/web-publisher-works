import { BAGGAGE_IMAGE_PATH } from './baggageGuideData';

const LIQUID_GUIDES = [
  {
    src: `${BAGGAGE_IMAGE_PATH}/restricted-liquids-guide-1.png`,
    alt: '100ml 이하 용기들을 1리터 이하 투명 지퍼백에 담은 허용 예시',
    label: '1ℓ 이하',
  },
  {
    src: `${BAGGAGE_IMAGE_PATH}/restricted-liquids-guide-2.png`,
    alt: '용기들은 100ml 이하이지만 지퍼백 전체 용량이 1리터를 초과한 제한 예시',
    label: '1ℓ 초과',
  },
  {
    src: `${BAGGAGE_IMAGE_PATH}/restricted-liquids-guide-3.png`,
    alt: '개별 용기 용량이 100ml를 초과한 제한 예시',
    label: '100ml 초과',
  },
];

export default function LiquidCarryOnGuide() {
  return (
    <div className="baggage-guide-liquid-images">
      {LIQUID_GUIDES.map((guide) => (
        <figure key={guide.src}>
          <img src={guide.src} alt={guide.alt} />
          <figcaption>{guide.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}
