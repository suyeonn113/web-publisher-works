export default function BaggageTable({
  caption,
  columns,
  rows,
  variant = '',
  preserveTable = false,
}) {
  const variantClass = variant ? ` baggage-table--${variant}` : '';
  const preserveTableClass = preserveTable ? ' baggage-table--preserve-table' : '';

  return (
    <div
      className={`baggage-table baggage-table--${columns.length}-columns${variantClass}${preserveTableClass}`}
    >
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join('-')}>
              {row.map((cell, index) => (
                index === 0 ? (
                  <th scope="row" data-label={columns[index]} key={cell}>{cell}</th>
                ) : (
                  <td data-label={columns[index]} key={`${cell}-${index}`}>{cell}</td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
