export default function CheckInProcessFlow({ items }) {
  return (
    <ol className={`check-in-process-flow check-in-process-flow--${items.length}`}>
      {items.map((item, index) => (
        <li key={item.label}>
          <div className="check-in-process-flow__image">
            <img
              src={item.image}
              alt=""
              onError={(event) => {
                event.currentTarget.hidden = true;
              }}
            />
          </div>
          <div>
            <small>STEP {String(index + 1).padStart(2, '0')}</small>
            <h4>{item.label}</h4>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
