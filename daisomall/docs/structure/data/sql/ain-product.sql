create table product(
    category varchar(20) not null,
    id int primary key,
    price int not null,
    name varchar(100) not null,
    rating decimal(3,2),
    review_count int,
    badges text,
    thumbnail text,
    image text,

    foreign key (category) references category(id)
    on update cascade
    on delete restrict
)engine=innoDB charset=utf8;

INSERT INTO product (category, id, price, name, rating, review_count, badges, thumbnail, image) VALUES
/* 뷰티/위생 */
('beaty', 1001, 5000, '[퀵수분충전]VT PDRN 광채토너 200 ml', 4.8, 5315, 'delivery_standard,pickup', '', ''),

/* 주방용품 */
('kitchen', 2001, 5000, '니트릴 장갑 120매 L 블랙', 4.8, 175, 'delivery_standard', '', ''),

/* 청소/욕실 */
('clean_bath', 3001, 3000, '요석 석회 강력 제거제 500 ml', 4.7, 7301, 'delivery_standard,pickup,delivery_today', '', ''),

/* 수납/정리 */
('organizing', 4001, 2000, '디자인 책꽂이', 4.8, 1360, 'delivery_standard,pickup', '', ''),

/* 문구/팬시 */
('fancy', 5001, 1000, '반투명 L홀더 12P', 4.9, 941, 'delivery_standard,pickup,delivery_today', '', ''),

/* 인테리어/원예 */
('interior', 6001, 5000, '단색 퍼즐 매트 30 X 30 X 1 cm 10개입', 4.8, 152, 'delivery_standard,pickup', '', ''),

/* 공구/디지털 */
('tools_digital', 7001, 2000, '무선 사각 탁상 선풍기 화이트', 5.0, 99, 'new,delivery_standard', '', ''),

/* 식품 */
('food', 8001, 5000, '[우형재 PICK] 익스트림 모노크레아틴 플러스 120 g 40일분', 4.7, 63, 'new,delivery_standard,delivery_today', '', ''),

/* 스포츠/레저/취미 */
('sports', 9001, 3000, '여행용 와이드 오픈 파우치', 4.6, 285, 'delivery_standard', '', ''),

/* 패션/잡화 */
('fashion', 1101, 2000, '대나무 접이식 부채 22.5 cm 한글', 4.8, 75, 'new,delivery_standard,delivery_today', '', ''),

/* 반려동물 */
('pet', 1201, 5000, '[펫] 포포몽 카사벤토 고양이 모래 3.2 kg (깨끗한나라) (100g당 156원)', 4.8, 353, 'delivery_standard,pickup,delivery_today', '', ''),

/* 유아/완구 */
('kids_toy', 1301, 2000, '천사 점토 하양 50 g', 4.9, 321, 'delivery_standard,pickup,delivery_today', '', '');