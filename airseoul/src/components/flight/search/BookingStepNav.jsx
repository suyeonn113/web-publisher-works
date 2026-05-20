const BOOKING_STEPS = [
  { number: '01', label: '여정/일정/인원' },
  { number: '02', label: '운임선택' },
  { number: '03', label: '탑승객정보' },
  { number: '04', label: '부가서비스' },
];

function BookingStepNav({ activeStep = 2 }) {
  return (
    <nav className="booking-step-nav" aria-label="예매 진행 단계">
      <ol className="booking-step-nav__list">
        {BOOKING_STEPS.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === activeStep;

          return (
            <li
              className={`booking-step-nav__item${isActive ? ' is-active' : ''}`}
              key={step.number}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="booking-step-nav__number">{step.number}</span>
              <span className="booking-step-nav__label">{step.label}</span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default BookingStepNav;
