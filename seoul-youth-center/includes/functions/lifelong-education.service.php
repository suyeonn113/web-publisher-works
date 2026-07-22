<?php

declare(strict_types=1);

function findLifelongEducationClass(array $classes, int $classId): ?array
{
    foreach ($classes as $class) {
        if ((int) ($class['id'] ?? 0) === $classId) {
            return $class;
        }
    }

    return null;
}

function isLifelongEducationClassOpen(array $class): bool
{
    $capacity = (int) ($class['capacity'] ?? 0);
    $applied = (int) ($class['applied_count'] ?? 0);

    return ($class['status'] ?? '') === 'open' && $capacity > $applied;
}

function getOpenLifelongEducationClasses(array $classes): array
{
    return array_values(array_filter($classes, 'isLifelongEducationClassOpen'));
}

function getLifelongEducationOccupancy(array $class): int
{
    $capacity = max(1, (int) ($class['capacity'] ?? 0));
    $applied = min($capacity, max(0, (int) ($class['applied_count'] ?? 0)));

    return (int) round(($applied / $capacity) * 100);
}

function matchesLifelongEducationFilters(array $class, string $group, string $category, string $keyword): bool
{
    if ($group !== '' && ($class['group'] ?? '') !== $group) {
        return false;
    }

    if ($category !== '' && ($class['category'] ?? '') !== $category) {
        return false;
    }

    if ($keyword === '') {
        return true;
    }

    $haystack = implode(' ', [
        $class['title'] ?? '',
        $class['class_name'] ?? '',
        $class['instructor'] ?? '',
        $class['target'] ?? '',
    ]);

    return mb_stripos($haystack, $keyword, 0, 'UTF-8') !== false;
}
