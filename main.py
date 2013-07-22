from flask import Flask, send_file, render_template
from models import app, Todo, Tag


####### Routing ###########################################
@app.route('/create-todo', methods=["POST"])
def create_todo():
	return 'oh'

@app.route('/todos/')
@app.route('/')
def index():
	todos = Todo.query.all()
	tags = Tag.query.all()
	return render_template('todos.html', todos=todos, tags=tags)

@app.route('/anotherPage')
def anotherPage():
	return 'anotherPage'

# serve up non-html static files
@app.route('/static/<path:staticfile>')
def _return_static():
	return send_file('static/%s' % staticfile) 



###### Run! ######
if __name__ == '__main__':
    app.run(debug=True)
