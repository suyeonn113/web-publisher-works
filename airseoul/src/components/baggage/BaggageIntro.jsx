export default function BaggageIntro({ title, description, image, imageAlt }) {
  return (
    <header className="baggage-guide-intro">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {image && <img src={image} alt={imageAlt} />}
    </header>
  );
}
