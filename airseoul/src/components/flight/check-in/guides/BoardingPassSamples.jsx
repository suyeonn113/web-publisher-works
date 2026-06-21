const CHECK_IN_IMAGE_PATH = `${import.meta.env.BASE_URL}images/check-in`;

const BOARDING_PASS_SAMPLES = [
  {
    label: '인터넷 이용 고객',
    src: `${CHECK_IN_IMAGE_PATH}/boarding-pass-web.png`,
    alt: '인터넷 탑승권 샘플',
  },
  {
    label: '모바일 이용 고객',
    src: `${CHECK_IN_IMAGE_PATH}/boarding-pass-mobile.png`,
    alt: '모바일 탑승권 샘플',
  },
];

export default function BoardingPassSamples() {
  return (
    <section
      className="flight-check-in-detail__boarding-samples"
      aria-labelledby="boarding-samples-title"
    >
      <h2 id="boarding-samples-title">탑승권 샘플</h2>
      <div>
        {BOARDING_PASS_SAMPLES.map((sample) => (
          <figure key={sample.label}>
            <figcaption>{sample.label}</figcaption>
            <div>
              <img
                src={sample.src}
                alt={sample.alt}
                onError={(event) => {
                  event.currentTarget.hidden = true;
                }}
              />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
