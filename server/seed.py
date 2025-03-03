#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Reply

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Clearing db...")
        User.query.delete()
        Comment.query.delete()
        Reply.query.delete()
        db.session.commit()


        print("Seeding users...")
        users = []
        user1 = User(
            username='lightyagami',
            email='lightyagami@gmail.com',
            first_name='Light',
            last_name='Yagami',
            profile_pic='https://i.imgur.com/q4IgIRx.png'
        )
        user1.password_hash = 'password'
        users.append(user1)
        db.session.add_all(users)
        user2 = User(
            username='roronoazoro',
            email='roronoazoro@gmail.com',
            first_name='Roronoa',
            last_name='Zoro',
            profile_pic='https://i.imgur.com/XcxCRIW.png'
        )
        user2.password_hash = 'password'
        users.append(user2)
        db.session.commit()

        print("Seeding comments...")
        comments = []
        comment1 = Comment(
            comment="I am justice",
            created_date=datetime.now(),
            user_id = 1
        )
        comments.append(comment1)
        db.session.add_all(comments)
        db.session.commit()

        print("Seeding replies...")
        replies = []
        reply1 = Reply(
            reply="What?",
            created_date=datetime.now(),
            comment_id = 1,
            user_id = 2
        )
        replies.append(reply1)
        db.session.add_all(replies)
        db.session.commit()

        print("Seeding done!")
