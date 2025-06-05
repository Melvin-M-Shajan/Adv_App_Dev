create database social_media;
use social_media;

CREATE TABLE users(
user_id INTEGER PRIMARY KEY AUTO_INCREMENT,
username VARCHAR(255) UNIQUE ,
first_name VARCHAR(25),
last_name VARCHAR(25),
email VARCHAR(100),
phone_number VARCHAR(12),
created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_on TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
profile_pic VARCHAR(2083) DEFAULT NULL);

CREATE TABLE user_credentials(
 username VARCHAR(255),
 user_password VARCHAR(255),
 FOREIGN KEY (username) REFERENCES users(username));

select * from users;
select * from user_credentials;
-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    author_id INT,
    title VARCHAR(255),
    description TEXT,
    image_url VARCHAR(2083),
    is_deleted BOOLEAN DEFAULT FALSE,
    is_edited BOOLEAN DEFAULT FALSE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(user_id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT,
    author_id INT,
    content TEXT,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_edited BOOLEAN DEFAULT FALSE,
    created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_on TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(post_id),
    FOREIGN KEY (author_id) REFERENCES users(user_id)
);

-- Create likes on posts table
CREATE TABLE IF NOT EXISTS likes_posts (
    user_id INT,
    post_id INT,
    PRIMARY KEY (user_id, post_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (post_id) REFERENCES posts(post_id)
);

-- Create likes on comments table
CREATE TABLE IF NOT EXISTS likes_comments (
    user_id INT,
    comment_id INT,
    PRIMARY KEY (user_id, comment_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (comment_id) REFERENCES comments(comment_id)
);
