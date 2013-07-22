from flask import Flask

from flask.ext.sqlalchemy import SQLAlchemy
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////tmp/test.db'
db = SQLAlchemy(app)

tags = db.Table('tags',
    db.Column('tag_id', db.Integer, db.ForeignKey('tag.id')),
    db.Column('todo_id', db.Integer, db.ForeignKey('todo.id'))
)

class Todo(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	description = db.Column(db.String(200))
	created_asof = db.Column(db.DateTime, default=datetime.datetime.today)
	done = db.Column(db.Boolean, default=False)
	tags = db.relationship('Tag', secondary=tags, backref=db.backref('todos'))

class Tag(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	#name = db.Column(db.String(100))



