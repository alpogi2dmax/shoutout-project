#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api, datetime
# Add your model imports
from models import User, Comment, Reply, Like, ReplyLike, Follow, user_schema, users_schema, comment_schema, comments_schema, reply_schema, replies_schema, like_schema, likes_schema, reply_like_schema, reply_likes_schema, follow_schema, follows_schema




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

class UsersBySearch(Resource):

    def get(self, search):
        search_term = f"%{search.lower()}%"
        users = User.query.filter(
            (User.username.ilike(search_term)) |
            (User.email.ilike(search_term)) |
            (User.first_name.ilike(search_term)) |
            (User.last_name.ilike(search_term))
        ).all()
        print(users)

        # Serialize the filtered users
        response = make_response(users_schema.dump(users), 200)
        return response
    
api.add_resource(UsersBySearch,'/users/<string:search>')

class Comments(Resource):

    def get(self):

        user = User.query.filter_by(id=session['user_id']).first()
        comments = Comment.query.order_by(Comment.created_date.desc()).all()
        user_followers = [follower.id for follower in user.followers]
        user_followers.append(user.id)
        filtered_comments = [comment for comment in comments if comment.commenter.id in user_followers]
        # comments = Comment.query.all()
        response = comments_schema.dump(filtered_comments), 200
        return response
    
    def post(self):
        try:
            data = request.get_json()
            comment = Comment(
                comment = data['comment'],
                commenter_id = data['commenter_id']
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

        replies = Reply.query.order_by(Reply.created_date.desc()).all()
        response = replies_schema.dump(replies), 200
        return response
    
    def post(self):
        try:
            data = request.get_json()
            reply = Reply(
                reply = data['reply'],
                comment_id = data['comment_id'],
                replier_id = data['replier_id']
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

class Likes(Resource):

    def post(self):
        try:
            data = request.get_json()
            like = Like(
                comment_liker_id = data['comment_liker_id'],
                liked_comment_id = data['liked_comment_id']
            )
            like.created_date = datetime.now()
            db.session.add(like)
            db.session.commit()
            response = make_response(like_schema.dump(like), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400
    
api.add_resource(Likes,'/likes')

class LikesByID(Resource):

    def delete(self, id):
        like = Like.query.filter_by(id=id).first()
        if like:
            db.session.delete(like)
            db.session.commit()
            response_body= ''
            return response_body, 204
        else: 
            response_body = {'error': 'Like not found'}
            return response_body, 404
    
api.add_resource(LikesByID,'/likes/<int:id>')

class ReplyLikes(Resource):

    def post(self):
        try:
            data = request.get_json()
            reply_like = ReplyLike(
                reply_liker_id = data['reply_liker_id'],
                liked_reply_id = data['liked_reply_id']
            )
            reply_like.created_date = datetime.now()
            db.session.add(reply_like)
            db.session.commit()
            response = make_response(reply_like_schema.dump(reply_like), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400
    
api.add_resource(ReplyLikes,'/reply_likes')

class ReplyLikesByID(Resource):

    def delete(self, id):
        reply_like = ReplyLike.query.filter_by(id=id).first()
        if reply_like:
            db.session.delete(reply_like)
            db.session.commit()
            response_body= ''
            return response_body, 204
        else: 
            response_body = {'error': 'Reply Like not found'}
            return response_body, 404
    
api.add_resource(ReplyLikesByID,'/reply_likes/<int:id>')

class Follows(Resource):

    def post(self):
        try:
            data = request.get_json()
            print('Received data:', data)
            follow = Follow(
                follower_id = data['follower_id'],
                followed_id = data['followed_id']
            )
            follow.follow_date = datetime.now()
            db.session.add(follow)
            db.session.commit()
            response = make_response(follow_schema.dump(follow), 201)
            return response
        except Exception as e:
            print("Error:", e)
            response_body = {'errors': [str(e)]}
            return response_body, 400

api.add_resource(Follows, '/follows')

class FollowsByID(Resource):

    def get(self, id):
        follow = Follow.query.get(id)
        if follow:
            return follow_schema.dump(follow)
        else:
            return {'error': 'Follow not found'}, 404
        
    def delete(self, id):
        follow = Follow.query.filter_by(id=id).first()
        if follow:
            db.session.delete(follow)
            db.session.commit()
            response_body= ''
            return response_body, 204
        else: 
            response_body = {'error': 'Reply Like not found'}
            return response_body, 404

api.add_resource(FollowsByID, '/follows/<int:id>', endpoint='followsbyid')

class FollowDelete(Resource):

    def delete(self):
        data = request.get_json()
        follower_id = data.get('follower_id')
        followed_id = data.get('followed_id')
        print(data)
        follow = Follow.query.filter_by(follower_id=follower_id, followed_id=followed_id).first()
        if follow:
            db.session.delete(follow)
            db.session.commit()
            response_body = {'message': 'Follow deleted successful'}
            return response_body, 204
        else:
            response_body = {'error': 'follow not found'}
            return response_body, 404
        
api.add_resource(FollowDelete, '/follow_delete')

class SignUp(Resource):

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
            response = make_response(
                user_schema.dump(user), 201)
            return response
        except:
            response_body = {'errors': ['validation errors']}
            return response_body, 400

api.add_resource(SignUp, '/signup')

class CheckSession(Resource):

    def get(self):

        user_id = session.get('user_id')

        if user_id:
               user = User.query.filter(User.id == user_id).first()
               response = make_response(user_schema.dump(user), 200)
               return response
        else:
            # Return a response that can be safely parsed as JSON
            response_body = {"message": "No active session", "session": None}
            response = make_response(response_body, 404)
            return response

api.add_resource(CheckSession, '/checksession')

class Login(Resource):

    def post(self):

        username = request.get_json().get('username')
        user = User.query.filter(User.username == username).first()

        password = request.get_json()['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            response = make_response(
                user_schema.dump(user), 200)
            return response
        else:
            response_body = {'error': 'Invalid username and password'}
            return response_body, 401
        
api.add_resource(Login, '/login')

class Logout(Resource):

    def delete(self):

        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

