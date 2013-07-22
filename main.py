from flask import Flask, send_file, request
from models import app, Todo, Tag, db
import json


######## API #################
@app.route('/create-todo/', methods=["POST"])
def create_todo():
	description = json.loads(request.data)['description']
	new_todo = Todo(description=description)
	db.session.add(new_todo)
	db.session.commit()
	return get_todos('all')

@app.route('/delete-todo/', methods=['POST'])
def delete_todo():
	requestDict = json.loads(request.data)
	todo_id = requestDict['todo_id']
	tag_id = requestDict['tag_id']
	todo = Todo.query.filter_by(id=todo_id).first()
	db.session.delete(todo)
	db.session.commit()
	return get_todos(tag_id)


@app.route('/todo-add-tag/', methods=['POST'])
def todo_add_tag():
	requestDict = json.loads(request.data)
	todo_id = requestDict['todo_id']
	tag_id = requestDict['tag_id']
	todo = Todo.query.filter_by(id=todo_id).first()
	tag = Tag.query.filter_by(id=tag_id).first()
	tag.todos.append(todo)
	db.session.commit()
	return '200'


@app.route('/todo-done/', methods=['POST'])
def todo_done():
	todo_id = json.loads(request.data)['todo_id']
	todo = Todo.query.filter_by(id=todo_id).first()
	todo.done = True
	db.session.commit()
	return '200'

@app.route('/add-tag/', methods=['POST'])
def add_tag():
	new_tag = Tag()
	db.session.add(new_tag)
	db.session.commit()
	return get_tags()


@app.route('/get-tags/', methods=['GET'])
def get_tags():
	tagIds = [t.id for t in Tag.query.all()]
	return json.dumps(tagIds)


@app.route('/get-todos/<tag>', methods=['GET'])
def get_todos(tag):
	if tag == 'all':
		todos = Todo.query.all()
	else:
		todos = Tag.query.filter_by(id=tag).first().todos
	ret = [{'id':todo.id, 'created_asof':"%s" % todo.created_asof.ctime(), 'description':todo.description, 'done':todo.done} for todo in todos]
	return json.dumps(ret)


####### Routing ###########################################
@app.route('/todos/')
@app.route('/')
def index():
	todos = Todo.query.all()
	tags = Tag.query.all()
	return send_file('static/todos.html')

# serve up non-html static files
@app.route('/static/<path:staticfile>')
def _return_static():
	return send_file('static/%s' % staticfile) 


###### Run! ######
if __name__ == '__main__':
	db.drop_all()
	db.create_all()
	app.run(debug=True)
