<?php
// Подключение к бд
$servername = 'MySQL-8.2';
$username = 'root';
$password = '';
$dbname = 'reactmakimacoin';

$conn = new mysqli($servername, $username, $password, $dbname);
// проверка подключения
if ($conn->connect_error) {
    // Выводит сообщение и прекращает выполнение текущего скрипта
    die('Ошибка подключения, ошибка: ' . $conn->connect_error);
}
