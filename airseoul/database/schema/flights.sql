CREATE TABLE airseoul_flights (
  flight_id VARCHAR(64) PRIMARY KEY,
  airline_code VARCHAR(8) NOT NULL,
  airline_name VARCHAR(64) NOT NULL,
  flight_no VARCHAR(16) NOT NULL,
  origin_code VARCHAR(8) NOT NULL,
  origin_city VARCHAR(64) NOT NULL,
  origin_airport VARCHAR(64) NOT NULL,
  origin_terminal VARCHAR(32) NOT NULL,
  destination_code VARCHAR(8) NOT NULL,
  destination_city VARCHAR(64) NOT NULL,
  destination_airport VARCHAR(64) NOT NULL,
  destination_terminal VARCHAR(32) NOT NULL,
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  arrival_date DATE NOT NULL,
  arrival_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL,
  availability_status VARCHAR(24) NOT NULL,
  seats_left INTEGER NOT NULL
);

CREATE TABLE airseoul_flight_fares (
  flight_id VARCHAR(64) NOT NULL,
  fare_type VARCHAR(24) NOT NULL,
  currency VARCHAR(8) NOT NULL,
  fare_label VARCHAR(64) NOT NULL,
  price INTEGER NOT NULL,
  seats_left INTEGER NOT NULL,
  baggage_included BOOLEAN NOT NULL,
  CONSTRAINT fk_flight_fares_flight
    FOREIGN KEY (flight_id)
    REFERENCES airseoul_flights (flight_id),
  CONSTRAINT pk_flight_fares
    PRIMARY KEY (flight_id, fare_type)
);

CREATE INDEX idx_flights_search
  ON airseoul_flights (origin_code, destination_code, departure_date);

CREATE INDEX idx_flight_fares_flight
  ON airseoul_flight_fares (flight_id);
