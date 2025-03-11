from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import Schema, fields
from sqlalchemy.orm import validates
from sqlalchemy import CheckConstraint
from email_validator import validate_email, EmailNotValidError

from config import db, bcrypt, ma, datetime

# Models go here!

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    profile_pic = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    #add relationship with comment
    comments = db.relationship('Comment', back_populates='user', cascade='all, delete-orphan')
    

    #add relationship with replies
    replies = db.relationship('Reply', back_populates='user', cascade='all, delete-orphan')

    #add relationship with comment via likes
    likes = db.relationship('Like', back_populates='comment_liker', cascade='all, delete-orphan')
    liked_comments = association_proxy('likes', 'liked_comment')

    #validation
    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3 or len(username) > 15:
            raise ValueError('username must be between 3 and 15 characters')
        return username
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if len(first_name) < 1 or len(first_name) > 20:
            raise ValueError('first name must be between 1 and 20 characters')
        return first_name
    
    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if len(last_name) < 1 or len(last_name) > 20:
            raise ValueError('last name must be between 1 and 20 characters')
        return last_name
    
    @validates('email')
    def validate_email(self, key, email):
        try:
            validate_email(email)
        except EmailNotValidError:
            raise ValueError("Invalid email address")
        return email

    
class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String)
    created_date = db.Column(db.DateTime)

    #add relationship with user
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='comments')

    #add relationship with replies
    replies = db.relationship('Reply', back_populates='comment', cascade='all, delete-orphan')

    
    #many to many relationship with User via likes
    likes = db.relationship('Like', back_populates='liked_comment', cascade='all, delete-orphan')
    comment_likers = association_proxy('likes', 'comment_liker')

    #validation
    @validates('comment')
    def validate_username(self, key, comment):
        if len(comment) < 1 or len(comment) > 145:
            raise ValueError('comment cannot be blank and cannot be more than 145 characters')
        return comment

class Reply(db.Model):
    __tablename__ = 'replies'

    id = db.Column(db.Integer, primary_key=True)
    reply = db.Column(db.String)
    created_date = db.Column(db.DateTime)

    #add relationship with Comment
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))
    comment = db.relationship('Comment', back_populates='replies')

    #add relationship with User
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user = db.relationship('User', back_populates='replies')

    #validation
    @validates('replies')
    def validate_username(self, key, replies):
        if len(replies) < 1 or len(replies) > 145:
            raise ValueError('replies cannot be blank and cannot be more than 145 characters')
        return replies
    
class Like(db.Model):
    __tablename__ = "likes"

    id = db.Column(db.Integer, primary_key=True)
    created_date = db.Column(db.DateTime)

    #add relationships:
    comment_liker_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    liked_comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'))

    comment_liker = db.relationship('User', back_populates='likes')
    liked_comment = db.relationship('Comment', back_populates='likes')


    
class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True

    id = ma.auto_field()
    username = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()
    profile_pic = ma.auto_field()
    comments = ma.Nested( lambda: CommentSchema, many=True, only=('id', 'comment', 'created_date', 'user', 'replies'))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "usersbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("users"),
        }
    )

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class CommentSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Comment
        load_instance = True

    id = ma.auto_field()
    comment = ma.auto_field()
    created_date = ma.auto_field()
    user = ma.Nested(lambda: UserSchema, only=('id', 'first_name', 'last_name', 'profile_pic'))
    # replies = ma.Nested(lambda: ReplySchema, many=True, only=('id', 'reply', 'created_date', 'user'))
    replies = ma.Method("get_replies")
    comment_likers = ma.Nested(lambda: UserSchema, many=True, only=('id', 'first_name', 'last_name'))
    likes = ma.Nested(lambda: LikeSchema, many=True, only=('id', 'comment_liker'))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "commentsbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("comments"),
        }
    )

    def get_replies(self, comment):
        replies = comment.replies
        replies_schema = ReplySchema(many=True)
        # Use sorted with reverse=True to sort in descending order
        sorted_replies = sorted(replies, key=lambda x: x.created_date, reverse=True)
        reply_data = replies_schema.dump(sorted_replies)
        return reply_data

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)

class ReplySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Reply
        load_instance = True

    id = ma.auto_field()
    reply = ma.auto_field()
    created_date = ma.auto_field()
    user = ma.Nested(lambda: UserSchema, only=('id', 'first_name', 'last_name', 'profile_pic'))
    comment = ma.Nested(lambda: CommentSchema, only=('id', 'comment', 'created_date'))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "commentsbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("comments"),
        }
    )

reply_schema = ReplySchema()
replies_schema = ReplySchema(many=True)

class LikeSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Like
        load_instance = True

    id = ma.auto_field()
    created_date = ma.auto_field()
    comment_liker = ma.Nested(lambda: UserSchema, only=('id', 'first_name', 'last_name'))
    liked_comment = ma.Nested(lambda: CommentSchema, only=('id', 'comment', 'created_date'))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "likesbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("likes"),
        }
    )

like_schema = LikeSchema()
likes_schema = LikeSchema(many=True)
