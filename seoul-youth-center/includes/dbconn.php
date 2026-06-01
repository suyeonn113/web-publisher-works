<?php

mysqli_report(MYSQLI_REPORT_OFF);

$mysqli = mysqli_connect('localhost', 'suyeonn', 'Hh0468139@', 'suyeonn');

if (!$mysqli) {
    die('DB 연결에 실패했습니다. 서버 DB 정보와 테이블 import 여부를 확인해주세요.');
}

mysqli_select_db($mysqli, 'suyeonn');
mysqli_set_charset($mysqli, 'utf8mb4');
