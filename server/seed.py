#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import datetime

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Comment, Reply, Like, ReplyLike, Follow

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        print("Clearing db...")
        User.query.delete()
        Comment.query.delete()
        Reply.query.delete()
        Like.query.delete()
        ReplyLike.query.delete()
        Follow.query.delete()
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
        user2 = User(
            username='roronoazoro',
            email='roronoazoro@gmail.com',
            first_name='Roronoa',
            last_name='Zoro',
            profile_pic='https://i.imgur.com/XcxCRIW.png'
        )
        user2.password_hash = 'password'
        users.append(user2)
        user3 = User(
            username='leviackerman',
            email='leviackerman@gmail.com',
            first_name='Levi',
            last_name='Ackerman',
            profile_pic='https://i.imgur.com/Bfqji06.png'
        )
        user3.password_hash = 'password'
        users.append(user3)
        user4 = User(
            username='edwardelric',
            email='edwardelric@gmail.com',
            first_name='Edward',
            last_name='Elric',
            profile_pic='https://i.imgur.com/Tf2jQQV.png'
        )
        user4.password_hash = 'password'
        users.append(user4)
        user5 = User(
            username='gojosatoru',
            email='gojosatoru@gmail.com',
            first_name='Gojo',
            last_name='Satoru',
            profile_pic='https://i.imgur.com/qRfUCpd.png'
        )
        user5.password_hash = 'password'
        users.append(user5)
        user6 = User(
            username='josephjoestar',
            email='josephjoestar@gmail.com',
            first_name='Joseph',
            last_name='Joestar',
            profile_pic='https://i.imgur.com/U44ASCB.png'
        )
        user6.password_hash = 'password'
        users.append(user6)
        user7 = User(
            username='monkeydluffy',
            email='monkeydluffy@gmail.com',
            first_name='Monkey',
            last_name='Luffy',
            profile_pic='https://i.imgur.com/JrCXyOZ.png'
        )
        user7.password_hash = 'password'
        users.append(user7)
        user8 = User(
            username='arsenelupiniii',
            email='arsenelupiniii@gmail.com',
            first_name='Arsene',
            last_name='Lupin III',
            profile_pic='https://i.imgur.com/R6497xl.png'
        )
        user8.password_hash = 'password'
        users.append(user8)
        user9 = User(
            username='kenshinhimura',
            email='kenshinhimura@gmail.com',
            first_name='Kenshin',
            last_name='Himura',
            profile_pic='https://i.imgur.com/0Mq5J1u.png'
        )
        user9.password_hash = 'password'
        users.append(user9)
        user10 = User(
            username='spikespiegel',
            email='spikespiegel@gmail.com',
            first_name='Spike',
            last_name='Spiegel',
            profile_pic='https://i.imgur.com/DBYghZ8.png'
        )
        user10.password_hash = 'password'
        users.append(user10)
        db.session.add_all(users)

        print("Seeding comments...")
        comments = []
        comment1 = Comment(
            comment="I am justice",
            created_date=datetime.now(),
            commenter_id = 1
        )
        comments.append(comment1)
        comment2 = Comment(
            comment="I am going to be the world's greatest swordsman!",
            created_date=datetime.now(),
            commenter_id = 2
        )
        comments.append(comment2)
        comment3 = Comment(
            comment="No one ever knows how it will turn out. So choose for yourself, whichever decision you will regret the least.",
            created_date=datetime.now(),
            commenter_id = 3
        )
        comments.append(comment3)
        comment4 = Comment(
            comment="Stand up and walk. Keep moving forward. You've got two good legs. So get up and use them. You're strong enough to make your own path.",
            created_date=datetime.now(),
            commenter_id = 4
        )
        comments.append(comment4)
        comment5 = Comment(
            comment="Throughout Heaven and Earth, I alone am the honored one.",
            created_date=datetime.now(),
            commenter_id = 5
        )
        comments.append(comment5)
        comment6 = Comment(
            comment="I planned every detail! I stacked the whole deck! That is a total lie, but it will drive Kars nuts.",
            created_date=datetime.now(),
            commenter_id = 6
        )
        comments.append(comment6)
        comment7 = Comment(
            comment="I will become the Pirate King!",
            created_date=datetime.now(),
            commenter_id = 7
        )
        comments.append(comment7)
        comment8 = Comment(
            comment="In the words of Regis Philbin: who wants to be a millionaire?",
            created_date=datetime.now(),
            commenter_id = 8
        )
        comments.append(comment8)
        comment9 = Comment(
            comment="Just because you die does not mean that the people you killed will come back to life...",
            created_date=datetime.now(),
            commenter_id = 9
        )
        comments.append(comment9)
        comment10 = Comment(
            comment="You know what they say, cowboy, easy come, easy go.",
            created_date=datetime.now(),
            commenter_id = 10
        )
        comments.append(comment10)
        db.session.add_all(comments)

        print("Seeding replies...")
        replies = []
        reply1 = Reply(
            reply="What?",
            created_date=datetime.now(),
            comment_id = 1,
            replier_id = 2
        )
        replies.append(reply1)
        db.session.add_all(replies)

        print("Seeding likes...")
        likes = []
        like1 = Like(
            created_date=datetime.now(),
            comment_liker_id = 2,
            liked_comment_id = 1
        )
        likes.append(like1)
        db.session.add_all(likes)

        print("Seeding follows...")
        follows = []
        follow1 = Follow(
            follow_date=datetime.now(),
            follower_id = 1,
            followed_id  = 2
        )
        follows.append(follow1)
        db.session.add_all(follows)
        db.session.commit()

        print("Seeding done!")
