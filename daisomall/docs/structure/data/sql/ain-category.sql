create table category(
    id varchar(20) primary key,
    name varchar(20) not null,
    parent_id varchar(20) null,

    foreign key (parent_id) references category(id)
    on update cascade
    on delete set null
)engine=innoDB charset=utf8;

/* 전체 */
insert into category (id, name, parent_id) values ("all","전체",null);

/* 뷰티/위생 */
insert into category (id, name, parent_id) values ("beauty","뷰티/위생","all");
insert into category (id, name, parent_id) values ("skincare","스킨케어","beauty");
insert into category (id, name, parent_id) values ("toner","스킨/토너","skincare");

/* 주방용품 */
insert into category (id, name, parent_id) values ("kitchen","주방용품","all");

/* 청소/욕실 */
insert into category (id, name, parent_id) values ("clean_bath","청소/욕실","all");