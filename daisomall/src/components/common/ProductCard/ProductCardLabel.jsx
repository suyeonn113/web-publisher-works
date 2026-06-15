function ProductCardLabel({ label }) {
  const [prefix, ...restLabel] = label.split(' ')
  const accentLabel = restLabel.join(' ')
  const hasAccentLabel = prefix === '구매' && accentLabel.length > 0

  return (
    <span className="product-card__label">
      {hasAccentLabel ? (
        <>
          <span>{prefix}</span>
          <strong>{accentLabel}</strong>
        </>
      ) : (
        label
      )}
    </span>
  )
}

export default ProductCardLabel
