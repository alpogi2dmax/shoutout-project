#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response
from flask_restful import Resource

# Local imports
from config import app, db, api, datetime
# Add your model imports
from models import User, Comment, Reply, user_schema, users_schema, comment_schema, comments_schema, reply_schema, replies_schema




# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):

    def get(self):

        users = User.query.all()
        response = users_schema.dump(users), 200
        return response
    
    def post(self):
        try:
            data = request.get_json()
            user = User(
                username = data['username'],
                email = data['email'],
                first_name = data['first_name'],
                last_name = data['last_name'],
                profile_pic = data['profile_pic']
            )
            user.password_hash = data['password']
            db.session.add(user)
            db.session.commit()
            response = make_response(user_schema.dump(user), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400
    
api.add_resource(Users,'/users')

class UsersByID(Resource):

    def get(self, id):
        user = User.query.filter_by(id=id).first()
        response = make_response(user_schema.dump(user), 200)
        return response

    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.get_json()
        if user:
            if 'password' in data:
                user.password_hash = data['password']
            for attr, value, in data.items():
                setattr(user, attr, value)
            db.session.add(user)
            db.session.commit()
            response = make_response(user_schema.dump(user), 202)
            return response
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404
        
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            response_body= ''
            return response_body, 204
        else: 
            response_body = {'error': 'User not found'}
            return response_body, 404



api.add_resource(UsersByID,'/users/<int:id>')

class Comments(Resource):

    def get(self):

        comments = Comment.query.all()
        response = comments_schema.dump(comments), 200
        return response
    
    def post(self):
        try:
            data = request.get_json()
            comment = Comment(
                comment = data['comment'],
                user_id = data['user_id']
            )
            comment.created_date = datetime.now()
            db.session.add(comment)
            db.session.commit()
            response = make_response(comment_schema.dump(comment), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400

api.add_resource(Comments,'/comments')

class CommentsByID(Resource):

    def get(self, id):
        comment = Comment.query.filter_by(id=id).first()
        response = comment_schema.dump(comment), 200
        return  response
    
    def patch(self, id):
        comment = Comment.query.filter_by(id=id).first()
        data = request.get_json()
        if comment:
            for attr, value, in data.items():
                setattr(comment, attr, value)
            db.session.add(comment)
            db.session.commit()
            response = make_response(comment_schema.dump(comment), 202)
            return response
        else:
            response_body = {'error': 'Comment not found'}
            return response_body, 404
        
    def delete(self, id):
        comment = Comment.query.filter_by(id=id).first()
        if comment:
            db.session.delete(comment)
            db.session.commit()
            response_body= ''
            return response_body, 204
        else: 
            response_body = {'error': 'Comment not found'}
            return response_body, 404

api.add_resource(CommentsByID,'/comments/<int:id>')

class Replies(Resource):

    def get(self):

        replies = Reply.query.all()
        response = replies_schema.dump(replies), 200
        return response
    
    def post(self):
        try:
            data = request.get_json()
            reply = Reply(
                reply = data['reply'],
                comment_id = data['comment_id'],
                user_id = data['user_id']
            )
            reply.created_date = datetime.now()
            db.session.add(reply)
            db.session.commit()
            response = make_response(reply_schema.dump(reply), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400
    
api.add_resource(Replies,'/replies')

class RepliesByID(Resource):

    def get(self, id):
        reply = Reply.query.filter_by(id=id).first()
        response = reply_schema.dump(reply), 200
        return response
    
    def patch(self, id):
        reply = Reply.query.filter_by(id=id).first()
        data = request.get_json()
        if reply:
            for attr, value, in data.items():
                setattr(reply, attr, value)
            db.session.add(reply)
            db.session.commit()
            response = make_response(reply_schema.dump(reply), 202)
            return response
        else:
            response_body = {'error': 'Reply not found'}
            return response_body, 404

    def delete(self, id):
        reply = Reply.query.filter_by(id=id).first()
        if reply:
            db.session.delete(reply)
            db.session.commit()
            response_body= ''
            return response_body, 204
        else: 
            response_body = {'error': 'Reply not found'}
            return response_body, 404
    
api.add_resource(RepliesByID,'/replies/<int:id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

