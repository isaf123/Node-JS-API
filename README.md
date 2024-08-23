# Node JS Programmer Take Home Test

[![copy](https://img.icons8.com/material-outlined/24/000000/copy.png) https://example.com](https://example.com)
[Klik di sini untuk membuka situs](https://example.com)
### Database

```
code blocks for commands
```

```sql
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `service_code` varchar(20) NOT NULL,
  `service_name` varchar(45) NOT NULL,
  `service_icon` varchar(45) NOT NULL,
  `service_tariff` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `services` VALUES 
(1,'PAJAK','Pajak PBB','https://nutech-integrasi.app/dummy.jpg',40000),
(2,'PLN','Listrik','https://nutech-integrasi.app/dummy.jpg',10000),
(3,'PDAM','PDAM Berlangganan','https://nutech-integrasi.app/dummy.jpg',40000),
(4,'PULSA','Pulsa','https://nutech-integrasi.app/dummy.jpg',40000),
(5,'PGN','PGN Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),
(6,'MUSIK','Musik Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),
(7,'TV','TV Berlangganan','https://nutech-integrasi.app/dummy.jpg',50000),
(8,'PAKET_DATA','Paket data','https://nutech-integrasi.app/dummy.jpg',50000),
(9,'VOUCHER_GAME','Voucher Game','https://nutech-integrasi.app/dummy.jpg',100000),
(10,'VOUCHER_MAKANAN','Voucher Makanan','https://nutech-integrasi.app/dummy.jpg',100000),
(11,'QURBAN','Qurban','https://nutech-integrasi.app/dummy.jpg',200000),
(12,'ZAKAT','Zakat','https://nutech-integrasi.app/dummy.jpg',300000);

SELECT * FROM `transactions`;

CREATE TABLE `transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(45) NOT NULL,
  `transaction_type` varchar(20) NOT NULL,
  `description` varchar(45) NOT NULL,
  `total_amount` int NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `banner` (
  `id` int NOT NULL AUTO_INCREMENT,
  `banner_name` varchar(45) NOT NULL,
  `banner_image` varchar(45) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `banner` (`banner_name`, `banner_image`, `description`) VALUES
('Banner 1', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 2', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 3', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 4', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 5', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet'),
('Banner 6', 'https://nutech-integrasi.app/dummy.jpg', 'Lerem Ipsum Dolor sit amet');

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `profile_image` text,
  `balance` int DEFAULT '0',
  PRIMARY KEY (`id`)
);

