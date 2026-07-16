<?php

function valid_member_user_id(string $value): bool
{
    return preg_match('/^(?=.*[a-z])(?=.*[0-9])[a-z0-9]{4,16}$/', $value) === 1;
}

function valid_member_password(string $value): bool
{
    return preg_match('/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^*+=-]).{10,}$/', $value) === 1;
}

function valid_member_phone(string $value): bool
{
    return preg_match('/^01[0-9]{8,9}$/', $value) === 1;
}

function valid_member_email(string $value): bool
{
    return filter_var($value, FILTER_VALIDATE_EMAIL) !== false;
}
