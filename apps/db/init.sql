CREATE DATABASE story;
use story;

CREATE TABLE `stories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '故事名称',
  `description` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '描述',
  `channel` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '渠道',
  -- `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '' COMMENT '内容',
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT 'json详细信息，封面、内容等',
  `source` int NOT NULL DEFAULT '0' COMMENT '来源',
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `status` int NOT NULL COMMENT '1=待审核, 2=审核通过, 3=审核失败',
  PRIMARY KEY (`id`),
  KEY `update_time` (`update_time`)
) ENGINE=InnoDB AUTO_INCREMENT=1151165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

use mysql;
create user 'read_only'@'%' identified WITH mysql_native_password by 'Story_read_13456';
flush privileges;
GRANT SELECT ON story.* TO 'read_only'@'%' WITH GRANT OPTION;
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'Story_13456';
flush privileges;



ALTER TABLE `story`.`stories` 
ADD COLUMN `audio_link` TEXT CHARACTER SET 'utf8mb4' NULL DEFAULT NULL COMMENT '音频的链接' AFTER `channel`;
