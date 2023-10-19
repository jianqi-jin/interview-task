CREATE DATABASE interview;
use interview;

CREATE TABLE `user` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'user',
  `password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'md5_password',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL COMMENT '1=待审核, 2=审核通过, 3=审核失败',
  PRIMARY KEY (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=1151165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `task` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'task名称',
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT 'task描述',
  `ori_img_key` TEXT CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT 'original image',
  `latest_img_key` TEXT CHARACTER SET utf8mb4 NULL DEFAULT NULL COMMENT 'masked matest image',
  -- `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '内容',
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'json详细信息',
  -- `source` int NOT NULL DEFAULT '0' COMMENT '来源',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL COMMENT '1=待审核, 2=审核通过, 3=审核失败',
  PRIMARY KEY (`id`),
  KEY `update_time` (`update_time`)
) ENGINE=InnoDB AUTO_INCREMENT=1151165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `history` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `task_id` bigint unsigned NOT NULL COMMENT 'task id',
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'json详细信息',
  `version` int NOT NULL COMMENT 'history 相对于mask的 version',
  `is_active` int NOT NULL DEFAULT '1' COMMENT '是否是当前版本 1 当前版本 0 历史版本',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL COMMENT '1=待审核, 2=审核通过, 3=审核失败',
  PRIMARY KEY (`id`),
  KEY `update_time` (`update_time`)
) ENGINE=InnoDB AUTO_INCREMENT=1151165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

use mysql;
create user 'read_only'@'%' identified WITH mysql_native_password by 'Interview_read_13456';
flush privileges;
GRANT SELECT ON interview.* TO 'read_only'@'%' WITH GRANT OPTION;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Interview_13456';
flush privileges;
