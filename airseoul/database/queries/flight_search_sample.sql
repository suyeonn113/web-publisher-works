SELECT
  f.flight_id,
  f.airline_code,
  f.airline_name,
  f.flight_no,
  f.origin_code,
  f.origin_city,
  f.origin_airport,
  f.origin_terminal,
  f.destination_code,
  f.destination_city,
  f.destination_airport,
  f.destination_terminal,
  f.departure_date,
  f.departure_time,
  f.arrival_date,
  f.arrival_time,
  f.duration_minutes,
  f.availability_status,
  f.seats_left AS flight_seats_left,
  ff.fare_type,
  ff.currency,
  ff.fare_label,
  ff.price,
  ff.seats_left AS fare_seats_left,
  ff.baggage_included
FROM airseoul_flights f
JOIN airseoul_flight_fares ff
  ON ff.flight_id = f.flight_id
WHERE f.origin_code = 'ICN'
  AND f.destination_code = 'NRT'
  AND f.departure_date = '2026-05-16'
ORDER BY f.departure_time, ff.price;
